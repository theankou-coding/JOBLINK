"use client";

import React, { useState, useEffect } from "react";
import {
  MapPin,
  Briefcase,
  Clock,
  ChevronLeft,
  CheckCircle2,
  Calendar,
  Building2,
  Timer,
  AlertCircle,
  Navigation,
  DollarSign,
  User,
  X,
  Maximize2,
  ChevronRight,
  Users,
  Award,
  FileText,
  Target,
  Sparkles,
  Eye,
  Save,
  Database,
  Wallet,
  CreditCard
} from "lucide-react";
import { auth } from "@/firebase/clientApp";
import { getDatabase, ref as dbRef, get, set, push } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { getStorage, ref as sRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { DraftManager } from "@/lib/draftManager";

export interface CreateJobPreviewProps {
  data: {
    category: string;
    title: string;
    jobDescription: string;
    businessName: string;
    businessType: string;
    daysPerWeek: string;
    salary: string;
    currency: "USD" | "KHR";
    benefits: string[];
    experience: string;
    otherRequirements: string;
    startTime: string;
    endTime: string;
    location: string;
    latitude: number;
    longitude: number;
    responsibilities: string[];
    skills: string[];
    province: string;
    workplaceType: string;
    locationDescription: string;
    mapLink: string;
  };
  images: File[];
  onBack: () => void;
  onPublish: () => void;
}

export default function CreateJobPreview({ data, images, onBack, onPublish }: CreateJobPreviewProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isMaximized, setIsMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'requirements'>('overview');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingDraft, setSavingDraft] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const router = useRouter();

  // Check online status
  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const calculateWorkHours = (start: string, end: string) => {
    if (!start || !end) return "N/A";
    const parseTime = (timeStr: string) => {
      const [time, modifier] = timeStr.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (modifier === 'PM' && hours !== 12) hours += 12;
      if (modifier === 'AM' && hours === 12) hours = 0;
      return hours * 60 + minutes;
    };
    try {
      const startMinutes = parseTime(start);
      const endMinutes = parseTime(end);
      const diffMinutes = endMinutes - startMinutes;
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
    } catch (e) { return "N/A"; }
  };

  const formatTime = (time: string) => {
    if (!time) return "";
    if (time.includes('AM') || time.includes('PM')) return time;
    const [hours, minutes] = time.split(':').map(Number);
    const modifier = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${modifier}`;
  };

  useEffect(() => {
    const urls = images.map((img) => URL.createObjectURL(img));
    setImageUrls(urls);
    return () => urls.forEach((url) => URL.revokeObjectURL(url));
  }, [images]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const rtdb = getDatabase();
          const userRef = dbRef(rtdb, `users/${user.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            setUserProfile(snapshot.val());
          } else {
            // Fallback to auth data if no profile exists
            setUserProfile({
              username: user.displayName || "User",
              photoURL: user.photoURL || "",
              profession: "Employer"
            });
          }
        } catch (err) {
          console.error("Error fetching user profile:", err);
          // Fallback on error
          setUserProfile({
            username: user.displayName || "User",
            photoURL: user.photoURL || "",
            profession: "Employer"
          });
        } finally {
          setLoadingProfile(false);
        }
      } else {
        setLoadingProfile(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePublish = async () => {
    if (!currentUser) {
      setError("You must be logged in to publish.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const storage = getStorage();
      const db = getDatabase();

      // 1. Upload Images to Storage
      const uploadedUrls = await Promise.all(
        images.map(async (file, index) => {
          const fileExtension = file.name.split('.').pop();
          const storageRef = sRef(storage, `posts/${currentUser.uid}/${Date.now()}_${index}.${fileExtension}`);
          const snapshot = await uploadBytes(storageRef, file);
          return await getDownloadURL(snapshot.ref);
        })
      );

      // 2. Generate a new Post ID (Key)
      const postsListRef = dbRef(db, 'posts');
      const newPostRef = push(postsListRef);
      const generatedPostId = newPostRef.key;

      // 3. Construct data to match your exact requested schema
      const finalPostData = {
        // Job Details
        title: data.title,
        jobDescription: data.jobDescription,
        category: data.category,
        businessName: data.businessName,
        businessType: data.businessType,

        // schedule & pay
        daysPerWeek: data.daysPerWeek,
        startTime: data.startTime,
        endTime: data.endTime,
        salary: data.salary,
        currency: data.currency,
        benefits: data.benefits || [],

        // Location
        province: data.province,
        workplaceType: data.workplaceType,
        latitude: data.latitude || 0,
        longitude: data.longitude || 0,
        mapLink: data.mapLink || `http://googleusercontent.com/maps.google.com/${generatedPostId}`,
        locationDescription: data.locationDescription || "",

        // Requirements
        experience: data.experience,
        otherRequirements: data.otherRequirements,

        // Media
        images: uploadedUrls,

        // User info
        employerId: currentUser.uid,
        authorName: userProfile?.username || currentUser?.displayName || "Employer",
        authorPhoto: userProfile?.photoURL || "",

        // generated IDs & Timestamps
        postId: generatedPostId,
        timestamp: Date.now(),
        status: "active", // Set as active when published
        views: 0,
        applications: 0,
      };

      // 4. Save to Database
      await set(newPostRef, finalPostData);

      // 5. Update user's total posts count
      if (userProfile) {
        const userRef = dbRef(db, `users/${currentUser.uid}`);
        const currentTotal = userProfile.totalPosts || 0;
        await set(userRef, {
          ...userProfile,
          totalPosts: currentTotal + 1,
          updatedAt: Date.now()
        });
      }

      // Success
      onPublish();

      // REDIRECT TO HOME
      router.push("/home");

    } catch (err: any) {
      console.error("Firebase Publish Error:", err);
      setError(err.message || "Failed to publish post.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    if (!currentUser) {
      setError("You must be logged in to save draft.");
      return;
    }

    setSavingDraft(true);
    setError("");

    try {
      // Compress images before saving locally
      const compressedImages = await DraftManager.compressImages(images, 0.7);
      
      // Convert compressed base64 strings back to File objects for DraftManager
      const compressedFiles = await Promise.all(
        compressedImages.map(async (base64, index) => {
          const response = await fetch(base64);
          const blob = await response.blob();
          return new File([blob], `compressed_${index}.jpg`, { type: 'image/jpeg' });
        })
      );

      // Save draft locally using DraftManager
      const draft = await DraftManager.saveDraftLocally(data, compressedFiles);
      
      // Show success message
      alert(`Draft saved successfully ${!isOnline ? 'locally (offline)' : 'locally'}! You can find it in your Dashboard.`);
      
      // Optionally redirect to dashboard
      router.push("/user_dashboard");

    } catch (err: any) {
      console.error("Save Draft Error:", err);
      setError(err.message || "Failed to save draft.");
    } finally {
      setSavingDraft(false);
    }
  };

  const workHoursPerDay = calculateWorkHours(data.startTime, data.endTime);
  const formattedStartTime = formatTime(data.startTime);
  const formattedEndTime = formatTime(data.endTime);
  const currencySymbol = data.currency === "USD" ? "$" : "៛";

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50 overflow-hidden">

      {/* Full Screen Image Overlay */}
      {isMaximized && (
        <div
          className="fixed inset-0 z-999 bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsMaximized(false)}
        >
          <button 
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:rotate-90 transition-transform duration-300 p-2 hover:bg-white/10 rounded-full z-1000"
            onClick={(e) => {
              e.stopPropagation();
              setIsMaximized(false);
            }}
          >
            <X size={28} />
          </button>
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={imageUrls[currentImage]}
              className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain"
              alt="Full view"
              onClick={(e) => e.stopPropagation()}
            />
            {images.length > 1 && (
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-1000">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImage(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${currentImage === idx ? "w-8 bg-white" : "w-2 bg-white/50"
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-slate-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-semibold group"
              >
                <div className="p-2 rounded-full group-hover:bg-indigo-50 transition-colors">
                  <ChevronLeft size={20} />
                </div>
                <span className="hidden sm:inline">Back to Edit</span>
              </button>
              <div className="h-8 w-px bg-slate-200 hidden sm:block" />
              <div className="hidden sm:block">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <Eye size={18} className="text-indigo-600" />
                  Preview Mode
                </h2>
                <p className="text-xs text-slate-500">Review before publishing</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 bg-slate-100 px-3 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
              Draft
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 h-[calc(100vh-120px)] overflow-hidden">
          
          {/* MAIN CONTENT - Scrollable */}
          <div className="flex-1 overflow-y-auto lg:overflow-y-auto no-scrollbar">
            <div className="bg-white rounded-2xl lg:rounded-3xl shadow-sm border border-slate-200/50 overflow-hidden mb-6 lg:mb-0">

              {/* Image Carousel - FIXED */}
              <div className="relative">
                <div className="relative aspect-videolg:aspect-[2/1] bg-slate-100 overflow-hidden">
                  <img
                    src={imageUrls[currentImage] || "https://via.placeholder.com/1200x600?text=No+Image"}
                    className="w-full h-full object-cover"
                    alt="Job"
                  />

                  {/* Navigation Arrows - Only show on hover */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}

                  {/* Maximize Button */}
                  {images.length > 0 && (
                    <button
                      onClick={() => setIsMaximized(true)}
                      className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full z-10"
                    >
                      <Maximize2 size={20} />
                    </button>
                  )}

                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-medium z-10">
                      {currentImage + 1} / {images.length}
                    </div>
                  )}

                  {/* Pagination Dots - Always visible */}
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setCurrentImage(idx);
                          }}
                          className={`h-2 rounded-full transition-all duration-300 ${currentImage === idx ? "w-8 bg-white" : "w-2 bg-white/60 hover:bg-white/80"
                            }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 lg:p-8 space-y-6">

                {/* Title & Company */}
                <div className="space-y-3">
                  <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-slate-900 leading-tight">
                    {data.title || "Job Title"}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 text-indigo-600 font-semibold">
                      <Building2 size={18} />
                      <span>{data.businessName || "Company Name"}</span>
                    </div>
                    {data.businessType && (
                      <>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-600 text-sm">{data.businessType}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Key Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-4 p-4 bg-linear-to-br from-emerald-50 to-emerald-100/50 rounded-xl border border-emerald-200/50">
                    <div className="w-12 h-12 bg-white flex items-center justify-center rounded-xl text-emerald-600 shadow-sm">
                      <CreditCard size={24} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 text-lg">
                        {currencySymbol}{data.salary || "Negotiable"}
                      </span>
                      <span className="text-xs text-emerald-700 font-medium">Monthly Salary</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-linear-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-200/50">
                    <div className="w-12 h-12 bg-white flex items-center justify-center rounded-xl text-blue-600 shadow-sm">
                      <MapPin size={24} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-slate-900 text-lg truncate">
                        {data.province || "Location"}
                      </span>
                      <span className="text-xs text-blue-700 font-medium">Work Location</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-linear-to-br from-purple-50 to-purple-100/50 rounded-xl border border-purple-200/50 sm:col-span-2 lg:col-span-1">
                    <div className="w-12 h-12 bg-white flex items-center justify-center rounded-xl text-purple-600 shadow-sm">
                      <Briefcase size={24} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 text-lg">
                        {data.experience || "Not Specified"}
                      </span>
                      <span className="text-xs text-purple-700 font-medium">Experience Level</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {data.category && (
                    <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Sparkles size={14} />
                      {data.category}
                    </span>
                  )}
                  {data.workplaceType && (
                    <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                      {data.workplaceType === 'on_site' ? 'On-site' :
                        data.workplaceType === 'remote' ? 'Remote' :
                          data.workplaceType === 'hybrid' ? 'Hybrid' : data.workplaceType}
                    </span>
                  )}
                  <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Active
                  </span>
                </div>

                <hr className="border-slate-200" />

                {/* Tabs */}
                <div className="flex gap-4 border-b border-slate-200">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-3 px-1 font-semibold transition-colors relative ${activeTab === 'overview'
                      ? 'text-indigo-600'
                      : 'text-slate-500 hover:text-slate-700'
                      }`}
                  >
                    Overview
                    {activeTab === 'overview' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                    )}
                  </button>
                  <button
                    onClick={() => setActiveTab('requirements')}
                    className={`pb-3 px-1 font-semibold transition-colors relative ${activeTab === 'requirements'
                      ? 'text-indigo-600'
                      : 'text-slate-500 hover:text-slate-700'
                      }`}
                  >
                    Requirements
                    {activeTab === 'requirements' && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                    )}
                  </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Description */}
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <FileText size={20} className="text-indigo-600" />
                        Job Description
                      </h3>
                      <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                        {data.jobDescription || "No description provided."}
                      </p>
                    </div>

                    {/* Working Conditions */}
                    <div className="bg-linear-to-br from-slate-50 to-slate-100/50 rounded-xl p-6 border border-slate-200">
                      <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Clock size={20} className="text-indigo-600" />
                        Working Conditions
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 text-slate-700">
                          <Calendar size={18} className="text-slate-500" />
                          <span className="font-medium">{data.daysPerWeek || "N/A"} days per week</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-700">
                          <Timer size={18} className="text-slate-500" />
                          <span className="font-medium">
                            {formattedStartTime && formattedEndTime
                              ? `${formattedStartTime} - ${formattedEndTime}`
                              : "Time not specified"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-700 sm:col-span-2">
                          <Clock size={18} className="text-slate-500" />
                          <span className="font-medium">{workHoursPerDay} per day</span>
                        </div>
                      </div>
                    </div>

                    {/* Benefits */}
                    {data.benefits && data.benefits.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                          <Award size={20} className="text-indigo-600" />
                          Benefits & Perks
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {data.benefits.map((benefit, i) => (
                            <span
                              key={i}
                              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 font-medium hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                            >
                              <CheckCircle2 size={14} className="inline mr-1.5 text-emerald-500" />
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Location */}
                    {((data.latitude && data.longitude) || data.locationDescription) && (
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                          <MapPin size={20} className="text-indigo-600" />
                          Location Details
                        </h3>

                        {data.locationDescription && (
                          <p className="text-slate-600 mb-4 leading-relaxed">
                            {data.locationDescription}
                          </p>
                        )}

                        {data.latitude && data.longitude && (
                          <div className="relative w-full h-64 lg:h-80 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                            <iframe
                              title="Job Location"
                              className="w-full h-full"
                              loading="lazy"
                              allowFullScreen
                              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCKSeVZpoW7rljXrt-T295e-WbrvG-y-PY&q=${data.latitude},${data.longitude}&zoom=15`}
                            />
                            <a
                              href={`https://www.google.com/maps/dir/?api=1&destination=${data.latitude},${data.longitude}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute bottom-4 right-4 bg-indigo-600 text-white px-4 lg:px-6 py-2.5 lg:py-3 rounded-full flex items-center gap-2 font-semibold shadow-lg hover:bg-indigo-700 transition-all hover:scale-105"
                            >
                              <Navigation size={18} />
                              <span className="hidden sm:inline">Get Directions</span>
                              <span className="sm:hidden">Directions</span>
                            </a>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'requirements' && (
                  <div className="space-y-6">
                    {/* Experience & Other Requirements */}
                    {(data.experience || data.otherRequirements) && (
                      <div className="space-y-4">
                        {data.experience && (
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                              <Briefcase size={20} className="text-indigo-600" />
                              Experience Required
                            </h3>
                            <p className="text-slate-700 font-medium bg-slate-50 p-4 rounded-xl border border-slate-200">
                              {data.experience}
                            </p>
                          </div>
                        )}

                        {data.otherRequirements && (
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                              <Target size={20} className="text-indigo-600" />
                              Additional Requirements
                            </h3>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-200">
                              {data.otherRequirements}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {!data.experience && !data.otherRequirements && (
                      <div className="text-center py-12 text-slate-400">
                        <Users size={48} className="mx-auto mb-3 opacity-50" />
                        <p className="font-medium">No specific requirements listed</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SIDEBAR - Fixed height and scrollable */}
          <aside className="w-full lg:w-80 xl:w-96 lg:sticky lg:top-24">
            <div className="space-y-4 h-full">
              {/* Employer Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm">
                {loadingProfile ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="w-8 h-8 border-3 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
                      {userProfile?.photoURL ? (
                        <img
                          src={userProfile.photoURL}
                          alt="Profile"
                          className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100 shadow-sm"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                          <User size={32} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-lg truncate">
                          {userProfile?.username || currentUser?.displayName || "User"}
                        </h4>
                        <p className="text-sm text-slate-500 truncate">
                          {userProfile?.profession || "Employer"}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 py-3 rounded-xl mb-6">
                      <Clock size={16} />
                      <span>Just now • 0 Views</span>
                    </div>

                    {/* Online/Offline Indicator */}
                    <div className={`flex items-center justify-center gap-2 text-sm font-medium py-2 rounded-xl mb-4 ${isOnline ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {isOnline ? (
                        <>
                          <CheckCircle2 size={16} />
                          <span>You're online</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle size={16} />
                          <span>You're offline</span>
                        </>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <button
                        onClick={handlePublish}
                        disabled={loading || !isOnline}
                        className="w-full py-4 bg-linear-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-bold text-base hover:from-indigo-700 hover:to-indigo-600 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {loading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Publishing...
                          </>
                        ) : !isOnline ? (
                          <>
                            <AlertCircle size={20} />
                            Must be online to publish
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={20} />
                            Publish Job Now
                          </>
                        )}
                      </button>

                      <div className="flex gap-3">
                        <button 
                          onClick={handleSaveDraft}
                          disabled={savingDraft}
                          className="flex-1 py-3 border border-slate-200 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {savingDraft ? (
                            <>
                              <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Database size={16} />
                              {isOnline ? "Save Draft Locally" : "Save Draft Offline"}
                            </>
                          )}
                        </button>
                      </div>
                      
                      {/* Draft Info */}
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                        <p className="text-blue-600 text-sm text-center font-medium">
                          {isOnline 
                            ? "Drafts are saved locally and can be synced when you publish."
                            : "Drafts saved offline will sync when you're back online."}
                        </p>
                      </div>
                    </div>

                    {error && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-600 text-sm text-center font-medium">{error}</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}