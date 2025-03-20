import React from "react";

const Button = ({ 
    children, 
    onClick, 
    type = "button", 
    size = "lg", 
    variant = "primary", 
    disabled = false,
    className = ""
}) => {

    const baseStyles = `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background
    transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    disabled:pointer-events-none disabled:opacity-50`;

    const variants = {
        primary: "bg-white hover:bg-white/80 text-gray-800 border border-white/50",
        blue: "bg-blue-600 hover:bg-blue-700 text-white",
        ghost: "text-white hover:text-gray-900 hover:bg-gray-100/20",
    };

    const sizes = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;