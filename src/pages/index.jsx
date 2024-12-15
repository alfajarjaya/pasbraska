import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { Link } from "gatsby";
import logo from '../images/logo.jpg';
import Timer from '../libs/timer';
import Layout from "./layout";
import { getDataPresensiNow } from "../libs/api";

const IndexPage = () => {
  const [kelasData, setKelasData] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fungsi untuk mengambil data dari API
  const fetchKelasData = async (kelas) => {
    setLoading(true);
    setError(null);
    try {

      const res = await getDataPresensiNow(kelas)
      setKelasData(res.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Ambil data awal (kelas default: kelas_10)
  useEffect(() => {
    fetchKelasData(selectedKelas);
  }, [selectedKelas]);

  // Fungsi untuk mengubah kelas yang dipilih
  const handleKelasChange = (e) => {
    const value = e.target.value;
    setSelectedKelas(value);
  };

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center text-center py-20 container mx-auto px-4 md:px-0">
          {/* Logo */}
          <img
            src={logo}
            alt="AbsensiApp Logo"
            className="w-24 h-24 mb-6"
          />
          <h1 className="text-4xl font-bold text-red-600 mb-4">
            Selamat Datang <br /> di Absensi Pasbraska
          </h1>
          <p className="text-gray-700 text-lg mb-8 border border-red-600 py-1 px-5 rounded-lg">
            <Timer />
          </p>

          {/* Menu Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
            <Link
              to="/kelas_10"
              className="flex items-center justify-center p-6 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
            >
              Absensi Kelas 10
            </Link>
            <Link
              to="/kelas_11"
              className="flex items-center justify-center p-6 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
            >
              Absensi Kelas 11
            </Link>
            <Link
              to="/jadwal"
              className="flex items-center justify-center p-6 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600"
            >
              Jadwal Latihan
            </Link>
          </div>

          {/* Filter Kehadiran */}
          <div className="my-8 bg-gray-50 p-6 rounded-lg shadow-md w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-red-600 mb-6 text-center">🎯 Filter Kehadiran</h2>
            <div className="relative">
              <label
                htmlFor="kelas"
                className="block text-gray-700 font-semibold mb-2"
              >
                Pilih Kelas:
              </label>
              <select
                id="kelas"
                value={selectedKelas}
                className="block w-full p-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none transition"
                onChange={handleKelasChange}
              >
                <option value="">Select Kelas</option>
                <option value="kelas_10">Kelas 10</option>
                <option value="kelas_11">Kelas 11</option>
              </select>
            </div>
          </div>

          {selectedKelas && (

            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Data Kehadiran</h3>
              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : error ? (
                <p className="text-red-500">Error: {error}</p>
              ) : kelasData.length === 0 ? (
                <p className="text-gray-500">Tidak ada data tersedia.</p>
              ) : (
                <table className="min-w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-4 py-2">Nama</th>
                      <th className="border border-gray-300 px-4 py-2">Kelas</th>
                      <th className="border border-gray-300 px-4 py-2">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {kelasData.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-100">
                        <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.kelas}</td>
                        {item.keterangan === "Hadir" ? (
                          <td className="border border-gray-300 px-4 py-2 font-bold text-green-600">{item.keterangan}</td>
                        ) : item.keterangan === "Izin" ? (
                          <td className="border border-gray-300 px-4 py-2 font-bold text-yellow-600">{item.keterangan}</td>
                        ) : (
                          <td className="border border-gray-300 px-4 py-2 font-bold text-pink-600">{item.keterangan}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>

        <footer className="bg-red-500 text-white text-center py-4 mt-16">
          <p>&copy; {new Date().getFullYear()} Absensi Pasbraska</p>
          <p>Gunakan aplikasi ini bersama-sama untuk mempermudah pengelolaan kehadiran.</p>
        </footer>
      </div>
    </Layout>
  );
};

export default IndexPage;
