import logo from "../assets/images/header/logo.png";
import React from "react";

import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/dashboard');
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-6 h-[80px] bg-[#0d1846] text-white">
            <div className="flex items-center">
                <img
                    src={logo}
                    alt="Bitcoin"
                    className="w-full h-full object-contain cursor-pointer"
                    onClick={handleLogoClick}
                />
            </div>
        </header>
    );
}

export default Header;