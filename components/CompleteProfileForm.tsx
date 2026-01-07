"use client";

<<<<<<< HEAD
import { useState } from "react";
=======
<<<<<<< HEAD
import { useState } from "react";
=======
import React, { useState } from "react";
>>>>>>> 440f778734d4a8a67b276a97fda4b4e76efdc029
>>>>>>> db4d4868c86063b8d18f4058f7e8d68a22bcc418
import {
  Camera,
  Calendar,
  MapPin,
  Briefcase,
  FileText,
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> db4d4868c86063b8d18f4058f7e8d68a22bcc418
  ChevronLeft,
  Loader2,
  AlertCircle,
} from "lucide-react";
import CustomInput from "./CustomInput";
import { auth, rtdb, storage } from "@/firebase/clientApp";
import { ref as dbRef, set } from "firebase/database";
import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
<<<<<<< HEAD
=======
=======
  Phone,
  Upload,
} from "lucide-react";
import CustomInput from "./CustomInput";
>>>>>>> 440f778734d4a8a67b276a97fda4b4e76efdc029
>>>>>>> db4d4868c86063b8d18f4058f7e8d68a22bcc418

type CompleteProfileFormProps = {
  onBack: () => void;
};

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> db4d4868c86063b8d18f4058f7e8d68a22bcc418
export default function CompleteProfileForm({ onBack }: CompleteProfileFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

<<<<<<< HEAD
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    phone: "",
    dob: "",
    profession: "",
    location: "",
    gender: "male",
  });
=======
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    phone: "",
    dob: "",
    profession: "",
    location: "",
    gender: "male",
  });
