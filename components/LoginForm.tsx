"use client";

import React, { useState } from "react";
import { Mail, Lock, LogIn } from "lucide-react";
import CustomInput from "./CustomInput";

type LoginFormProps = {
  onSwitch: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    // ... validation logic remains the same
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (password.length < 1) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Logging in with:", { email, password });
      // Logic for logging in...
    }
  };

  return (
    <div className="grow flex flex-col justify-center">
      <p className="text-gray-500 text-sm tracking-widest uppercase mb-1">
        Welcome back
      </p>
      {/* Main header text is now dark */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Log into your account<span className="text-blue-600">.</span>
      </h1>
      <p className="text-sm font-light text-gray-600 mb-12">
        Need an account?{" "}
        <button
          onClick={onSwitch}
          type="button"
          // Link color changed to blue and dark
          className="text-blue-600 font-medium hover:underline focus:outline-none"
        >
          Create new account
        </button>
      </p>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* CustomInput colors need to be handled inside CustomInput.tsx to work well with light theme. 
            Assuming CustomInput handles light theme styles (dark text on light background). */}

        <CustomInput
          label="Email"
          id="loginEmail"
          type="email"
          icon={Mail}
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <CustomInput
          label="Password"
          id="loginPassword"
          type="password"
          icon={Lock}
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <div className="flex justify-between items-center text-sm">
          {/* Text is dark/gray */}
          <label className="flex items-center text-gray-600 space-x-2">
            {/* Checkbox styling may need adjustments in a global CSS or Tailwind config */}
            <input
              type="checkbox"
              className="form-checkbox text-blue-600 bg-white border-gray-400 rounded focus:ring-0"
            />
            <span>Remember me</span>
          </label>
          {/* Link is blue */}
          <a
            href="#"
            className="text-blue-600 hover:underline text-sm font-light"
          >
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          // Primary button color changed to blue-600
          className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700 transition duration-200 shadow-lg shadow-blue-500/50 flex items-center justify-center space-x-2"
        >
          <LogIn className="w-5 h-5" />
          <span>Sign In</span>
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
