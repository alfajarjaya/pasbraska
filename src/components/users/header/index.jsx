import React from "react";
import { navigate } from "gatsby";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { getRole } from "../../../libs/api";

const Header = ({ title }) => {
    const handlerBack = () => {
        const role = getRole();
        navigate(`/${role}/menu`);
    };

    return (
        <div className="flex items-center justify-between min-h-[20vh] px-4">
            <button onClick={handlerBack}>
                <ArrowCircleLeftIcon htmlColor="red" />
            </button>
            <div className="flex-grow text-center">
                <h1 className="font-bold text-3xl text-red-600">{title}</h1>
            </div>
        </div>
    );
};

export default Header;
