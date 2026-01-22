"use client";

import React, { useState, useEffect } from "react";
import {
  DollarSign, MapPin, Briefcase, CheckCircle2, MessageSquare,
  Navigation, Clock, Building2, Timer, Calendar, AlertCircle,
  User, Maximize2, ChevronLeft, ChevronRight, Eye, Sparkles,
  FileText, Target, Award, X, Users, Award as AwardIcon,
  Loader2, Mail, Phone, Briefcase as BriefcaseIcon, MapPin as MapPinIcon
} from "lucide-react";
import { getDatabase, ref, get } from "firebase/database";

interface UserData {
  username?: string;
  displayName?: string;
  photoURL?: string | null;
  profileImage?: string | null;
  profession?: string;
  businessName?: string;
  email?: string;
  phone?: string;
  phoneNumber?: string;
  bio?: string;
  rating?: number;
  totalJobs?: number;
  totalPosts?: number;
  memberSince?: string;
  createdAt?: string;
  location?: string;
  [key: string]: any; // For other properties
}

export interface JobDetailProps {
  // Job data
  id: string;
  postName: string;
  title: string;
  location: string;
  province: string;
  postDate: string;
  description: string;
  jobDescription: string;
  profileName: string;
  authorName: string;
  experience: string;
  timeCommitment: string;
  salaryRange: string;
  salary: string;
  currency: "USD" | "KHR";
  profileImage: string | null;
  authorPhoto: string | null;
  cardBackgroundImage: string;
  cardBackgroundImages: string[];
  images: string[];
  benefits: string[];
  daysPerWeek: string;
  startTime: string;
  endTime: string;
  category: string;
  businessName: string;
  businessType: string;
  workplaceType: string;
  otherRequirements: string;
  latitude: number;
  longitude: number;
  locationDescription: string;
  timestamp: number;
  views: number;
  employerId: string;
}

