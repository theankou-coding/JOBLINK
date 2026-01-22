"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapPin, Share2, Bookmark, Briefcase, Clock, DollarSign, User, Check, Copy, Loader2 } from "lucide-react";
import { rtdb, auth } from "@/firebase/clientApp";
import { ref, set, remove, get, onValue } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";

export interface JobCardProps {
  id: string;
  postName: string;
  location?: string;
  postDate?: string;
  jobDescription?: string;
  profileName: string;
  experience?: string;
  timeCommitment?: string;
  salaryRange?: string;
  profileImage?: string | null;
  cardBackgroundImage: string;
  isSelected: boolean;
  jobUrl?: string;
  onClick: (id: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  id, postName, location, postDate, jobDescription, profileName, experience,
  timeCommitment, salaryRange, profileImage, cardBackgroundImage,
  isSelected, jobUrl, onClick
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [savedJobId, setSavedJobId] = useState<string | null>(null);
  const [showSavedText, setShowSavedText] = useState(false);

  const saveButtonRef = useRef<HTMLButtonElement>(null);

  // Check auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Check if job is saved
  useEffect(() => {
    if (!currentUser || !id) return;

    const savedRef = ref(rtdb, `savedJobs/${currentUser.uid}`);
    const unsubscribe = onValue(savedRef, (snapshot) => {
      if (snapshot.exists()) {
        const savedJobs = snapshot.val();
        // Find if this job is saved
        const savedEntry = Object.entries(savedJobs).find(([key, value]: [string, any]) =>
          value.jobId === id
        );

        if (savedEntry) {
          setIsSaved(true);
          setSavedJobId(savedEntry[0]);
          setShowSavedText(true); // Always show text when saved
        } else {
          setIsSaved(false);
          setSavedJobId(null);
          setShowSavedText(false);
        }
      } else {
        setIsSaved(false);
        setSavedJobId(null);
        setShowSavedText(false);
      }
    });

    return () => unsubscribe();
  }, [currentUser, id]);

  const handleSaveClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!currentUser) {
      alert("Please login to save jobs");
      return;
    }

    if (isSaving) return;

    setIsSaving(true);

