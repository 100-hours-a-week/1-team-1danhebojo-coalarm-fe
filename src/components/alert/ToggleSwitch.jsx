// src/components/alarm/ToggleSwitch.jsx
import React from 'react';

const ToggleSwitch = ({ value, onToggle, offValue = false }) => {
    const handleClick = () => {
        onToggle(value ? offValue : true);
    };

    return (
        <div
            className={`border border-[#B7BFFF] relative w-[60px] h-[32px] rounded-full cursor-pointer transition-colors duration-300 ${
                value ? 'bg-[#B7BFFF]' : 'bg-[#081159]'
            }`}
            onClick={handleClick}
        >
            <div
                className={`absolute w-6 h-6 bg-white rounded-full top-[3px] transition-transform duration-300 ${
                    value ? 'transform translate-x-8' : 'translate-x-0.5'
                }`}
            ></div>
        </div>
    );
};

export default ToggleSwitch;