=======
const CompleteProfileForm: React.FC<CompleteProfileFormProps> = ({
  onBack,
}) => {
  const [formData, setFormData] = useState({
    phone: "",
    gender: "",
    dob: "",
    profession: "",
    location: "",
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [errors] = useState<{ [key: string]: string }>({});
>>>>>>> 440f778734d4a8a67b276a97fda4b4e76efdc029
>>>>>>> db4d4868c86063b8d18f4058f7e8d68a22bcc418

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
<<<<<<< HEAD
    setFormData(prev => ({ ...prev, [id]: value }));
    if (formError) setFormError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setLoading(true);

    const user = auth.currentUser;
    if (!user) {
      setFormError("You must be logged in.");
      setLoading(false);
      return;
    }

    if (!profileImage) {
      setFormError("Profile photo is required.");
      setLoading(false);
      return;
    }

    try {
      // 1️⃣ Upload profile image
      const imageRef = storageRef(storage, `profiles/${user.uid}/avatar.jpg`);
      await uploadBytes(imageRef, profileImage);
      const photoURL = await getDownloadURL(imageRef);

      // 2️⃣ Upload CV (optional)
      let resumeURL = "";
      if (cvFile) {
        const cvRef = storageRef(storage, `profiles/${user.uid}/resume.pdf`);
        await uploadBytes(cvRef, cvFile);
        resumeURL = await getDownloadURL(cvRef);
      }

      // 3️⃣ Save to Realtime Database
      await set(dbRef(rtdb, `users/${user.uid}`), {
        uid: user.uid,
        email: user.email,
        phone: formData.phone,
        dob: formData.dob,
        profession: formData.profession,
        location: formData.location,
        gender: formData.gender,
        photoURL,
        resumeURL,
        setupComplete: true,
        updatedAt: new Date().toISOString(),
      });

      // 4️⃣ Navigate to /home
      router.push("/home");

    } catch (err: any) {
      console.error(err);
      setFormError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
<<<<<<< HEAD
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-white overflow-y-auto">
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="hidden lg:flex relative bg-gradient-to-b from-[#4640DE] to-[#1e1b4b] p-20 items-center">
          <div className="absolute text-white/5 text-[12rem] font-bold -translate-x-10 -translate-y-10">
            JobLink
          </div>
          <div className="relative z-10 text-white max-w-md">
            <h1 className="text-4xl font-bold mb-4">Complete your profile</h1>
            <p className="text-white/80">
              Employers prefer candidates with completed profiles.
            </p>
          </div>
        </div>

        {/* FORM PANEL */}
        <div className="p-8 sm:p-12 flex justify-center items-center">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">

            <div className="text-center">
              <p className="text-[#4640DE] text-[10px] uppercase font-bold">
                Step 2 of 2
              </p>
              <h2 className="text-3xl font-bold">Complete Profile</h2>
            </div>

            {/* GLOBAL ERROR */}
            {formError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex gap-2 text-red-600 text-sm">
                <AlertCircle size={18} /> {formError}
              </div>
            )}

            {/* PROFILE PHOTO */}
            <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer
              ${!profileImage && formError.includes("photo") ? "border-red-500 bg-red-50" : "border-gray-300 bg-[#EEF2FF]"}`}>
              <div className="w-14 h-14 rounded-full border flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={URL.createObjectURL(profileImage)} className="w-full h-full object-cover" />
                ) : (
                  <Camera className="text-gray-400" />
                )}
              </div>
              <div>
                <p className="font-semibold text-sm">
                  Profile Photo <span className="text-red-500">*</span>
                </p>
                <p className="text-[10px] text-gray-500">PNG / JPG</p>
              </div>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => e.target.files && setProfileImage(e.target.files[0])}
              />
            </label>

            {/* INPUTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CustomInput
                label="Phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <CustomInput
                label="Birth Date"
                id="dob"
                type="date"
                icon={Calendar}
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CustomInput
                label="Profession"
                id="profession"
                icon={Briefcase}
                value={formData.profession}
                onChange={handleChange}
                required
              />
              <CustomInput
                label="Location"
                id="location"
                icon={MapPin}
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            {/* CV UPLOAD */}
            <label className="border-2 border-dashed rounded-xl p-5 bg-[#EEF2FF] cursor-pointer text-center hover:border-[#4640DE] transition-all">
              <FileText className="mx-auto mb-2 text-gray-600" />
              <p className="text-xs font-medium">{cvFile ? cvFile.name : "Upload CV (PDF)"}</p>
              <input
                type="file"
                accept=".pdf"
                hidden
                onChange={(e) => e.target.files && setCvFile(e.target.files[0])}
              />
            </label>

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 border rounded-xl py-4 font-bold flex items-center justify-center gap-2"
              >
                <ChevronLeft size={16} /> Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] py-4 bg-gradient-to-r from-[#4640DE] to-[#3730a3] text-white rounded-xl font-bold flex items-center justify-center disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Finish Setup"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
=======
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-white overflow-y-auto">
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="hidden lg:flex relative bg-gradient-to-b from-[#4640DE] to-[#1e1b4b] p-20 items-center">
          <div className="absolute text-white/5 text-[12rem] font-bold -translate-x-10 -translate-y-10">
            JobLink
          </div>
          <div className="relative z-10 text-white max-w-md">
            <h1 className="text-4xl font-bold mb-4">Complete your profile</h1>
            <p className="text-white/80">
              Employers prefer candidates with completed profiles.
            </p>
          </div>
        </div>

        {/* FORM PANEL */}
        <div className="p-8 sm:p-12 flex justify-center items-center">
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">

            <div className="text-center">
              <p className="text-[#4640DE] text-[10px] uppercase font-bold">
                Step 2 of 2
              </p>
              <h2 className="text-3xl font-bold">Complete Profile</h2>
            </div>

            {/* GLOBAL ERROR */}
            {formError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex gap-2 text-red-600 text-sm">
                <AlertCircle size={18} /> {formError}
              </div>
            )}

            {/* PROFILE PHOTO */}
            <label className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer
              ${!profileImage && formError.includes("photo") ? "border-red-500 bg-red-50" : "border-gray-300 bg-[#EEF2FF]"}`}>
              <div className="w-14 h-14 rounded-full border flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  <img src={URL.createObjectURL(profileImage)} className="w-full h-full object-cover" />
                ) : (
                  <Camera className="text-gray-400" />
                )}
              </div>
              <div>
                <p className="font-semibold text-sm">
                  Profile Photo <span className="text-red-500">*</span>
                </p>
                <p className="text-[10px] text-gray-500">PNG / JPG</p>
              </div>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => e.target.files && setProfileImage(e.target.files[0])}
              />
            </label>

            {/* INPUTS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CustomInput
                label="Phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <CustomInput
                label="Birth Date"
                id="dob"
                type="date"
                icon={Calendar}
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CustomInput
                label="Profession"
                id="profession"
                icon={Briefcase}
                value={formData.profession}
                onChange={handleChange}
                required
              />
              <CustomInput
                label="Location"
                id="location"
                icon={MapPin}
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>
=======
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile Data:", formData);
    console.log("Profile Image:", profileImage?.name);
    console.log("CV File:", cvFile?.name);
  };

  const InputWrapper = ({
    children,
    label,
  }: {
    children: React.ReactNode;
    label: string;
  }) => (
    <div className="relative pt-4">
      {/* Label text is darker */}
      <label className="text-sm font-light text-gray-600 absolute -top-1 left-0">
        {label}
      </label>
      {children}
    </div>
  );

  return (
    <div className="pt-2">
      <p className="text-gray-500 text-sm tracking-widest uppercase mb-1">
        Step 2 of 2
      </p>
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
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={URL.createObjectURL(profileImage)}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
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
              <Upload className="w-3 h-3 text-white" />
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
          <CustomInput
            label="Phone Number"
            id="phone"
            icon={Phone}
            placeholder="(123) 456-7890"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <CustomInput
            label="Date of Birth"
            id="dob"
            type="date"
            icon={Calendar}
            placeholder="YYYY-MM-DD"
            value={formData.dob}
            onChange={handleChange}
            error={errors.dob}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CustomInput
            label="Profession"
            id="profession"
            icon={Briefcase}
            placeholder="Software Engineer"
            value={formData.profession}
            onChange={handleChange}
            error={errors.profession}
          />
          <CustomInput
            label="Location"
            id="location"
            icon={MapPin}
            placeholder="City, Country"
            value={formData.location}
            onChange={handleChange}
            error={errors.location}
          />
        </div>

        {/* Gender Select */}
        {/* eslint-disable-next-line react-hooks/static-components */}
        <InputWrapper label="Gender">
          <select
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            // Select is light background, dark text
            className="w-full bg-transparent border-b border-blue-600/50 focus:border-blue-600 text-gray-900 py-2 focus:outline-none transition duration-200"
          >
            {/* Options need a light background for visibility */}
            <option value="" disabled className="bg-white text-gray-900">
              Select Gender
            </option>
            <option value="male" className="bg-white text-gray-900">
              Male
            </option>
            <option value="female" className="bg-white text-gray-900">
              Female
            </option>
            <option value="other" className="bg-white text-gray-900">
              Other
            </option>
          </select>
        </InputWrapper>

        {/* CV PDF Upload */}
        <div className="border border-dashed border-gray-400 p-4 rounded-lg text-center cursor-pointer hover:border-blue-600 transition">
          <label
            htmlFor="cv-upload"
            className="flex flex-col items-center justify-center space-y-2"
          >
            <FileText className="w-6 h-6 text-gray-600" />
            <p className="text-sm text-gray-700">
              {cvFile ? cvFile.name : "Click to upload CV (PDF only)"}
            </p>
            <input
              id="cv-upload"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => handleFileChange(e, setCvFile)}
            />
          </label>
          <button
            type="button"
            onClick={() => setCvFile(null)}
            className="mt-2 text-xs text-red-600 hover:text-red-700"
          >
            Remove File
          </button>
        </div>
>>>>>>> 440f778734d4a8a67b276a97fda4b4e76efdc029

            {/* CV UPLOAD */}
            <label className="border-2 border-dashed rounded-xl p-5 bg-[#EEF2FF] cursor-pointer text-center hover:border-[#4640DE] transition-all">
              <FileText className="mx-auto mb-2 text-gray-600" />
              <p className="text-xs font-medium">{cvFile ? cvFile.name : "Upload CV (PDF)"}</p>
              <input
                type="file"
                accept=".pdf"
                hidden
                onChange={(e) => e.target.files && setCvFile(e.target.files[0])}
              />
            </label>

            {/* BUTTONS */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 border rounded-xl py-4 font-bold flex items-center justify-center gap-2"
              >
                <ChevronLeft size={16} /> Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-[2] py-4 bg-gradient-to-r from-[#4640DE] to-[#3730a3] text-white rounded-xl font-bold flex items-center justify-center disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : "Finish Setup"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
};

export default CompleteProfileForm;
>>>>>>> 440f778734d4a8a67b276a97fda4b4e76efdc029
>>>>>>> db4d4868c86063b8d18f4058f7e8d68a22bcc418
