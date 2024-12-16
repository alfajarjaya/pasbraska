import axios from 'axios';
import { navigate } from 'gatsby';
import { checkLocation } from './location';

const axiosInstance = axios.create({
    baseURL: process.env.GATSBY_API_URL,
});

export const PostLogin = async (password) => {
    try {
        const res = await axiosInstance.post('/api/auth/signin', { password }, {
            headers: { "Content-Type": "application/json" },
        });

        if (res.status === 200) {
            return { success: true, data: res.data };
        }
    } catch (error) {
        return { success: false, error: error.response?.data || "An unexpected error occurred" };
    }
};

export const getRole = () => {
    const userData = sessionStorage.getItem('user');
    if (!userData) {
        if (typeof window !== 'undefined' && window.location.pathname !== '/') {
            navigate('/');
        }
        return null;
    }

    const parsedData = JSON.parse(userData);
    if (!parsedData.role) {
        navigate('/');
        return null;
    }

    return parsedData.role;
};

export const fetchUser = async () => {
    const role = getRole();
    if (!role) {
        alert("Role tidak ditemukan! Harap login kembali.");
        return;
    }

    try {
        const response = await axiosInstance.get(`/get/get-user?role=${role}`);
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            return { error: "Terjadi kesalahan saat mengambil role." };
        }
    } catch (error) {
        return { error: error.response?.data || "Terjadi kesalahan saat mengambil role." };
    }
};

export const postPresensi = async (data) => {
    const { name, kelas, date, time, location } = data;

    try {
        const isLocationValid = await checkLocation();

        if (!isLocationValid) {
            return { success: false, error: { message: "Anda sedang berada di luar lokasi yang diizinkan." } };
        }

        const response = await axiosInstance.post('/api/presensi', { name, kelas, date, time, location }, {
            headers: { "Content-Type": "application/json" },
        })

        if (response.status === 200) {
            return { success: true, data: response.data };
        }
        return { success: false, data: response.data };
    } catch (error) {
        return { success: false, error: error.response?.data || "An unexpected error occurred" };
    }
};

export const postAbsensi = async (data) => {
    const { name, kelas, date, ket, img } = data;
    try {
        const response = await axiosInstance.post('/api/absensi',
            { name, kelas, date, ket, img }, {
            headers: { "Content-Type": "application/json" }
        })

        if (response.status === 200) {
            return { success: true, data: response.data };
        }

        return { success: false, data: response.data };

    } catch (err) {
        return { success: false, error: err.response?.data || "An unexpected error occurred" };
    }
}

export const GetJadwal = async () => {
    try {
        const res = await axiosInstance.get('/api/jadwal')

        if (res.status === 200) {
            return { succes: true, data: res.data }
        }
    } catch (error) {
        return { success: false, error: error || "Error" }
    }
}

export const getDataPresensiNow = async (role) => {
    try {
        const res = await axiosInstance.get(`/api/presensi-now?role=${role}`);
        if (res.status === 200) {
            return { success: true, data: res.data?.data };
        }
        return { success: false, error: res.data.message || "Failed to fetch data." };
    } catch (error) {
        return { success: false, error: "An error occurred while fetching data." };
    }
};