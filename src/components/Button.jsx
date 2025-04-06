import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`
                px-5 py-2.5 
                rounded-xl 
                font-medium 
                shadow-sm 
                transition-all 
                duration-500
                
                ease-in-out
                ${bgColor} 
                ${textColor}
                hover:brightness-150
                hover:shadow-md
                cursor-pointer
                border-2 border-transparent hover:border-blue-400
                focus:outline-none 
                focus:ring-2 
                focus:ring-offset-2 
                focus:ring-blue-400 
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