"use client";

import { LucideIcon } from "lucide-react";

type CustomInputProps = {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: LucideIcon;
  placeholder?: string;
  type?: string;
  error?: string;
  required?: boolean;
};

export default function CustomInput({
  label,
  id,
  value,
  onChange,
  icon: Icon,
  placeholder,
  type = "text",
  error,
  required = false,
}: CustomInputProps) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-gray-500">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        )}

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full ${
            Icon ? "pl-10" : "pl-4"
          } pr-4 py-3 rounded-xl bg-[#EEF2FF] border ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
