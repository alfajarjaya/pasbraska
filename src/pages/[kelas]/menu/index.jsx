import React, { useEffect, useState } from "react";
import Navbar from '../../../components/navbar';
import { Link } from "gatsby";
import logo from '../../../images/logo.jpg';
import Timer from '../../../libs/timer';
import Layout from '../../layout';
import { getRole } from "../../../libs/api";

const Page = () => {
    const [role, setRole] = useState('');
    useEffect(() => {
        const fetchRole = async () => {
            const roles = await getRole();
            setRole(roles);
        };
        fetchRole();
    }, []);

    
    return (
        <Layout>
            <div className="bg-gray-50 flex flex-col min-h-screen">
                {/* Navbar */}
                <Navbar />

                {/* Main Content */}
                <div className="flex-grow flex flex-col items-center justify-center text-center py-20 container mx-auto px-4 md:p-0">
                    <img
                        src={logo}
                        alt="AbsensiApp Logo"
                        className="w-32 h-32 mb-6"
                    />
                    <h1 className="text-4xl font-bold text-red-600 mb-4 ">
                        Selamat Datang <br /> di Absensi Pasbraska
                    </h1>
                    <p className="text-gray-700 text-lg mb-8 border border-red-600 py-1 px-5 rounded-lg">
                        <Timer />
                    </p>

                    {/* Menu Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
                        <Link
                            to={`/${role}/presensi`}
                            className="flex items-center justify-center p-6 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
                        >
                            Presensi Kehadiran
                        </Link>
                        <Link
                            to={`/${role}/absensi`}
                            className="flex items-center justify-center p-6 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
                        >
                            Absensi Tidak Hadir
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-red-500 text-white text-center py-4">
                    <p>&copy; {new Date().getFullYear()} Absensi Pasbraska</p>
                    <p>Gunakan aplikasi ini bersama-sama untuk mempermudah pengelolaan kehadiran.</p>
                </footer>
            </div>
        </Layout>
    );
};

export default Page;
