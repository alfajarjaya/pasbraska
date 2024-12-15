import React, { useEffect, useState } from "react";
import { getRole, postPresensi } from "../../../libs/api";
import { navigate } from "gatsby";
import Swal from 'sweetalert2';

const CollecButtonSubmit = ({ data, resetData }) => {
    const [role, setRole] = useState('');

    const handlerPost = async () => {
        const response = await postPresensi(data);
        if (response.success) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response.data?.message || 'Presensi berhasil.',
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                navigate(`/${role}/menu`);
            })
            resetData();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: response.error?.error || response.error?.message || 'Terjadi kesalahan saat presensi.',
            })
        }
    };

    useEffect(() => {
        const fetchRole = async () => {
            const userRole = await getRole();
            setRole(userRole);
        };

        fetchRole();
    }, []);

    return (
        <>
            <button
                className="py-1 bg-pink-600 text-white font-bold text-lg rounded rounded-xl shadow-lg mt-9 w-[60%] md:w-[30%]"
                onClick={handlerPost}
            >
                Presensi
            </button>
        </>
    );
};

export default CollecButtonSubmit;
