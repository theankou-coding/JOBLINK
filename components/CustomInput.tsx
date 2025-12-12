"use client";

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type CustomInputProps = {
    label: string;
    id: string;
    type?: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    className?: string;
    icon?: React.ElementType;
};

const CustomInput: React.FC<CustomInputProps> = ({
    label,
    id,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    className = '',
    icon: Icon,
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPasswordField = type === 'password';
    const displayedType = isPasswordField && isPasswordVisible ? 'text' : type;

    return (
        <div className={`relative ${className}`}>
            <label htmlFor={id} className={`text-sm font-light ${error ? 'text-red-400' : 'text-gray-600'}`}>
                {label}
            </label>
            <div className="relative mt-1">
                <input
                    id={id}
                    type={displayedType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`w-full bg-transparent border-b ${error ? 'border-red-500' : 'border-blue-500/50 focus:border-blue-500'} text-gray-500 py-2 pr-10 pl-0 focus:outline-none transition duration-200`}
                />

                {/* Icon or Password Visibility Toggle */}
                {(Icon || isPasswordField) && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                        {isPasswordField ? (
                            <button
                                type="button"
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                className="focus:outline-none"
                            >
                                {isPasswordVisible ? (
                                    <EyeOff className={`h-4 w-4 ${error ? 'text-red-500' : 'text-blue-500/70 hover:text-blue-400'}`} />
                                ) : (
                                    <Eye className={`h-4 w-4 ${error ? 'text-red-500' : 'text-blue-500/70 hover:text-blue-400'}`} />
                                )}
                            </button>
                        ) : (
                            Icon && <Icon className={`h-4 w-4 ${error ? 'text-red-500' : 'text-blue-500/70'}`} />
                        )}
                    </div>
                )}
            </div>
            {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
        </div>
    );
};

export default CustomInput;