    try {
      if (isSaved && savedJobId) {
        // Remove from saved
        const savedRef = ref(rtdb, `savedJobs/${currentUser.uid}/${savedJobId}`);
        await remove(savedRef);
        setIsSaved(false);
        setSavedJobId(null);
        setShowSavedText(false);
      } else {
        // Show saved text immediately for feedback
        setShowSavedText(true);

        // Add to saved
        const savedRef = ref(rtdb, `savedJobs/${currentUser.uid}/${id}`);

        const savedData = {
          jobId: id,
          title: postName,
          company: profileName,
          location: location || "Unknown",
          salary: salaryRange || "Negotiable",
          savedAt: Date.now(),
          jobImage: cardBackgroundImage,
          jobData: {
            title: postName,
            businessName: profileName,
            location: location,
            salaryRange: salaryRange,
            experience: experience,
            workplaceType: timeCommitment,
            jobDescription: jobDescription,
            profileImage: profileImage,
            postDate: postDate
          }
        };

        await set(savedRef, savedData);
        setIsSaved(true);
        setSavedJobId(id);
      }
    } catch (error) {
      console.error("Error saving job:", error);
      alert("Failed to save job. Please try again.");
      setShowSavedText(false);
    } finally {
      setIsSaving(false);
    }
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShareOptions(!showShareOptions);
  };

  const shareViaWebShare = async () => {
    if (navigator.share) {
      try {
        setIsSharing(true);
        await navigator.share({
          title: postName,
          text: `Check out this job: ${postName} at ${profileName}`,
          url: jobUrl || window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      } finally {
        setIsSharing(false);
        setShowShareOptions(false);
      }
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(jobUrl || window.location.href);
      setCopySuccess(true);

      // Reset after 2 seconds
      setTimeout(() => {
        setCopySuccess(false);
        setShowShareOptions(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const shareViaWhatsApp = () => {
    const text = `Check out this job: ${postName} at ${profileName}`;
    const url = encodeURIComponent(jobUrl || window.location.href);
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
    setShowShareOptions(false);
  };

  const shareViaFacebook = () => {
    const url = encodeURIComponent(jobUrl || window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
    setShowShareOptions(false);
  };

  const shareViaLinkedIn = () => {
    const url = encodeURIComponent(jobUrl || window.location.href);
    const title = encodeURIComponent(postName);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank');
    setShowShareOptions(false);
  };

  return (
    <div className="relative">
      {/* Share Options Dropdown */}
      {showShareOptions && (
        <div className="absolute top-12 right-12 z-50 bg-white rounded-xl shadow-2xl border border-slate-200 min-w-50 animate-in fade-in duration-200">
          <div className="p-2">
            <div className="text-xs font-bold text-slate-700 px-3 py-2 border-b border-slate-100">Share via</div>
            <div className="space-y-1">
              <button
                onClick={shareViaWebShare}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg transition-colors text-sm"
              >
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <Share2 size={16} className="text-blue-600" />
                </div>
                <span className="font-medium">Share...</span>
              </button>

              <button
                onClick={copyToClipboard}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg transition-colors text-sm"
              >
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                  {copySuccess ? (
                    <Check size={16} className="text-emerald-600" />
                  ) : (
                    <Copy size={16} className="text-slate-600" />
                  )}
                </div>
                <span className="font-medium">
                  {copySuccess ? "Copied!" : "Copy link"}
                </span>
              </button>

              <button
                onClick={shareViaWhatsApp}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg transition-colors text-sm"
              >
                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                  <span className="text-emerald-600 font-bold text-sm">WA</span>
                </div>
                <span className="font-medium">WhatsApp</span>
              </button>

              <button
                onClick={shareViaFacebook}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg transition-colors text-sm"
              >
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">f</span>
                </div>
                <span className="font-medium">Facebook</span>
              </button>

              <button
                onClick={shareViaLinkedIn}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-50 rounded-lg transition-colors text-sm"
              >
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-sm">in</span>
                </div>
                <span className="font-medium">LinkedIn</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Job Card */}
      <div
        onClick={() => onClick(id)}
        className={`  
          flex flex-col gap-2.5 p-2.5 rounded-[20px] cursor-pointer
          transition-all duration-300 w-full relative
          ${isSelected
            ? "bg-[#95e8ff] shadow-[0_0_0_2px_#007bff,0_12px_30px_rgba(0,0,0,0.15)]"
            : "bg-white shadow-sm hover:shadow-md"
          }
        `}
      >
        {/* Top Visual Section */}
        <div
          className="w-full flex flex-col gap-3 px-5 md:px-7 py-7 sm:py-7 rounded-[20px] relative overflow-hidden h-relative"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${cardBackgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex justify-between items-center z-10">
            <div className="flex items-center gap-1">
              <MapPin size={14} className="text-white shrink-0" />
              <span className="text-[10px] text-white truncate">{location}</span>
            </div>
            <span className="text-[10px] text-white">{postDate}</span>
          </div>
          <span className="font-semibold text-lg text-white leading-tight z-10 line-clamp-2">{postName}</span>
          <div className="h-10 z-10">
            <span className="text-[10px] text-white line-clamp-3 leading-relaxed">{jobDescription}</span>
          </div>
          <div className="flex justify-between items-center z-10 mt-2">
            <div className="flex items-center gap-1"><Briefcase size={14} className="text-white" /><span className="text-[10px] text-white">{experience}</span></div>
            <div className="flex items-center gap-1"><Clock size={14} className="text-white" /><span className="text-[10px] text-white">{timeCommitment}</span></div>
          </div>
          <div className="flex items-center gap-1 z-10"><DollarSign size={14} className="text-white" /><span className="text-[10px] text-white">{salaryRange}</span></div>
        </div>

        {/* BOTTOM SECTION: USER PROFILE & USERNAME */}
        <div className="flex justify-between items-center p-2 sm:p-2.5 min-h-12.5">
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            {/* User Profile Image */}
            <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-gray-100 shrink-0">
              {profileImage ? (
                <img src={profileImage} className="w-full h-full object-cover" alt="User" />
              ) : (
                <User size={18} className="text-slate-400" />
              )}
            </div>
            {/* Username */}
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-[15px] text-slate-700 truncate">{profileName}</span>
              <span className="text-[9px] text-slate-600 font-medium uppercase tracking-tighter">Employer</span>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Share Button */}
            <button
              className="p-2 hover:bg-slate-50 rounded-full transition-colors relative group"
              onClick={handleShareClick}
              disabled={isSharing}
            >
              {isSharing ? (
                <Loader2 size={18} className="text-slate-600 animate-spin" />
              ) : (
                <>
                  <Share2 size={18} className="text-slate-600 group-hover:text-indigo-600" />
                  {/* Tooltip */}
                  <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    Share
                  </div>
                </>
              )}
            </button>

            {/* Save Button - Animated to stretch left */}
            <div className="relative group">
              <button
                ref={saveButtonRef}
                className={`
                  p-2 rounded-full transition-all duration-300 relative
                  flex items-center justify-center
                  ${isSaved
                    ? 'bg-slate-100'
                    : 'hover:bg-slate-50'
                  }
                  ${isSaving ? 'bg-slate-100' : ''}
                  overflow-hidden
                `}
                onClick={handleSaveClick}
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 size={18} className="text-slate-600 animate-spin" />
                ) : (
                  <>
                    <Bookmark
                      size={18}
                      className={`
                        transition-all duration-300 shrink-0
                        ${isSaved
                          ? 'fill-[#2100f5] text-[#11007e]'
                          : 'text-slate-600 group-hover:text-[#2100f5]'
                        }
                      `}
                    />

                    {/* Saved Text - Animated to appear from right */}
                    <span
                      className={`
                        text-xs font-bold whitespace-nowrap transition-all duration-300
                        ${showSavedText
                          ? 'max-w-10 opacity-100'
                          : 'max-w-0 opacity-0'
                        }
                        overflow-hidden
                        ${isSaved ? 'text-[#2100f5]' : 'text-slate-600'}
                      `}
                    >
                      Saved
                    </span>
                  </>
                )}
              </button>

              {/* Tooltip */}
              <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                {isSaved ? "Remove from saved" : "Save job"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay when sharing options are open */}
      {showShareOptions && (
        <div
          className="fixed inset-0 z-40"
          onClick={(e) => {
            e.stopPropagation();
            setShowShareOptions(false);
          }}
        />
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes stretchLeft {
          0% {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
          100% {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
        }
        
        @keyframes slideInText {
          0% {
            max-width: 0;
            opacity: 0;
            margin-left: -8px;
          }
          100% {
            max-width: 40px;
            opacity: 1;
            margin-left: 0;
          }
        }
        
        .animate-in {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-stretch-left {
          animation: stretchLeft 0.3s ease-out forwards;
        }
        
        .animate-slide-in-text {
          animation: slideInText 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default JobCard;