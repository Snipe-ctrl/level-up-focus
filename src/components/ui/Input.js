import React from "react";

const Input = React.forwardRef(({ 
    className = "", 
    type = "text",
    icon: Icon,
    iconPosition = "left",
    ...props 
}, ref) => {
    const hasIcon = !!Icon;
    
    return (
        <div className="relative w-full">
            <input
                type={type}
                className={`
                    flex h-12 w-full rounded-lg border border-[#333333] bg-[#04100a] px-4 py-3 text-sm text-white font-light
                    placeholder:text-gray-500 placeholder:font-light focus:outline-none focus:border-[#4fab64] disabled:cursor-not-allowed disabled:opacity-50
                    ${hasIcon && iconPosition === "left" ? "pl-12" : ""}
                    ${hasIcon && iconPosition === "right" ? "pr-12" : ""}
                    ${className}
                `}
                ref={ref}
                {...props}
            />
            {hasIcon && (
                <div className={`absolute top-1/2 transform -translate-y-1/2 ${
                    iconPosition === "left" ? "left-4" : "right-4"
                } text-gray-400`}>
                    <Icon className="h-5 w-5" />
                </div>
            )}
        </div>
    );
});

Input.displayName = "Input";

export default Input; 