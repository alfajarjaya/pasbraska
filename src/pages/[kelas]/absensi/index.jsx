import React, { useState, useEffect } from "react";
import Layout from "../../layout";
import Header from "../../../components/users/header";
import User from "@mui/icons-material/Person";
import School from "@mui/icons-material/School";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { getRole, fetchUser } from "../../../libs/api";
import CollectButtonAbsensi from '../../../components/users/absensi/collecbutton';
import Swal from 'sweetalert2';

const Page = () => {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [alertPreviewImage, setAlertPreviewImage] = useState(false);
    const [role, setRole] = useState('');
    const [user, setUser] = useState(null);
    const [selectedName, setSelectedName] = useState("");
    const [selectedClass, setSelectedClass] = useState("");
    const [ket, setKet] = useState("");

    const [date] = useState(() => {
        const time = new Date();
        return `${time
            .getDate()
            .toLocaleString("en-US", { minimumIntegerDigits: 2 })}-${(
                time.getMonth() + 1
            ).toLocaleString("en-US", { minimumIntegerDigits: 2 })}-${time.getFullYear()}`;
    });

    const features = [
        {
            icon: <User />,
            title: (
                <select
                    className="focus:outline-none w-full"
                    value={selectedName || ""}
                    onChange={(event) => setSelectedName(event.target.value)}
                >
                    <option value="">Select Name</option>
                    {user &&
                        user.map((u, index) => (
                            <option key={index} value={u.name}>
                                {u.name}
                            </option>
                        ))}
                </select>
            ) || "Loading",
        },
        {
            icon: <School />,
            title: (
                <select
                    className="focus:outline-none w-40"
                    value={selectedClass || ""}
                    onChange={(event) => setSelectedClass(event.target.value)}
                >
                    <option value="">Select Kelas</option>
                    {user &&
                        user.map((u, index) => (
                            <option key={index} value={u.kelas}>
                                {u.kelas}
                            </option>
                        ))}
                </select>
            ) || "Loading...",
        },
        { icon: <CalendarMonthIcon />, title: date },

    ]

    // Fungsi untuk mengubah file yang di-upload
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const maxSize = 0.3 * 1024 * 1024;

        if (selectedFile.size > maxSize) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Ukuran file terlalu besar!",
            })
            return;
        }

        if (selectedFile && selectedFile.type.startsWith("image/")) {
            setFile(selectedFile);

            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "File harus berupa gambar!",
            })
            return;
        }
    };

    const handlerAlertPreviewImage = () => {
        setAlertPreviewImage(true);
    };

    const closePreviewImage = () => {
        setAlertPreviewImage(false);
    };

    const [data, setData] = useState({
        name: selectedName,
        kelas: selectedClass,
        ket: ket,
        date: date,
        img: preview,
    });

    const resetData = () => {
        setData({
            name: "",
            kelas: "",
            ket: "",
            date: "",
            img: ""
        });
        setSelectedName("");  // Reset selectedName
        setSelectedClass(""); // Reset selectedClass
        setPreview(null);
        setKet("");
    };

    useEffect(() => {
        const fetchRoleAndUser = async () => {
            try {
                const roles = await getRole();
                setRole(roles);

                const userData = await fetchUser();
                if (userData?.data?.name && userData?.data?.kelas) {
                    // Gabungkan name dan kelas menjadi array objek
                    const combinedData = userData.data.name.map((name, index) => ({
                        name,
                        kelas: userData.data.kelas[index],
                    }));
                    setUser(combinedData);
                } else {
                    console.error("Unexpected data structure:", userData.data);
                    setUser([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setOpenSnackbar(true);
            }
        };

        fetchRoleAndUser();
        setData({
            name: selectedName,
            kelas: selectedClass,
            date: date,
            ket: ket,
            img: preview
        });

    }, [selectedName, selectedClass, ket, date, preview]);

    return (
        <Layout>
            <div className="container md:w-[50%] mx-auto md:px-4">
                <Header title="Absensi" />
                <div
                    className="flex flex-col space-y-4 justify-center items-center my-8"
                >
                    {features
                        .map((feature, index) => (
                            <div
                                key={index}
                                className="flex flex-row items-center space-x-2 border-2 border-pink-300 rounded-full py-2 w-[80%] mb-3 cursor-not-allowed px-4"
                            >
                                {feature.icon}
                                <p>{feature.title}</p>
                            </div>
                        ))}

                    <select
                        name="keterangan"
                        id="keterangan"
                        className="border-2 border-pink-300 rounded-full py-2 w-[50%] mb-3 px-4 cursor-pointer"
                        value={ket}
                        onChange={(e) => setKet(e.target.value)}
                    >
                        <option value="">Keterangan...</option>
                        <option value="Izin">Izin</option>
                        <option value="Sakit">Sakit</option>
                    </select>

                    <div className="flex flex-col justify-center items-center">
                        <p className="mt-4 text-red-600">MAX : 300 KB</p>
                        <label
                            htmlFor="bukti"
                            className="py-2 px-8 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 text-center w-full flex justify-center items-center"
                        >
                            Upload Bukti Foto
                        </label>

                        <input
                            type="file"
                            id="bukti"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            required
                        />
                    </div>

                    {preview && (
                        <div className="w-[80%] mb-2">
                            <p className="text-sm text-gray-600 mb-2">Pratinjau Gambar :</p>
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full rounded-lg border-2 border-pink-300 cursor-pointer"
                                onClick={handlerAlertPreviewImage}
                            />
                        </div>
                    )}

                    {alertPreviewImage && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 min-h-screen">
                            <div className="p-6 bg-white rounded-lg shadow-lg text-center">
                                <div className="flex flex-row justify-between items-center mb-5">
                                    <h2 className="text-xl font-bold text-pink-600">Pratinjau Gambar : </h2>
                                    <button onClick={closePreviewImage}><DisabledByDefaultIcon color="action" /></button>
                                </div>
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full max-w-md rounded-lg border-2 border-pink-300 mb-4"
                                />
                            </div>
                        </div>
                    )}
                    {file && (
                        <CollectButtonAbsensi data={data} resetData={resetData} />
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Page;