export default function JobDetail({
  id,
  postName,
  title,
  location,
  province,
  postDate,
  description,
  jobDescription,
  profileName,
  authorName,
  experience,
  timeCommitment,
  salaryRange,
  salary,
  currency = "USD",
  profileImage,
  authorPhoto,
  cardBackgroundImage,
  cardBackgroundImages,
  images: propImages,
  benefits = [],
  daysPerWeek,
  startTime,
  endTime,
  category,
  businessName,
  businessType,
  workplaceType,
  otherRequirements,
  latitude,
  longitude,
  locationDescription,
  timestamp,
  views = 0,
  employerId
}: JobDetailProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isMaximized, setIsMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'requirements'>('overview');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Fetch user data from Firebase
  useEffect(() => {
    const fetchUserData = async () => {
      setLoadingUser(true);
      setFetchError(null);

      if (!employerId) {
        console.log("No employerId provided, using fallback data");
        setUserData({
          username: authorName || profileName || "Employer",
          displayName: authorName || profileName || "Employer",
          photoURL: authorPhoto || profileImage || null,
          profession: businessName || "Employer",
          email: "Not provided",
          phone: "Not provided",
          location: province || location || "Not specified"
        });
        setLoadingUser(false);
        return;
      }

      try {
        console.log(`Fetching user data for ID: ${employerId}`);
        const db = getDatabase();
        
        // Try to fetch from the correct database path
        const userRef = ref(db, `users/${employerId}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const user = snapshot.val();
          console.log("User data found:", user);
          
          // Extract user information with proper fallbacks
          const extractedUserData: UserData = {
            username: user.username || user.displayName || authorName || profileName || "Employer",
            displayName: user.displayName || user.username || authorName || profileName || "Employer",
            photoURL: user.photoURL || user.profileImage || authorPhoto || profileImage || null,
            profession: user.profession || businessName || "Employer",
            email: user.email || "Not provided",
            phone: user.phone || user.phoneNumber || "Not provided",
            phoneNumber: user.phoneNumber || user.phone || "Not provided",
            bio: user.bio || "No bio available",
            rating: user.rating || 0,
            totalJobs: user.totalJobs || user.totalPosts || 0,
            totalPosts: user.totalPosts || user.totalJobs || 0,
            memberSince: user.memberSince || user.createdAt || "Recently",
            createdAt: user.createdAt || user.memberSince,
            location: user.location || province || location || "Not specified",
            // Include all other properties
            ...user
          };
          
          setUserData(extractedUserData);
          setFetchError(null);
        } else {
          console.warn(`User with ID ${employerId} not found in database`);
          setFetchError("Employer profile not found in database");
          // Fallback to props
          setUserData({
            username: authorName || profileName || "Employer",
            displayName: authorName || profileName || "Employer",
            photoURL: authorPhoto || profileImage || null,
            profession: businessName || "Employer",
            email: "Profile not available",
            phone: "Profile not available",
            location: province || location || "Not specified"
          });
        }
      } catch (error: any) {
        console.error("Error fetching user data:", error);
        
        if (error.code === 'PERMISSION_DENIED') {
          setFetchError("Permission denied. Please check Firebase database rules.");
          console.error("Firebase rules need to allow reading users. Make sure rules are set to allow .read on users.");
        } else {
          setFetchError(`Error loading employer data: ${error.message}`);
        }
        
        // Fallback on error
        setUserData({
          username: authorName || profileName || "Employer",
          displayName: authorName || profileName || "Employer",
          photoURL: authorPhoto || profileImage || null,
          profession: businessName || "Employer",
          email: "Error loading data",
          phone: "Error loading data",
          location: province || location || "Not specified"
        });
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserData();
  }, [employerId, authorName, profileName, authorPhoto, profileImage, businessName, province, location]);

  // Helper functions
  const images = propImages || cardBackgroundImages || (cardBackgroundImage ? [cardBackgroundImage] : []);
  const jobTitle = title || postName || "Job Title";
  const jobDesc = jobDescription || description || "No description provided.";
  const companyName = businessName || "Company Name";
  const jobLocation = province || location || "Location";
  const currencySymbol = currency === "USD" ? "$" : "៛";

  // Calculate salary
  let jobSalary = salary || "Negotiable";
  if (salaryRange && !salary) {
    const match = salaryRange.match(/\$(\d+)/);
    if (match) jobSalary = match[1];
  }

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

  if (!id) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Briefcase className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-700 mb-2">No Job Selected</h2>
          <p className="text-slate-500">Select a job from the list to view details</p>
        </div>
      </div>
    );
  }

  const workHoursPerDay = calculateWorkHours(startTime || "", endTime || "");
  const formattedStartTime = formatTime(startTime || "");
  const formattedEndTime = formatTime(endTime || "");
  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  // Helper to get contact info
  const getUserEmail = () => userData?.email || "Not provided";
  const getUserPhone = () => userData?.phone || userData?.phoneNumber || "Not provided";
  const getUserProfession = () => userData?.profession || businessName || "Not specified";
  const getUserName = () => userData?.displayName || userData?.username || authorName || profileName || "Employer";

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Full Screen Image Overlay */}
      {isMaximized && images.length > 0 && (
        <div
          className="fixed inset-0 z-999 bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsMaximized(false)}
        >
          <button className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:rotate-90 transition-transform duration-300 p-2 hover:bg-white/10 rounded-full">
            <X size={28} />
          </button>
          <img
            src={images[currentImage]}
            className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain"
            alt="Full view"
          />
          {images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${currentImage === idx ? "w-8 bg-white" : "w-2 bg-white/50"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-col xl:flex-row gap-6 lg:gap-8 mt-10 pb-20">
          {/* MAIN CONTENT */}
          <div className="flex-1 space-y-6 lg:w-full xl:w-[70%]">
            <div className="bg-white rounded-2xl lg:rounded-3xl shadow-sm border border-slate-200/50 overflow-hidden">
              {/* Image Carousel */}
              {images.length > 0 ? (
                <div className="relative group">
                  <div className="relative aspect-video lg:aspect-2/1 bg-slate-100">
                    <img
                      src={images[currentImage]}
                      className="w-full h-full object-cover"
                      alt="Job"
                    />
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <ChevronLeft size={24} />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => setIsMaximized(true)}
                      className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                    >
                      <Maximize2 size={20} />
                    </button>
                    {images.length > 1 && (
                      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
                        {currentImage + 1} / {images.length}
                      </div>
                    )}
                  </div>
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImage(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${currentImage === idx ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative aspect-video lg:aspect-2/1 bg-slate-100">
                  <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-slate-100 to-slate-200">
                    <Briefcase className="w-24 h-24 text-slate-300" />
                  </div>
                </div>
              )}

              {/* Content Section */}
              <div className="p-6 lg:p-8 space-y-6">
                {/* Title & Company */}
                <div className="space-y-3">
                  <h1 className="text-lg lg:text-2xl font-semibold text-slate-900 leading-tight">
                    {jobTitle}
                  </h1>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 text-indigo-600 font-medium">
                      <Building2 size={18} />
                      <span>{companyName}</span>
                    </div>
                    {businessType && (
                      <>
                        <span className="text-slate-300">•</span>
                        <span className="text-slate-600 text-sm">{businessType}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Optimized Key Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-linear-to-br from-emerald-50 to-emerald-100/50 rounded-lg border border-emerald-200/40">
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg text-emerald-600 bg-white shadow-sm shrink-0">
                      <DollarSign size={18} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-slate-900 text-sm leading-tight truncate">
                        {currencySymbol}{jobSalary}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wider">Salary</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-linear-to-br from-blue-50 to-blue-100/50 rounded-lg border border-blue-200/40">
                    <div className="w-9 h-9 bg-white flex items-center justify-center rounded-lg text-blue-600 shadow-sm shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-slate-900 text-sm leading-tight truncate">
                        {jobLocation}
                      </span>
                      <span className="text-[10px] text-blue-700 font-semibold uppercase tracking-wider">Location</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-linear-to-br from-purple-50 to-purple-100/50 rounded-lg border border-purple-200/40">
                    <div className="w-9 h-9 bg-white flex items-center justify-center rounded-lg text-purple-600 shadow-sm shrink-0">
                      <Briefcase size={18} />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-slate-900 text-sm leading-tight truncate">
                        {experience || "Any"}
                      </span>
                      <span className="text-[10px] text-purple-700 font-semibold uppercase tracking-wider">Experience</span>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {category && (
                    <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold flex items-center gap-2">
                      <Sparkles size={14} />
                      {category}
                    </span>
                  )}
                  {workplaceType && (
                    <span className="px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                      {workplaceType === 'on_site' ? 'On-site' :
                       workplaceType === 'remote' ? 'Remote' :
                       workplaceType === 'hybrid' ? 'Hybrid' : workplaceType}
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
                    className={`pb-3 px-1 font-semibold transition-colors relative ${activeTab === 'overview' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Overview
                    {activeTab === 'overview' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />}
                  </button>
                  <button
                    onClick={() => setActiveTab('requirements')}
                    className={`pb-3 px-1 font-semibold transition-colors relative ${activeTab === 'requirements' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Requirements
                    {activeTab === 'requirements' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />}
                  </button>
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <FileText size={20} className="text-indigo-600" />
                        Job Description
                      </h3>
                      <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
                        {jobDesc}
                      </p>
                    </div>

                    {(daysPerWeek || startTime || endTime) && (
                      <div className="bg-linear-to-br from-slate-50 to-slate-100/50 rounded-xl p-6 border border-slate-200">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                          <Clock size={20} className="text-indigo-600" />
                          Working Conditions
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {daysPerWeek && (
                            <div className="flex items-center gap-3 text-slate-700">
                              <Calendar size={18} className="text-slate-500" />
                              <span className="font-medium">{daysPerWeek}</span>
                            </div>
                          )}
                          {(startTime || endTime) && (
                            <div className="flex items-center gap-3 text-slate-700">
                              <Timer size={18} className="text-slate-500" />
                              <span className="font-medium">
                                {formattedStartTime && formattedEndTime
                                  ? `${formattedStartTime} - ${formattedEndTime}`
                                  : startTime || endTime || "Time not specified"}
                              </span>
                            </div>
                          )}
                          {(startTime && endTime) && (
                            <div className="flex items-center gap-3 text-slate-700 sm:col-span-2">
                              <Clock size={18} className="text-slate-500" />
                              <span className="font-medium">{workHoursPerDay} per day</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {benefits && benefits.length > 0 && (
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                          <AwardIcon size={20} className="text-indigo-600" />
                          Benefits & Perks
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {Array.isArray(benefits) ? (
                            benefits.map((benefit, i) => (
                              <span
                                key={i}
                                className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 font-medium hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                              >
                                <CheckCircle2 size={14} className="inline mr-1.5 text-emerald-500" />
                                {benefit}
                              </span>
                            ))
                          ) : (
                            <span className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 font-medium hover:border-indigo-300 hover:bg-indigo-50 transition-colors">
                              <CheckCircle2 size={14} className="inline mr-1.5 text-emerald-500" />
                              {benefits}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {(latitude || longitude || locationDescription) && (
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
      <MapPin size={20} className="text-indigo-600" />
      Location Details
    </h3>

    {locationDescription && (
      <p className="text-slate-600 mb-4 leading-relaxed whitespace-normal break-words">
  {locationDescription}
</p>
                        )}

                        {latitude && longitude && (
                          <div className="relative w-full h-64 lg:h-80 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                            <iframe
                              title="Job Location"
                              className="w-full h-full"
                              loading="lazy"
                              allowFullScreen
                              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCKSeVZpoW7rljXrt-T295e-WbrvG-y-PY&q=${latitude},${longitude}&zoom=15`}
                            />
                            <a
                              href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
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
                    {(experience || otherRequirements) && (
                      <div className="space-y-4">
                        {experience && (
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                              <Briefcase size={20} className="text-indigo-600" />
                              Experience Required
                            </h3>
                            <p className="text-slate-700 font-medium bg-slate-50 p-4 rounded-xl border border-slate-200">
                              {experience}
                            </p>
                          </div>
                        )}

                        {otherRequirements && (
                          <div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                              <Target size={20} className="text-indigo-600" />
                              Additional Requirements
                            </h3>
                            <p className="text-slate-600 leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-200">
                              {otherRequirements}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {!experience && !otherRequirements && (
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

          {/* SIDEBAR - Updated Employer Card */}
          <aside className="w-full xl:w-96">
            <div className="lg:sticky lg:top-10 flex flex-col sm:flex-row md:flex-col lg:flex-row xl:flex-col w-full gap-5">
              <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm w-full mb-10">
                {loadingUser ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-4" />
                    <p className="text-sm text-slate-500">Loading employer info...</p>
                  </div>
                ) : (
                  <>
                    {/* Error message */}
                    {fetchError && (
                      <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-sm text-amber-700 flex items-center gap-2">
                          <AlertCircle size={16} />
                          {fetchError}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
                      {userData?.photoURL ? (
                        <img
                          src={userData.photoURL}
                          alt="Profile"
                          className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100 shadow-sm"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : (
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                          <User size={32} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-lg truncate">
                          {getUserName()}
                        </h4>
                        <p className="text-sm text-slate-500 truncate flex items-center gap-1">
                          <BriefcaseIcon size={14} />
                          {getUserProfession()}
                        </p>
                        {userData?.location && (
                          <p className="text-sm text-slate-400 truncate flex items-center gap-1 mt-1">
                            <MapPinIcon size={12} />
                            {userData.location}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="mb-6 space-y-4">
                      {/* Email */}
                      <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-600 border border-slate-200 shrink-0">
                          <Mail size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-500 mb-1">Email</p>
                          <p className="font-medium text-slate-800 truncate">
                            {getUserEmail()}
                          </p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-600 border border-slate-200 shrink-0">
                          <Phone size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-500 mb-1">Phone</p>
                          <p className="font-medium text-slate-800 truncate">
                            {getUserPhone()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Time/Views Info */}
                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 py-3 rounded-xl mb-6">
                      <Clock size={16} />
                      <span>
                        {timestamp ? new Date(timestamp).toLocaleDateString() : postDate || "Recently"} • {views} Views
                      </span>
                    </div>

                    {/* Buttons */}
                    <div className="space-y-3">
                      <button className="w-full py-4 bg-linear-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-bold text-base hover:from-indigo-700 hover:to-indigo-600 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]">
                        <CheckCircle2 size={20} />
                        Apply Now
                      </button>

                      <div className="flex gap-3">
                        <button className="flex-1 py-3 border border-slate-200 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                          <MessageSquare size={18} />
                          Message
                        </button>
                        <button className="px-4 py-3 border border-rose-200 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100 transition-colors">
                          <AlertCircle size={20} />
                        </button>
                      </div>
                    </div>
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