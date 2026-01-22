/* eslint-disable jsx-a11y/alt-text */
"use client";

import { useState, useEffect } from "react";
import {
  Camera,
  Calendar,
  MapPin,
  Briefcase,
  FileText,
  ChevronLeft,
  Loader2,
  AlertCircle,
  User,
} from "lucide-react";
import CustomInput from "./CustomInput";
import { auth, rtdb, storage } from "@/firebase/clientApp";
import { ref as dbRef, set } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useRouter } from "next/navigation";

type CompleteProfileFormProps = {
  onBack: () => void;
};

export default function CompleteProfileForm({
  onBack,
}: CompleteProfileFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    username: "", // Added username field
    phone: "",
    dob: "",
    profession: "",
    location: "",
    gender: "male", // Default value
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
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

    try {
      // 1️⃣ Handle Profile Photo (Use manual upload OR fallback to social photo)
      let photoURL = user.photoURL || "";
      if (profileImage) {
        const imageRef = storageRef(
          storage,
          `profiles/${user.uid}/profile.jpg`,
        );
        await uploadBytes(imageRef, profileImage);
        photoURL = await getDownloadURL(imageRef);
      }

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
        username: formData.username,
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
    } catch (err: unknown) {
      console.error(err);
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong.";
      setFormError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-9999 bg-white overflow-y-auto">
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* LEFT PANEL */}
        <div className="hidden lg:flex relative bg-linear-to-b from-[#4640DE] to-[#1e1b4b] p-20 items-center">
          <div className="absolute text-white/5 text-[12rem] font-bold -translate-x-10 -translate-y-10">
            JobLink
          </div>
          <div className="relative z-10 text-white max-w-md">
            <h1 className="text-4xl font-bold mb-4">Complete your profile</h1>
            <p className="text-white/80">
              Personalizing your profile helps us find the best job matches for
              your career goals.
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
              <h2 className="text-3xl font-bold">Setup Details</h2>
            </div>

            {formError && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex gap-2 text-red-600 text-sm animate-shake">
                <AlertCircle size={18} /> {formError}
              </div>
            )}

            {/* PROFILE PHOTO */}
            <label
              className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer
              ${
                !profileImage && formError.includes("photo")
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-[#EEF2FF]"
              }`}
            >
              <div className="w-14 h-14 rounded-full border flex items-center justify-center overflow-hidden">
                {profileImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={URL.createObjectURL(profileImage)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="text-gray-400" />
                )}
              </div>
              <div>
                <p className="font-semibold text-sm text-gray-700">
                  Profile Photo
                </p>
                <p className="text-[10px] text-gray-500">
                  Click to upload new image
                </p>
              </div>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) =>
                  e.target.files && setProfileImage(e.target.files[0])
                }
              />
            </label>

            {/* USERNAME (Auto-filled from Auth) */}
            <CustomInput
              label="Username / Full Name"
              id="username"
              icon={User}
              value={formData.username}
              onChange={handleChange}
              placeholder="How should we call you?"
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CustomInput
                label="Phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234..."
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

            {/* GENDER SELECTION BUTTONS */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Gender
              </label>
              <div className="flex gap-3">
                {["male", "female", "other"].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setFormData({ ...formData, gender: option })}
                    className={`flex-1 py-2 rounded-xl border text-sm font-medium transition-all capitalize ${
                      formData.gender === option
                        ? "bg-[#4640DE] text-white border-[#4640DE]"
                        : "bg-white text-gray-600 border-gray-300 hover:border-[#4640DE]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <CustomInput
                label="Profession"
                id="profession"
                icon={Briefcase}
                value={formData.profession}
                onChange={handleChange}
                placeholder="e.g. Designer"
                required
              />
              <CustomInput
                label="Location"
                id="location"
                icon={MapPin}
                value={formData.location}
                onChange={handleChange}
                placeholder="City, Country"
                required
              />
            </div>

            {/* CV UPLOAD */}
            <label className="flex flex-col border-2 border-dashed rounded-xl p-5 bg-[#EEF2FF] cursor-pointer text-center hover:border-[#4640DE] transition-all">
              <FileText className="mx-auto mb-2 text-gray-600" />
              <p className="text-xs font-medium">
                {cvFile ? cvFile.name : "Upload CV (PDF)"}
              </p>
              <input
                type="file"
                accept=".pdf"
                hidden
                onChange={(e) => e.target.files && setCvFile(e.target.files[0])}
              />
            </label>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 border border-gray-300 rounded-xl py-4 font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
              >
                <ChevronLeft size={16} /> Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-2 py-4 bg-gradient-to-r from-[#4640DE] to-[#3730a3] text-white rounded-xl font-bold flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  "Finish Setup"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
