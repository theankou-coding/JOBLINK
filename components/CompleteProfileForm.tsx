"use client";

import React, { useState } from 'react';
import { Camera, Calendar, MapPin, Briefcase, FileText, Phone, Upload } from 'lucide-react';
import CustomInput from './CustomInput'; 

type CompleteProfileFormProps = {
  onBack: () => void;
  // onComplete: (data: any, cvFile: File | null) => void;
};

const CompleteProfileForm: React.FC<CompleteProfileFormProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    phone: '',
    gender: '',
    dob: '',
    profession: '',
    location: '',
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files.length > 0) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile Data:', formData);
    console.log('Profile Image:', profileImage?.name);
    console.log('CV File:', cvFile?.name);
  };

  const InputWrapper = ({ children, label }: { children: React.ReactNode, label: string }) => (
    <div className="relative pt-4">
      {/* Label text is darker */}
      <label className="text-sm font-light text-gray-600 absolute -top-1 left-0">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="pt-2">
      <p className="text-gray-500 text-sm tracking-widest uppercase mb-1">Step 2 of 2</p>
      {/* Header text is dark */}
      <h1 className="text-4xl font-bold text-gray-900 mb-6">
        Complete Profile<span className="text-blue-600">.</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Profile Image Upload */}
        <div className="flex items-center space-x-4">
          {/* Light background for placeholder and dark icons */}
          <label className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300 transition relative">
            {profileImage ? (
                <img src={URL.createObjectURL(profileImage)} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
                <Camera className="w-6 h-6 text-gray-600" />
            )}
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={(e) => handleFileChange(e, setProfileImage)}
            />
            {/* Blue dot remains visible */}
            <div className="absolute bottom-0 right-0 p-1 bg-blue-600 rounded-full">
              <Upload className="w-3 h-3 text-white"/>
            </div>
          </label>
          <div>
            {/* Text is dark/gray */}
            <p className="text-gray-900 font-medium">Upload Profile Photo</p>
            <p className="text-xs text-gray-500">Max size 5MB. JPG/PNG.</p>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CustomInput label="Phone Number" id="phone" icon={Phone} placeholder="(123) 456-7890" value={formData.phone} onChange={handleChange} error={errors.phone} />
            <CustomInput label="Date of Birth" id="dob" type="date" icon={Calendar} placeholder="YYYY-MM-DD" value={formData.dob} onChange={handleChange} error={errors.dob} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <CustomInput label="Profession" id="profession" icon={Briefcase} placeholder="Software Engineer" value={formData.profession} onChange={handleChange} error={errors.profession} />
            <CustomInput label="Location" id="location" icon={MapPin} placeholder="City, Country" value={formData.location} onChange={handleChange} error={errors.location} />
        </div>

        {/* Gender Select */}
        <InputWrapper label="Gender">
            <select
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                // Select is light background, dark text
                className="w-full bg-transparent border-b border-blue-600/50 focus:border-blue-600 text-gray-900 py-2 focus:outline-none transition duration-200"
            >
                {/* Options need a light background for visibility */}
                <option value="" disabled className="bg-white text-gray-900">Select Gender</option>
                <option value="male" className="bg-white text-gray-900">Male</option>
                <option value="female" className="bg-white text-gray-900">Female</option>
                <option value="other" className="bg-white text-gray-900">Other</option>
            </select>
        </InputWrapper>

        {/* CV PDF Upload */}
        <div className="border border-dashed border-gray-400 p-4 rounded-lg text-center cursor-pointer hover:border-blue-600 transition">
          <label htmlFor="cv-upload" className="flex flex-col items-center justify-center space-y-2">
            <FileText className="w-6 h-6 text-gray-600" />
            <p className="text-sm text-gray-700">
              {cvFile ? cvFile.name : 'Click to upload CV (PDF only)'}
            </p>
            <input id="cv-upload" type="file" accept=".pdf" className="hidden" onChange={(e) => handleFileChange(e, setCvFile)} />
          </label>
          <button type="button" onClick={() => setCvFile(null)} className="mt-2 text-xs text-red-600 hover:text-red-700">Remove File</button>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 pt-4">
          <button
            type="button"
            onClick={onBack}
            // Secondary button is light background with gray border/text
            className="px-6 py-3 bg-white border border-gray-400 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-100 transition duration-200"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200 shadow-lg shadow-blue-500/50"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteProfileForm;