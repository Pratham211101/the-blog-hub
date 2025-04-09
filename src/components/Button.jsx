import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-[#27548A]",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`
                px-5 py-2.5 
                rounded-2xl 
                font-medium 
                shadow 
                transition-all 
                duration-300 
                ease-in-out 
                ${bgColor} 
                ${textColor} 
                hover:bg-[#eef6b6]
                hover:text-blue-950
                hover:scale-105
                active:scale-95
                focus:outline-none 
                focus:ring-2 
                focus:ring-offset-2 
                focus:ring-[#9FB3DF] 
                disabled:opacity-50 
                disabled:cursor-not-allowed
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}
