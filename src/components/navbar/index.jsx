import React, { useState } from "react";
import { Link } from "gatsby";
import logo from '../../images/logo.jpg';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="bg-red-500 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-xl font-bold flex items-center">
                    <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
                    <p>Pasbraska</p>
                </Link>

                {/* Hamburger Menu for Mobile */}
                <button
                    onClick={toggleMenu}
                    className="text-white focus:outline-none md:hidden"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        />
                    </svg>
                </button>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-4">
                    <Link
                        to="/kelas_10"
                        className="hover:text-gray-200 font-medium"
                    >
                        <p>Kelas 10</p>
                    </Link>
                    <Link
                        to="/kelas_11"
                        className="hover:text-gray-200 font-medium"
                    >
                        <p>Kelas 11</p>
                    </Link>
                    <Link
                        to="/jadwal"
                        className="hover:text-gray-200 font-medium"
                    >
                        <p>Jadwal Latihan</p>
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-red-600">
                    <Link
                        to="/kelas10"
                        className="block px-4 py-2 hover:bg-red-700"
                    >
                        <p>Kelas 10</p>
                    </Link>
                    <Link
                        to="/kelas11"
                        className="block px-4 py-2 hover:bg-red-700"
                    >
                        <p>Kelas 11</p>
                    </Link>
                    <Link
                        to="/jadwal"
                        className="block px-4 py-2 hover:bg-red-700"
                    >
                        <p>Jadwal Latihan</p>
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
