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
        primary: "bg-white hover:bg-white/90 text-gray-800 border border-white/50",
        ghost: "hover:text-gray-900 hover:bg-gray-100/20",
    };

    const sizes = {
        icon: "h-10 w-10",
        lg: "h-11 rounded-md px-8",
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