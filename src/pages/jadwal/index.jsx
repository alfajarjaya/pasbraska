import React, { useEffect, useState } from "react";
import Layout from "../layout";
import Navbar from "../../components/navbar";
import { GetJadwal } from "../../libs/api";

const Page = () => {
    const [jadwal, setJadwal] = useState({});

    useEffect(() => {
        const getDataJadwal = async () => {
            const res = await GetJadwal();
            setJadwal(res.data?.data || {});
        };

        getDataJadwal();
    }, []);

    const urutanHari = ["senin", "selasa", "rabu", "kamis", "jumat", "sabtu", "minggu"];

    const renderJadwal = () => {
        const sortedJadwal = Object.fromEntries(
            urutanHari.map((hari) => [hari, jadwal[hari] || "Loading..."])
        );

        return Object.entries(sortedJadwal).map(([hari, keterangan]) => (
            <tr key={hari}>
                <td className="px-6 py-4 border border-gray-300 capitalize">{hari}</td>
                <td className="px-6 py-4 border border-gray-300">{keterangan}</td>
            </tr>
        ));
    };


    return (
        <Layout>
            <div className="bg-gray-50 flex flex-col min-h-screen">
                {/* Navbar */}
                <Navbar />

                {/* Content Section */}
                <div className="flex-grow bg-gray-100 flex justify-center py-8 px-4">
                    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-full md:w-[70%]">
                        {/* Header */}
                        <div className="text-center mb-6">
                            <h1 className="text-3xl font-bold text-red-600">Jadwal Latihan</h1>
                            <p className="text-gray-500 mt-2">
                                Berikut adalah jadwal latihan yang sudah ditentukan.
                            </p>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full border border-gray-200 table-auto text-left">
                                <thead>
                                    <tr className="bg-red-600 text-white">
                                        <th className="px-6 py-3 text-sm font-semibold uppercase border border-gray-300">
                                            Hari
                                        </th>
                                        <th className="px-6 py-3 text-sm font-semibold uppercase border border-gray-300">
                                            Keterangan
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>{renderJadwal()}</tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-red-600 text-white text-center py-4 mt-4">
                    <div className="max-w-4xl mx-auto px-4">
                        <p className="font-semibold text-lg">
                            &copy; {new Date().getFullYear()} Absensi Pasbraska
                        </p>
                        <p className="text-sm">
                            Gunakan aplikasi ini bersama-sama untuk mempermudah pengelolaan kehadiran.
                        </p>
                    </div>
                </footer>
            </div>
        </Layout>
    );
};

export default Page;
