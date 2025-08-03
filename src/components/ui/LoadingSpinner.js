import React from "react";

const LoadingSpinner = ({ size = "default", color = "white" }) => {
    const sizes = {
        sm: "w-4 h-4",
        default: "w-8 h-8",
        lg: "w-12 h-12",
        xl: "w-16 h-16"
    };

    const colors = {
        white: "border-white/20 border-t-white",
        green: "border-green-200/20 border-t-green-500",
        blue: "border-blue-200/20 border-t-blue-500"
    };

    return (
        <div
            className={`${sizes[size]} ${colors[color]} border-2 border-solid rounded-full animate-spin`}
        />
    );
}

export default LoadingSpinner;