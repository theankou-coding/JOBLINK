"use client";

import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import CustomInput from './CustomInput'; 

type CreateAccountFormProps = {
  onSwitch: () => void;
  onContinue: () => void;
};

const CreateAccountForm: React.FC<CreateAccountFormProps> = ({ onSwitch, onContinue}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required.';
    if (!email.trim() || !emailRegex.test(email)) newErrors.email = 'A valid email address is required.';
    if (password.length < 8) newErrors.password = 'Password must be at least 8 characters.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onContinue();
    }
  };

  return (
    <div className="flex-grow flex flex-col justify-center">
      <p className="text-gray-500 text-sm tracking-widest uppercase mb-1">Start for free</p>
      {/* Header text is dark */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Create new account<span className="text-blue-600">.</span>
      </h1>
      <p className="text-sm font-light text-gray-600 mb-8">
        Already A Member?{' '}
        <button 
          onClick={onSwitch} 
          type="button"
          className="text-blue-600 font-medium hover:underline focus:outline-none"
        >
          Log in
        </button>
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Name Fields, Email, Password Inputs */}
        <div className="flex space-x-8">
          <CustomInput
            label="First name"
            id="firstName"
            icon={User}
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            error={errors.firstName}
            className="flex-1"
          />
          <CustomInput
            label="Last name"
            id="lastName"
            icon={User}
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            error={errors.lastName}
            className="flex-1"
          />
        </div>

        <CustomInput
          label="Email"
          id="email"
          type="email"
          icon={Mail}
          placeholder="example@gamil.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />

        <CustomInput
          label="Password"
          id="password"
          type="password"
          icon={Lock}
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        {/* Buttons section */}
        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            className="px-6 py-3 bg-white border border-gray-400 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition duration-200"
          >
            Change method
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200 shadow-lg shadow-blue-500/50"
          >
            Create account & Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccountForm;