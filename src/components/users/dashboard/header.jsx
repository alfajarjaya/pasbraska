import React from "react";
import Logo from "../../../images/logo.jpg";
import Timer from "../../../libs/timer";

const HeaderDashboard = ({ title }) => {

    return (
        <div>
            <div className="flex flex-row items-center space-x-6">
                <img
                    src={Logo}
                    alt="Logo"
                    className="rounded-full"
                    width={130}
                    height={130}
                />
                <div className="flex flex-col">
                    <p className="text-gray-400">Welcome, </p>
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
                </div>
            </div>
            <div className="mt-8">
                <div className="flex items-center justify-center w-full py-3 bg-gradient-to-r from-pink-500 to-pink-700 text-white font-bold text-lg rounded-full shadow-lg transform transition duration-300">
                    <Timer />
                </div>
            </div>
        </div>
    )
}

export default HeaderDashboard;