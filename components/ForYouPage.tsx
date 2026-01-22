"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  Bell,
  Briefcase,
  MapPin,
  Clock,
  Sparkles,
  Bookmark,
  Zap,
  ChevronRight,
  Target,
  Users,
  DollarSign,
  Share2,
  Heart,
  Star,
  FileText,
  MessageSquare,
  Crown,
  Eye,
  CheckCircle2,
  X,
  User,
  Building2,
  Loader2,
  TrendingUp,
  Award,
  Calendar
} from "lucide-react";
import { getDatabase, ref, get, onValue, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "@/firebase/clientApp";
import { useRouter } from "next/navigation";

// --- TYPES ---
interface Job {
  id: string;
  postId: string;
  title: string;
  company: string;
  businessName: string;
  matchScore: number;
  image: string;
  logo: string | null;
  salary: string;
  currency: string;
  location: string;
  province: string;
  type: "On-site" | "Remote" | "Hybrid";
  tags: string[];
  posted: string;
  description: string;
  jobDescription: string;
  experience: string;
  views: number;
  applications: number;
  benefits: string[];
  isBookmarked?: boolean;
  isApplied?: boolean;
  timestamp: number;
  workplaceType: string;
  category: string;
  skills: string[];
  employerId: string;
  images?: string[];
  businessType?: string;
}

interface UserProfile {
  uid: string;
  name: string;
  username: string;
  role: string;
  img: string;
  photoURL: string;
  skills: string[];
  location: string;
  profileStrength: number;
  applications: number;
  interviews: number;
  savedJobs: number;
  memberSince: string;
  profession: string;
  businessName: string;
  email: string;
  rating: number;
  totalJobs: number;
  bookmarkedJobs?: string[];
  appliedJobs?: string[];
  experience?: string;
}

interface RecommendationScore {
  skillMatch: number;
  locationMatch: number;
  professionMatch: number;
  salaryMatch: number;
  experienceMatch: number;
  typeMatch: number;
  totalScore: number;
}

interface UserPreferences {
  preferredLocations: string[];
  preferredSalaryMin: number;
  preferredSalaryMax: number;
  preferredExperience: string;
  preferredJobTypes: string[];
  preferredCategories: string[];
}

// Initialize Firebase
const db = getDatabase(app);
const auth = getAuth(app);

// --- HELPER FUNCTIONS ---

// Helper function to parse salary
const parseSalary = (salaryString: string): { amount: number; currency: string } => {
  if (!salaryString) return { amount: 0, currency: 'USD' };
  
  const regex = /[\$\៛]?([\d,]+)(?:\.\d+)?/;
  const match = salaryString.match(regex);
  
  if (match) {
    const amount = parseInt(match[1].replace(/,/g, ''));
    const currency = salaryString.includes('៛') ? 'KHR' : 'USD';
    return { amount, currency };
  }
  
  return { amount: 0, currency: 'USD' };
};

// Helper function to parse experience level
const parseExperienceLevel = (experience: string): number => {
  if (!experience) return 1;
  
  const lowerExp = experience.toLowerCase();
  
  if (lowerExp.includes('entry') || lowerExp.includes('fresher') || lowerExp.includes('0-1') || lowerExp.includes('no experience')) {
    return 1;
  } else if (lowerExp.includes('junior') || lowerExp.includes('1-2') || lowerExp.includes('1-3') || lowerExp.includes('1-4')) {
    return 2;
  } else if (lowerExp.includes('mid') || lowerExp.includes('intermediate') || lowerExp.includes('3-5') || lowerExp.includes('2-5') || lowerExp.includes('4-7')) {
    return 3;
  } else if (lowerExp.includes('senior') || lowerExp.includes('5+') || lowerExp.includes('5-8') || lowerExp.includes('7-10')) {
    return 4;
  } else if (lowerExp.includes('expert') || lowerExp.includes('10+') || lowerExp.includes('lead') || lowerExp.includes('manager')) {
    return 5;
  }
  
  return 1; // Default to entry level
};

// Helper functions for preferences
const getRelatedLocations = (location: string): string[] => {
  const locationMap: Record<string, string[]> = {
    'phnom penh': ['Phnom Penh', 'PP', 'ក្រុងភ្នំពេញ'],
    'sihanoukville': ['Sihanoukville', 'Preah Sihanouk', 'ក្រុងព្រះសីហនុ'],
    'siem reap': ['Siem Reap', 'ក្រុងសៀមរាប'],
    'battambang': ['Battambang', 'ក្រុងបាត់ដំបង'],
    'kampong cham': ['Kampong Cham', 'កំពង់ចាម'],
    'kandal': ['Kandal', 'កណ្តាល'],
    'kampong speu': ['Kampong Speu', 'កំពង់ស្ពឺ'],
    'prey veng': ['Prey Veng', 'ព្រៃវែង'],
    'takeo': ['Takeo', 'តាកែវ']
  };
  
  const lowerLocation = location.toLowerCase();
  return locationMap[lowerLocation] || [];
};

const getRelatedCategories = (profession: string): string[] => {
  const categoryMap: Record<string, string[]> = {
    'developer': ['Software Engineer', 'Programmer', 'Web Developer', 'Mobile Developer', 'Frontend', 'Backend', 'Full Stack'],
    'designer': ['UI/UX Designer', 'Graphic Designer', 'Product Designer', 'Web Designer'],
    'marketing': ['Digital Marketing', 'Social Media', 'Content Creator', 'SEO', 'Marketing Specialist'],
    'sales': ['Sales Executive', 'Account Manager', 'Business Development', 'Sales Representative'],
    'accountant': ['Finance', 'Bookkeeper', 'Auditor', 'Financial Analyst'],
    'teacher': ['Educator', 'Instructor', 'Trainer', 'Lecturer'],
    'manager': ['Supervisor', 'Director', 'Team Lead', 'Project Manager'],
    'engineer': ['Civil Engineer', 'Mechanical Engineer', 'Electrical Engineer'],
    'administrator': ['Office Administrator', 'HR', 'Administrative Assistant']
  };
  
  const lowerProfession = profession.toLowerCase();
  for (const [key, categories] of Object.entries(categoryMap)) {
    if (lowerProfession.includes(key) || key.includes(lowerProfession)) {
      return categories;
    }
  }
  
  return [];
};

const getPreferredSalaryMin = (userProfile: UserProfile): number => {
  const profession = userProfile.profession?.toLowerCase() || '';
  const experience = userProfile.experience?.toLowerCase() || '';
  
  let baseSalary = 500;
  
  if (profession.includes('senior') || experience.includes('senior')) {
    baseSalary = 1500;
  } else if (profession.includes('mid') || experience.includes('mid') || experience.includes('intermediate')) {
    baseSalary = 800;
  } else if (profession.includes('junior') || experience.includes('junior')) {
    baseSalary = 400;
  }
  
  return baseSalary;
};

const getPreferredSalaryMax = (userProfile: UserProfile): number => {
  return getPreferredSalaryMin(userProfile) * 2.5;
};

// Get user preferences from profile or use defaults
const getUserPreferences = (userProfile: UserProfile | null): UserPreferences => {
  if (!userProfile) {
    return {
      preferredLocations: ['Phnom Penh'],
      preferredSalaryMin: 500,
      preferredSalaryMax: 2000,
      preferredExperience: '',
      preferredJobTypes: ['on_site', 'hybrid', 'remote'],
      preferredCategories: []
    };
  }

  const location = userProfile.location || '';
  const profession = userProfile.profession || '';
  
  return {
    preferredLocations: location ? [location, ...getRelatedLocations(location)] : ['Phnom Penh'],
    preferredSalaryMin: getPreferredSalaryMin(userProfile),
    preferredSalaryMax: getPreferredSalaryMax(userProfile),
    preferredExperience: userProfile.experience || '',
    preferredJobTypes: ['on_site', 'hybrid', 'remote'],
    preferredCategories: profession ? [profession, ...getRelatedCategories(profession)] : []
  };
};

// Enhanced match score calculation
const calculateComprehensiveMatchScore = (
  userProfile: UserProfile | null,
  userPreferences: UserPreferences,
  jobData: any,
  jobTags: string[]
): RecommendationScore => {
  let skillMatch = 0;
  let locationMatch = 0;
  let professionMatch = 0;
  let salaryMatch = 0;
  let experienceMatch = 0;
  let typeMatch = 0;

  // 1. Skill Match (40% weight)
  if (userProfile?.skills && userProfile.skills.length > 0 && jobTags.length > 0) {
    const matchedSkills = userProfile.skills.filter(skill =>
      jobTags.some(tag => {
        const skillLower = skill.toLowerCase();
        const tagLower = tag.toLowerCase();
        return tagLower.includes(skillLower) || skillLower.includes(tagLower);
      })
    );
    skillMatch = Math.round((matchedSkills.length / Math.max(jobTags.length, 1)) * 100);
  } else {
    skillMatch = 0;
  }

  // 2. Location Match (20% weight)
  if (userPreferences?.preferredLocations && userPreferences.preferredLocations.length > 0) {
    const jobLocation = (jobData.province || jobData.location || "").toLowerCase();
    const locationMatched = userPreferences.preferredLocations.some(prefLocation =>
      jobLocation.includes(prefLocation.toLowerCase()) ||
      prefLocation.toLowerCase().includes(jobLocation)
    );
    locationMatch = locationMatched ? 100 : 0;
  } else if (userProfile?.location) {
    const userLocation = userProfile.location.toLowerCase();
    const jobLocation = (jobData.province || jobData.location || "").toLowerCase();
    locationMatch = (userLocation.includes(jobLocation) || jobLocation.includes(userLocation)) ? 100 : 0;
  }

  // 3. Profession Match (15% weight)
  if (userProfile?.profession) {
    const userProfession = userProfile.profession.toLowerCase();
    const jobCategory = (jobData.category || "").toLowerCase();
    const jobBusinessType = (jobData.businessType || "").toLowerCase();
    const jobTitle = (jobData.title || "").toLowerCase();
    
    const professionKeywords = userProfession.split(/[\s,]+/).filter(word => word.length > 3);
    
    const matchesCategory = jobCategory.includes(userProfession) || userProfession.includes(jobCategory);
    const matchesBusinessType = jobBusinessType.includes(userProfession) || userProfession.includes(jobBusinessType);
    const matchesJobTitle = jobTitle.includes(userProfession) || userProfession.includes(jobTitle);
    const matchesTags = jobTags.some(tag => {
      const tagLower = tag.toLowerCase();
      return tagLower.includes(userProfession) || userProfession.includes(tagLower);
    });
    const matchesKeywords = professionKeywords.some(keyword =>
      jobTitle.includes(keyword) || jobCategory.includes(keyword) || jobBusinessType.includes(keyword)
    );
    
    professionMatch = (matchesCategory || matchesBusinessType || matchesJobTitle || matchesTags || matchesKeywords) ? 100 : 0;
  }

  // 4. Salary Match (10% weight)
  if (userPreferences?.preferredSalaryMin && userPreferences?.preferredSalaryMax) {
    const jobSalary = parseSalary(jobData.salary || jobData.salaryRange);
    if (jobSalary.amount > 0) {
      if (jobSalary.amount >= userPreferences.preferredSalaryMin && jobSalary.amount <= userPreferences.preferredSalaryMax) {
        salaryMatch = 100;
      } else if (jobSalary.amount >= userPreferences.preferredSalaryMin * 0.8) {
        salaryMatch = 70; // Close enough
      } else if (jobSalary.amount >= userPreferences.preferredSalaryMin * 0.6) {
        salaryMatch = 40; // Somewhat close
      }
    }
  }

  // 5. Experience Match (10% weight)
  if (userProfile?.experience || userPreferences?.preferredExperience) {
    const userExperience = userProfile?.experience || userPreferences?.preferredExperience || "";
    const jobExperience = jobData.experience || "";
    
    if (userExperience && jobExperience) {
      const userLevel = parseExperienceLevel(userExperience);
      const jobLevel = parseExperienceLevel(jobExperience);
      
      if (userLevel >= jobLevel) {
        experienceMatch = 100; // User meets or exceeds requirements
      } else if (userLevel >= jobLevel * 0.8) {
        experienceMatch = 80; // Close to requirements
      } else if (userLevel >= jobLevel * 0.6) {
        experienceMatch = 60; // Somewhat close
      }
    }
  }

  // 6. Job Type Match (5% weight)
  if (userPreferences?.preferredJobTypes && userPreferences.preferredJobTypes.length > 0) {
    const jobType = jobData.workplaceType?.toLowerCase() || "";
    const matchedType = userPreferences.preferredJobTypes.some(prefType =>
      jobType.includes(prefType.toLowerCase()) || prefType.toLowerCase().includes(jobType)
    );
    typeMatch = matchedType ? 100 : 0;
  }

  // Calculate weighted total score
  const weights = {
    skill: 0.4,
    location: 0.2,
    profession: 0.15,
    salary: 0.1,
    experience: 0.1,
    type: 0.05
  };

  const totalScore = Math.round(
    (skillMatch * weights.skill) +
    (locationMatch * weights.location) +
    (professionMatch * weights.profession) +
    (salaryMatch * weights.salary) +
    (experienceMatch * weights.experience) +
    (typeMatch * weights.type)
  );

  return {
    skillMatch,
    locationMatch,
    professionMatch,
    salaryMatch,
    experienceMatch,
    typeMatch,
    totalScore
  };
};

// Format timestamp to "X ago" string
const formatTimeAgo = (timestamp: number): string => {
  const now = Date.now();
  const diff = now - timestamp;
  
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;
  
  if (diff < minute) return "Just now";
  if (diff < hour) return `${Math.floor(diff / minute)}m ago`;
  if (diff < day) return `${Math.floor(diff / hour)}h ago`;
  if (diff < week) return `${Math.floor(diff / day)}d ago`;
  if (diff < month) return `${Math.floor(diff / week)}w ago`;
  if (diff < year) return `${Math.floor(diff / month)}mo ago`;
  return `${Math.floor(diff / year)}y ago`;
};

// --- COMPONENT: ForYouJobCard ---
const ForYouJobCard: React.FC<{
  job: Job;
  onBookmark: (id: string) => Promise<void>;
  onApply: (id: string) => Promise<void>;
  onSelect: (job: Job) => void;
  currentUserId?: string;
}> = ({ job, onBookmark, onApply, onSelect, currentUserId }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getMatchLevel = (score: number) => {
    if (score >= 90) return { color: "from-emerald-500 to-green-400", text: "Perfect Match" };
    if (score >= 80) return { color: "from-blue-500 to-cyan-400", text: "Excellent Match" };
    if (score >= 70) return { color: "from-indigo-500 to-purple-400", text: "Great Match" };
    return { color: "from-amber-500 to-orange-400", text: "Good Match" };
  };

  const matchLevel = getMatchLevel(job.matchScore);

  const handleApply = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUserId) return;
    
    setIsLoading(true);
    try {
      await onApply(job.id);
    } catch (error) {
      console.error("Error applying to job:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentUserId) return;
    
    try {
      await onBookmark(job.id);
    } catch (error) {
      console.error("Error bookmarking job:", error);
    }
  };

  return (
    <div
      className="bg-white rounded-[25px] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(job)}
    >
      <div className="h-48 relative overflow-hidden">
        <img
          src={job.images && job.images.length > 0 ? job.images[0] : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop"}
          className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
          alt={job.title}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent" />

        <div className={`absolute top-4 right-4 bg-linear-to-r ${matchLevel.color} text-white text-xs font-black px-4 py-2.5 rounded-full shadow-lg flex items-center gap-1.5`}>
          <Star size={12} className="fill-current" /> {job.matchScore}%
        </div>

        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">
            {job.type}
          </span>
        </div>

        <div className="absolute bottom-4 right-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center overflow-hidden border border-white/30">
            {job.logo ? (
              <img src={job.logo} alt={job.company} className="w-8 h-8 object-contain" />
            ) : (
              <span className="font-bold text-white text-lg">{job.company[0]}</span>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-slate-800 text-lg leading-tight mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
              {job.title}
            </h3>
            <div className="flex items-center gap-2">
              <p className="text-slate-500 font-bold text-sm">{job.company}</p>
              <span className="text-slate-300">•</span>
              <p className="text-slate-500 text-xs font-medium">{job.location}</p>
            </div>
          </div>
          <button
            onClick={handleBookmark}
            disabled={!currentUserId}
            className={`p-2 rounded-xl transition-all ${job.isBookmarked ? 'text-rose-600 bg-rose-50 hover:bg-rose-100' : 'text-slate-300 hover:text-indigo-600 hover:bg-slate-50'} ${!currentUserId ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Bookmark size={20} className={job.isBookmarked ? 'fill-current' : ''} />
          </button>
        </div>

        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
          {job.description || job.jobDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {job.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
              {tag}
            </span>
          ))}
          {job.tags.length > 3 && (
            <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-medium">
              +{job.tags.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 mb-5">
          <div className="flex items-center gap-1.5">
            <Eye size={12} />
            <span>{job.views} views</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={12} />
            <span>{job.applications} applicants</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={12} />
            <span>{job.posted}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
          <div className="flex items-center gap-3">
            <div className="text-left">
              <div className="text-xs text-slate-500">Salary</div>
              <div className="font-bold text-slate-900 text-sm">{job.salary}</div>
            </div>
            <div className="text-left">
              <div className="text-xs text-slate-500">Experience</div>
              <div className="font-bold text-slate-900 text-sm">{job.experience}</div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleBookmark}
              disabled={!currentUserId || isLoading}
              className={`p-2.5 rounded-xl transition-all ${job.isBookmarked ? 'text-rose-600 bg-rose-50 hover:bg-rose-100' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'} ${!currentUserId ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Bookmark size={18} className={job.isBookmarked ? 'fill-current' : ''} />
            </button>
            <button
              onClick={handleApply}
              disabled={!currentUserId || isLoading || job.isApplied}
              className={`p-2.5 rounded-xl transition-all font-bold text-sm flex items-center gap-1.5 ${job.isApplied ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200'} ${(!currentUserId || isLoading) ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : job.isApplied ? (
                <>
                  <CheckCircle2 size={16} />
                  Applied
                </>
              ) : (
                "Apply Now"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: FeaturedJobCard ---
const FeaturedJobCard: React.FC<{
  job: Job;
  onBookmark: (id: string) => Promise<void>;
  onApply: (id: string) => Promise<void>;
  onSelect: (job: Job) => void;
  currentUserId?: string;
}> = ({ job, onBookmark, onApply, onSelect, currentUserId }) => {
  const getMatchLevel = (score: number) => {
    if (score >= 90) return { color: "from-emerald-500 to-green-400", badge: "🔥 TOP PICK" };
    if (score >= 80) return { color: "from-blue-500 to-cyan-400", badge: "⭐ FEATURED" };
    return { color: "from-indigo-500 to-purple-400", badge: "✨ HIGHLIGHT" };
  };

  const matchLevel = getMatchLevel(job.matchScore);

  return (
    <div
      className="bg-linear-to-br from-slate-900 to-slate-800 rounded-[28px] overflow-hidden group cursor-pointer relative"
      onClick={() => onSelect(job)}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-500/30 to-purple-500/30" />
      </div>

      <div className="relative p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className={`bg-linear-to-r ${matchLevel.color} text-white text-xs font-black px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 mb-3`}>
              <Sparkles size={12} /> {matchLevel.badge}
            </div>
            <h3 className="text-2xl font-black text-white mb-2 leading-tight">{job.title}</h3>
            <div className="flex items-center gap-2 text-white/80">
              <span className="font-bold">{job.company}</span>
              <span className="w-1 h-1 bg-white/40 rounded-full" />
              <span>{job.location}</span>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onBookmark(job.id); }}
            className={`p-2.5 rounded-xl ${job.isBookmarked ? 'bg-white/20 text-white' : 'bg-white/10 text-white/60 hover:text-white hover:bg-white/20'}`}
          >
            <Bookmark size={20} className={job.isBookmarked ? 'fill-current' : ''} />
          </button>
        </div>

        <p className="text-white/60 text-sm mb-6 line-clamp-2">
          {job.description || job.jobDescription}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {job.tags.slice(0, 4).map(tag => (
            <span key={tag} className="px-3 py-1.5 bg-white/10 text-white/90 rounded-lg text-xs font-medium border border-white/10">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-left">
              <div className="text-xs text-white/60">Salary</div>
              <div className="font-bold text-white text-lg">{job.salary}</div>
            </div>
            <div className="text-left">
              <div className="text-xs text-white/60">Match Score</div>
              <div className="font-black text-white text-2xl">{job.matchScore}%</div>
            </div>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onApply(job.id); }}
            disabled={!currentUserId || job.isApplied}
            className={`px-6 py-3 ${job.isApplied ? 'bg-emerald-600 text-white' : 'bg-[#d3f500] text-slate-900'} font-bold rounded-xl hover:brightness-110 transition-all shadow-lg shadow-[#d3f500]/20 disabled:opacity-70`}
          >
            {job.isApplied ? 'Already Applied' : 'Quick Apply'}
          </button>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: MatchBreakdown ---
const MatchBreakdown: React.FC<{ 
  job: Job; 
  userProfile: UserProfile | null;
  userPreferences: UserPreferences;
}> = ({ job, userProfile, userPreferences }) => {
  if (!userProfile) return null;
  
  const jobTags = [
    ...(job.skills || []),
    ...(job.category ? [job.category] : []),
    ...(job.businessType ? [job.businessType] : [])
  ];
  
  const matchScore = calculateComprehensiveMatchScore(userProfile, userPreferences, job, jobTags);
  
  return (
    <div className="bg-slate-50 p-4 rounded-2xl mb-6">
      <h4 className="text-lg font-bold text-slate-900 mb-3">Match Breakdown</h4>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600">Skills Match</span>
            <span className="font-bold text-slate-900">{matchScore.skillMatch}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full" 
              style={{ width: `${Math.min(matchScore.skillMatch, 100)}%` }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600">Location Match</span>
            <span className="font-bold text-slate-900">{matchScore.locationMatch}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-emerald-500 h-2 rounded-full" 
              style={{ width: `${Math.min(matchScore.locationMatch, 100)}%` }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600">Profession Match</span>
            <span className="font-bold text-slate-900">{matchScore.professionMatch}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-purple-500 h-2 rounded-full" 
              style={{ width: `${Math.min(matchScore.professionMatch, 100)}%` }}
            />
          </div>
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-600">Salary Match</span>
            <span className="font-bold text-slate-900">{matchScore.salaryMatch}%</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div 
              className="bg-amber-500 h-2 rounded-full" 
              style={{ width: `${Math.min(matchScore.salaryMatch, 100)}%` }}
            />
          </div>
        </div>
        
        <div className="pt-2 border-t border-slate-200">
          <div className="flex justify-between font-bold">
            <span className="text-slate-700">Total Match Score</span>
            <span className="text-lg text-indigo-600">{matchScore.totalScore}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: JobDetailModal ---
const JobDetailModal: React.FC<{
  job: Job;
  onClose: () => void;
  onBookmark: (id: string) => Promise<void>;
  onApply: (id: string) => Promise<void>;
  currentUser: UserProfile | null;
  userPreferences: UserPreferences;
}> = ({ job, onClose, onBookmark, onApply, currentUser, userPreferences }) => {
  const [isApplying, setIsApplying] = useState(false);

  const getMatchLevel = (score: number) => {
    if (score >= 90) return { color: "bg-emerald-500", text: "Perfect Match" };
    if (score >= 80) return { color: "bg-blue-500", text: "Excellent Match" };
    if (score >= 70) return { color: "bg-indigo-500", text: "Great Match" };
    return { color: "bg-amber-500", text: "Good Match" };
  };

  const matchLevel = getMatchLevel(job.matchScore);

  const handleApply = async () => {
    if (!currentUser) return;
    setIsApplying(true);
    try {
      await onApply(job.id);
    } catch (error) {
      console.error("Error applying:", error);
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-100 z-10 p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className={`${matchLevel.color} text-white text-sm font-bold px-3 py-1.5 rounded-full`}>
              {job.matchScore}% Match
            </div>
            <h2 className="text-2xl font-black text-slate-900">{job.title}</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center">
              {job.logo ? (
                <img src={job.logo} alt={job.company} className="w-10 h-10 object-contain" />
              ) : (
                <span className="text-2xl font-black text-slate-300">{job.company[0]}</span>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-black text-slate-900 mb-2">{job.company}</h3>
              <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Briefcase size={14} />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <DollarSign size={14} />
                  <span className="font-bold">{job.salary}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} />
                  <span>{job.posted}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Match Breakdown */}
          <MatchBreakdown job={job} userProfile={currentUser} userPreferences={userPreferences} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-slate-50 p-4 rounded-2xl">
              <div className="text-sm text-slate-500 mb-1">Experience Required</div>
              <div className="font-bold text-slate-900">{job.experience}</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl">
              <div className="text-sm text-slate-500 mb-1">Applications</div>
              <div className="font-bold text-slate-900">{job.applications} applicants</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl">
              <div className="text-sm text-slate-500 mb-1">Views</div>
              <div className="font-bold text-slate-900">{job.views} views</div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-bold text-slate-900 mb-3">Job Description</h4>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">{job.description || job.jobDescription}</p>
          </div>

          {job.tags.length > 0 && (
            <div className="mb-8">
              <h4 className="text-lg font-bold text-slate-900 mb-3">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {job.tags.map(tag => (
                  <span key={tag} className="px-3 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {job.benefits && job.benefits.length > 0 && (
            <div className="mb-8">
              <h4 className="text-lg font-bold text-slate-900 mb-3">Benefits & Perks</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2 text-slate-600">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="sticky bottom-0 bg-white border-t border-slate-100 pt-6 mt-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-3">
                <button
                  onClick={() => onBookmark(job.id)}
                  disabled={!currentUser}
                  className={`p-3 rounded-xl ${job.isBookmarked ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'} ${!currentUser ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Bookmark size={20} className={job.isBookmarked ? 'fill-current' : ''} />
                </button>
                <button className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200">
                  <Share2 size={20} />
                </button>
              </div>
              <button
                onClick={handleApply}
                disabled={!currentUser || job.isApplied || isApplying}
                className={`px-8 py-3 rounded-xl font-bold ${job.isApplied ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'} ${(!currentUser || isApplying) ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isApplying ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin" />
                    Applying...
                  </span>
                ) : job.isApplied ? (
                  'Applied Successfully'
                ) : (
                  'Apply Now'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export default function ForYouPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Calculate match scores between user skills and job skills
  const calculateMatchScore = (userSkills: string[], jobTags: string[]): number => {
    if (!userSkills || userSkills.length === 0 || !jobTags || jobTags.length === 0) return 0;
    
    const matchedSkills = userSkills.filter(skill => 
      jobTags.some(tag => tag.toLowerCase().includes(skill.toLowerCase()) || 
                          skill.toLowerCase().includes(tag.toLowerCase()))
    );
    
    return Math.round((matchedSkills.length / jobTags.length) * 100);
  };

  // Fetch jobs and user data from Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Fetch user profile
        const userRef = ref(db, `users/${user.uid}`);
        const userSnapshot = await get(userRef);
        
        if (userSnapshot.exists()) {
          const userData = userSnapshot.val();
          const userProfile: UserProfile = {
            uid: user.uid,
            name: userData.username || user.displayName || "User",
            username: userData.username || "",
            role: userData.profession || "Job Seeker",
            img: userData.photoURL || userData.profileImage || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face",
            photoURL: userData.photoURL || userData.profileImage || "",
            skills: userData.skills || [],
            location: userData.location || "Phnom Penh",
            profileStrength: userData.profileStrength || 0,
            applications: userData.applications || 0,
            interviews: userData.interviews || 0,
            savedJobs: userData.savedJobs || 0,
            memberSince: userData.createdAt ? new Date(userData.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Recently",
            profession: userData.profession || "",
            businessName: userData.businessName || "",
            email: userData.email || "",
            rating: userData.rating || 0,
            totalJobs: userData.totalJobs || 0,
            bookmarkedJobs: userData.bookmarkedJobs || [],
            appliedJobs: userData.appliedJobs || [],
            experience: userData.experience || ""
          };
          setCurrentUser(userProfile);
          
          // Get user preferences
          const preferences = getUserPreferences(userProfile);
          setUserPreferences(preferences);

          // Fetch jobs from Firebase
          const jobsRef = ref(db, 'posts');
          onValue(jobsRef, (snapshot) => {
            if (snapshot.exists()) {
              const jobsData = snapshot.val();
              const jobsArray: Job[] = [];
              
              for (const [key, value] of Object.entries(jobsData)) {
                const jobData = value as any;
                const jobTags = [
                  ...(jobData.skills || []),
                  ...(jobData.category ? [jobData.category] : []),
                  ...(jobData.businessType ? [jobData.businessType] : [])
                ];
                
                // Calculate comprehensive match score
                const matchScore = calculateComprehensiveMatchScore(
                  userProfile,
                  preferences,
                  jobData,
                  jobTags
                );
                
                const job: Job = {
                  id: key,
                  postId: jobData.postId || key,
                  title: jobData.title || "Job Title",
                  company: jobData.businessName || jobData.company || "Company",
                  businessName: jobData.businessName || "",
                  matchScore: matchScore.totalScore,
                  image: jobData.images && jobData.images.length > 0 ? jobData.images[0] : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop",
                  logo: null,
                  salary: `${jobData.currency === 'KHR' ? '៛' : '$'}${jobData.salary || 'Negotiable'}`,
                  currency: jobData.currency || "USD",
                  location: jobData.province || jobData.location || "Location",
                  province: jobData.province || "",
                  type: jobData.workplaceType === 'on_site' ? 'On-site' : 
                        jobData.workplaceType === 'remote' ? 'Remote' : 'Hybrid',
                  tags: jobTags,
                  posted: jobData.timestamp ? formatTimeAgo(jobData.timestamp) : "Recently",
                  description: jobData.jobDescription?.substring(0, 150) + "..." || "No description available",
                  jobDescription: jobData.jobDescription || "",
                  experience: jobData.experience || "Not specified",
                  views: jobData.views || 0,
                  applications: jobData.applications || 0,
                  benefits: jobData.benefits || [],
                  isBookmarked: userProfile.bookmarkedJobs?.includes(key) || false,
                  isApplied: userProfile.appliedJobs?.includes(key) || false,
                  timestamp: jobData.timestamp || Date.now(),
                  workplaceType: jobData.workplaceType || "on_site",
                  category: jobData.category || "",
                  skills: jobData.skills || [],
                  employerId: jobData.employerId || "",
                  images: jobData.images || [],
                  businessType: jobData.businessType || ""
                };
                
                jobsArray.push(job);
              }
              
              // Sort by match score (highest first)
              jobsArray.sort((a, b) => b.matchScore - a.matchScore);
              setJobs(jobsArray);
            }
          });
        }
      } else {
        setCurrentUser(null);
        setUserPreferences(getUserPreferences(null));
        
        // If no user, still fetch jobs but without personalization
        const jobsRef = ref(db, 'posts');
        onValue(jobsRef, (snapshot) => {
          if (snapshot.exists()) {
            const jobsData = snapshot.val();
            const jobsArray: Job[] = [];
            
            for (const [key, value] of Object.entries(jobsData)) {
              const jobData = value as any;
              const jobTags = [
                ...(jobData.skills || []),
                ...(jobData.category ? [jobData.category] : []),
                ...(jobData.businessType ? [jobData.businessType] : [])
              ];
              
              const job: Job = {
                id: key,
                postId: jobData.postId || key,
                title: jobData.title || "Job Title",
                company: jobData.businessName || jobData.company || "Company",
                businessName: jobData.businessName || "",
                matchScore: Math.floor(Math.random() * 30) + 70, // Random score for non-logged in users
                image: jobData.images && jobData.images.length > 0 ? jobData.images[0] : "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop",
                logo: null,
                salary: `${jobData.currency === 'KHR' ? '៛' : '$'}${jobData.salary || 'Negotiable'}`,
                currency: jobData.currency || "USD",
                location: jobData.province || jobData.location || "Location",
                province: jobData.province || "",
                type: jobData.workplaceType === 'on_site' ? 'On-site' : 
                      jobData.workplaceType === 'remote' ? 'Remote' : 'Hybrid',
                tags: jobTags,
                posted: jobData.timestamp ? formatTimeAgo(jobData.timestamp) : "Recently",
                description: jobData.jobDescription?.substring(0, 150) + "..." || "No description available",
                jobDescription: jobData.jobDescription || "",
                experience: jobData.experience || "Not specified",
                views: jobData.views || 0,
                applications: jobData.applications || 0,
                benefits: jobData.benefits || [],
                isBookmarked: false,
                isApplied: false,
                timestamp: jobData.timestamp || Date.now(),
                workplaceType: jobData.workplaceType || "on_site",
                category: jobData.category || "",
                skills: jobData.skills || [],
                employerId: jobData.employerId || "",
                images: jobData.images || []
              };
              
              jobsArray.push(job);
            }
            
            setJobs(jobsArray);
          }
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Bookmark a job
  const toggleBookmark = async (jobId: string) => {
    if (!currentUser) {
      router.push('/auth/login');
      return;
    }

    const userRef = ref(db, `users/${currentUser.uid}`);
    const job = jobs.find(j => j.id === jobId);
    
    if (!job) return;

    const isBookmarked = job.isBookmarked;
    const bookmarkedJobs = currentUser.bookmarkedJobs || [];
    
    let updatedBookmarks: string[];
    if (isBookmarked) {
      updatedBookmarks = bookmarkedJobs.filter(id => id !== jobId);
    } else {
      updatedBookmarks = [...bookmarkedJobs, jobId];
    }

    try {
      // Update in Firebase
      await update(userRef, {
        bookmarkedJobs: updatedBookmarks
      });

      // Update local state
      setJobs(jobs.map(j => 
        j.id === jobId ? { ...j, isBookmarked: !isBookmarked } : j
      ));
      
      if (selectedJob?.id === jobId) {
        setSelectedJob({ ...selectedJob, isBookmarked: !isBookmarked });
      }

      // Update current user
      setCurrentUser({
        ...currentUser,
        bookmarkedJobs: updatedBookmarks,
        savedJobs: isBookmarked ? currentUser.savedJobs - 1 : currentUser.savedJobs + 1
      });
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  // Apply to a job
  const handleApply = async (jobId: string) => {
    if (!currentUser) {
      router.push('/auth/login');
      return;
    }

    const userRef = ref(db, `users/${currentUser.uid}`);
    const jobRef = ref(db, `posts/${jobId}`);
    const job = jobs.find(j => j.id === jobId);
    
    if (!job) return;

    const appliedJobs = currentUser.appliedJobs || [];
    const updatedApplications = [...appliedJobs, jobId];

    try {
      // Update job applications count
      await update(jobRef, {
        applications: (job.applications || 0) + 1
      });

      // Update user's applied jobs
      await update(userRef, {
        appliedJobs: updatedApplications,
        applications: (currentUser.applications || 0) + 1
      });

      // Update local state
      setJobs(jobs.map(j => 
        j.id === jobId ? { 
          ...j, 
          isApplied: true,
          applications: (j.applications || 0) + 1
        } : j
      ));
      
      if (selectedJob?.id === jobId) {
        setSelectedJob({ 
          ...selectedJob, 
          isApplied: true,
          applications: (selectedJob.applications || 0) + 1
        });
      }

      // Update current user
      setCurrentUser({
        ...currentUser,
        appliedJobs: updatedApplications,
        applications: (currentUser.applications || 0) + 1
      });
    } catch (error) {
      console.error("Error applying to job:", error);
    }
  };

  const categories = [
    "All", 
    "Perfect Match (95%+)", 
    "Excellent (85-94%)", 
    "Good (75-84%)", 
    "Location Match", 
    "Profession Match", 
    "High Salary", 
    "Remote Work",
    "Phnom Penh",
    "Sihanoukville",
    "Siem Reap"
  ];

  const filteredJobs = useMemo(() => {
    let filtered = jobs;

    // Apply category filter
    switch (selectedCategory) {
      case "Perfect Match (95%+)":
        filtered = filtered.filter(j => j.matchScore >= 95);
        break;
      case "Excellent (85-94%)":
        filtered = filtered.filter(j => j.matchScore >= 85 && j.matchScore < 95);
        break;
      case "Good (75-84%)":
        filtered = filtered.filter(j => j.matchScore >= 75 && j.matchScore < 85);
        break;
      case "Location Match":
        if (currentUser?.location) {
          filtered = filtered.filter(j => 
            j.location.toLowerCase().includes(currentUser.location.toLowerCase()) ||
            currentUser.location.toLowerCase().includes(j.location.toLowerCase())
          );
        }
        break;
      case "Profession Match":
        if (currentUser?.profession) {
          filtered = filtered.filter(j => 
            j.tags.some(tag => 
              tag.toLowerCase().includes(currentUser.profession.toLowerCase()) ||
              currentUser.profession.toLowerCase().includes(tag.toLowerCase())
            )
          );
        }
        break;
      case "High Salary":
        filtered = filtered.filter(j => {
          const salaryMatch = j.salary.match(/\$(\d+)/);
          if (salaryMatch) {
            const amount = parseInt(salaryMatch[1]);
            return amount >= 1500; // High salary threshold
          }
          return false;
        });
        break;
      case "Remote Work":
        filtered = filtered.filter(j => j.type === "Remote");
        break;
      case "Phnom Penh":
        filtered = filtered.filter(j => j.location.includes("Phnom Penh"));
        break;
      case "Sihanoukville":
        filtered = filtered.filter(j => j.location.includes("Sihanoukville") || j.location.includes("Preah Sihanouk"));
        break;
      case "Siem Reap":
        filtered = filtered.filter(j => j.location.includes("Siem Reap"));
        break;
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.tags.some(tag => tag.toLowerCase().includes(query)) ||
        job.location.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [jobs, selectedCategory, searchQuery, currentUser]);

  const excellentMatches = jobs.filter(j => j.matchScore >= 80).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/5 to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading your personalized job recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50/5 to-slate-50">
      {/* Header */}
      <header className="bg-white px-4 md:px-8 py-6 rounded-b-4xl shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl p-1 bg-linear-to-br from-indigo-500 to-purple-600 shadow-lg">
                  <img
                    src={currentUser?.img || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face"}
                    alt="Profile"
                    className="w-full h-full rounded-xl object-cover border-2 border-white"
                  />
                </div>
                {currentUser && (
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#d3f500] rounded-full border-2 border-white flex items-center justify-center">
                    <Crown size={10} className="text-indigo-900" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-900">
                  Welcome back, <span className="text-indigo-600">{currentUser?.name || "Guest"}</span>
                </h1>
                <p className="text-slate-600 mt-1">
                  {currentUser ? "Your personalized job recommendations are ready" : "Login to get personalized job recommendations"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors">
                <Bell size={20} className="text-slate-600" />
              </button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-linear-to-br from-indigo-500 to-purple-600 p-4 rounded-2xl text-white shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm opacity-90">Profile Strength</p>
                  <p className="text-2xl font-black mt-1">{currentUser?.profileStrength || 0}%</p>
                </div>
                <Target size={20} />
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500">Excellent Matches</p>
                  <p className="text-2xl font-black text-slate-800 mt-1">{excellentMatches}</p>
                </div>
                <Star size={20} className="text-amber-500" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500">Applications</p>
                  <p className="text-2xl font-black text-slate-800 mt-1">{currentUser?.applications || 0}</p>
                </div>
                <FileText size={20} className="text-indigo-600" />
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-slate-500">Saved Jobs</p>
                  <p className="text-2xl font-black text-slate-800 mt-1">{currentUser?.savedJobs || 0}</p>
                </div>
                <Bookmark size={20} className="text-rose-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-linear-to-r from-indigo-600 to-purple-600 rounded-lg text-white">
                <Sparkles size={24} />
              </div>
              <h1 className="text-3xl font-black text-slate-800">For You</h1>
            </div>
            <p className="text-slate-500">
              {currentUser 
                ? "Personalized job recommendations based on your skills and preferences."
                : "Browse available jobs. Login for personalized recommendations."}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode("compact")}
                className={`px-3 py-2 rounded-lg text-sm font-bold ${viewMode === "compact" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                Compact
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 rounded-lg text-sm font-bold ${viewMode === "grid" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>

{/* Category Chips with Clear Filter */}
<div className="flex items-center gap-4 mb-8">
  <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar flex-1">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => setSelectedCategory(cat)}
        className={`
          px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap
          ${selectedCategory === cat
            ? "bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200/50 hover:shadow-indigo-200/70 border-0"
            : "bg-white/80 backdrop-blur-sm text-slate-600 border border-slate-200 hover:bg-linear-to-r hover:from-indigo-50 hover:to-purple-50 hover:border-indigo-200 hover:text-indigo-700"
          }
        `}
      >
        {cat}
      </button>
    ))}
  </div>
  
  {selectedCategory !== "All" && (
    <button
      onClick={() => setSelectedCategory("All")}
      className="px-4 py-2.5 text-sm font-bold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-colors whitespace-nowrap"
    >
      Clear Filter
    </button>
  )}
</div>
        {/* Featured Section */}
        {filteredJobs.filter(j => j.matchScore >= 85).length > 0 && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <Zap size={20} className="text-indigo-600" />
                Top Recommendations
              </h2>
              <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors flex items-center gap-1">
                See all <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredJobs
                .filter(j => j.matchScore >= 85)
                .slice(0, 2)
                .map(job => (
                  <FeaturedJobCard
                    key={job.id}
                    job={job}
                    onBookmark={toggleBookmark}
                    onApply={handleApply}
                    onSelect={setSelectedJob}
                    currentUserId={currentUser?.uid}
                  />
                ))}
            </div>
          </div>
        )}

        {/* Main Job Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-black text-slate-800">All Recommendations</h2>
            <div className="text-sm text-slate-500">
              <span className="font-bold text-slate-900">{filteredJobs.length}</span> jobs found
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map(job => (
                <ForYouJobCard
                  key={job.id}
                  job={job}
                  onBookmark={toggleBookmark}
                  onApply={handleApply}
                  onSelect={setSelectedJob}
                  currentUserId={currentUser?.uid}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredJobs.map(job => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer p-4"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className={`${job.matchScore >= 80 ? 'bg-emerald-500' : job.matchScore >= 70 ? 'bg-blue-500' : 'bg-amber-500'} text-white text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block`}>
                        {job.matchScore}%
                      </div>
                      <h3 className="font-bold text-slate-800 text-sm mb-1 line-clamp-1">{job.title}</h3>
                      <p className="text-slate-500 text-xs">{job.company}</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleBookmark(job.id); }}
                      disabled={!currentUser}
                      className={`p-1 ${job.isBookmarked ? 'text-rose-600' : 'text-slate-300'} ${!currentUser ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Bookmark size={16} className={job.isBookmarked ? 'fill-current' : ''} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <MapPin size={12} />
                    <span>{job.location}</span>
                  </div>
                  <div className="text-xs text-slate-400 mb-3">{job.posted}</div>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleApply(job.id); }}
                    disabled={!currentUser || job.isApplied}
                    className={`w-full py-2 text-xs font-bold rounded-lg ${job.isApplied ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'} ${!currentUser ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {job.isApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* No Results State */}
        {filteredJobs.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[30px] border-2 border-dashed border-slate-100">
            <div className="w-20 h-20 bg-linear-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-indigo-300 mb-4">
              <Target size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">No matches found</h3>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your filters or update your profile for better matches.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* Job Detail Modal */}
      {selectedJob && userPreferences && (
        <JobDetailModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onBookmark={toggleBookmark}
          onApply={handleApply}
          currentUser={currentUser}
          userPreferences={userPreferences}
        />
      )}
    </div>
  );
}