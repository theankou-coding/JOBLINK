"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { auth, rtdb } from "@/firebase/clientApp";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  ref,
  onValue,
  query,
  orderByChild,
  equalTo,
  get,
  DataSnapshot,
  remove,
  set,
} from "firebase/database";
import {
  Bell,
  Users,
  Phone,
  Edit,
  LogOut,
  Briefcase,
  Loader2,
  Menu,
  X,
  Search,
  MapPin,
  PlusCircle,
  Calendar,
  DollarSign,
  Eye,
  Clock,
  TrendingUp,
  Building,
  FileText,
  MessageSquare,
  Settings,
  Heart,
  Share2,
  ExternalLink,
  ChevronRight,
  Target,
  Award,
  Star,
  UserCheck,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Trash2,
  Pencil,
  Download,
  Filter,
  ChevronDown,
  PieChart,
  BarChart3,
  BookOpen,
  Save,
  PlayCircle,
  Database,
  Wifi,
  WifiOff,
  ArrowLeft,
} from "lucide-react";
import { DraftManager } from "@/lib/draftManager";
import JobDetail from "@/components/JobDetail";

// Types
interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  photoURL: string;
  username: string;
  profession: string;
  bio: string;
  location: string;
  memberSince: string;
  totalPosts: number;
  profileViews: number;
  rating: number;
}

interface JobPost {
  id: string;
  title: string;
  description: string;
  location: string;
  province: string;
  salary: string;
  salaryRange: string;
  experience: string;
  jobType: string;
  workplaceType: string;
  postDate: string;
  timestamp: number;
  views: number;
  applications: number;
  status: "active" | "closed" | "draft";
  category: string;
  businessName: string;
  businessType: string;
  images: string[];
  benefits: string[];
  otherRequirements: string;
  daysPerWeek: string;
  startTime: string;
  endTime: string;
  latitude?: number;
  longitude?: number;
  locationDescription?: string;
  isDraft?: boolean;
  isLocal?: boolean;
  employerId: string;
}

interface DashboardStats {
  totalJobs: number;
  activeJobs: number;
  totalDrafts: number;
  totalViews: number;
  totalApplications: number;
  avgMatchRate: number;
  profileViews: number;
}

// --- SKELETON COMPONENTS ---
const SkeletonHeader: React.FC = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-linear-to-br from-slate-50 to-indigo-50/10 animate-pulse">
      {/* Mobile Header Skeleton */}
      <div className="lg:hidden flex items-center justify-between bg-white px-6 py-4 border-b border-slate-200 shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-300 rounded-xl"></div>
          <div className="w-32 h-6 bg-slate-300 rounded"></div>
        </div>
        <div className="w-10 h-10 bg-slate-300 rounded-xl"></div>
      </div>

      {/* Sidebar Skeleton */}
      <aside className="hidden lg:block w-[320px] bg-white border-r border-slate-200 h-screen">
        <div className="px-6 py-8 space-y-6">
          {/* Profile Skeleton */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-slate-300 rounded-2xl"></div>
            <div className="text-center space-y-2">
              <div className="w-32 h-6 bg-slate-300 rounded mx-auto"></div>
              <div className="w-24 h-4 bg-slate-200 rounded mx-auto"></div>
            </div>
            <div className="w-full h-10 bg-slate-200 rounded-xl"></div>
          </div>

          {/* Navigation Skeleton */}
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-full h-12 bg-slate-200 rounded-xl"
              ></div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content Skeleton */}
      <main className="flex-1 p-8">
        {/* Header Skeleton */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="w-48 h-8 bg-slate-300 rounded"></div>
            <div className="w-64 h-4 bg-slate-200 rounded"></div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-64 h-10 bg-slate-200 rounded-xl"></div>
            <div className="w-32 h-10 bg-slate-300 rounded-xl"></div>
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border border-slate-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-2">
                  <div className="w-24 h-4 bg-slate-200 rounded"></div>
                  <div className="w-16 h-8 bg-slate-300 rounded"></div>
                </div>
                <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
              </div>
              <div className="w-32 h-3 bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>

        {/* Job Posts Grid Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-200 p-6"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <div className="w-32 h-6 bg-slate-300 rounded"></div>
                    <div className="w-48 h-4 bg-slate-200 rounded"></div>
                  </div>
                  <div className="w-10 h-10 bg-slate-200 rounded-xl"></div>
                </div>
                <div className="w-full h-24 bg-slate-200 rounded-xl"></div>
                <div className="w-full h-4 bg-slate-200 rounded"></div>
                <div className="flex gap-2">
                  <div className="w-20 h-6 bg-slate-200 rounded-lg"></div>
                  <div className="w-20 h-6 bg-slate-200 rounded-lg"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

const SkeletonJobCard: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden animate-pulse">
      <div className="p-6 border-b border-slate-100">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 min-w-0 space-y-2">
            <div className="w-32 h-6 bg-slate-300 rounded"></div>
            <div className="w-48 h-4 bg-slate-200 rounded"></div>
          </div>
          <div className="w-10 h-10 bg-slate-200 rounded-xl"></div>
        </div>
        <div className="w-full h-20 bg-slate-200 rounded-xl mb-4"></div>
        <div className="w-full h-4 bg-slate-200 rounded mb-2"></div>
        <div className="w-3/4 h-4 bg-slate-200 rounded"></div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="w-12 h-8 bg-slate-300 rounded mx-auto mb-1"></div>
            <div className="w-16 h-3 bg-slate-200 rounded mx-auto"></div>
          </div>
          <div className="text-center">
            <div className="w-12 h-8 bg-slate-300 rounded mx-auto mb-1"></div>
            <div className="w-16 h-3 bg-slate-200 rounded mx-auto"></div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-24 h-6 bg-slate-200 rounded-lg"></div>
          ))}
        </div>
        <div className="flex gap-2 pt-4 border-t border-slate-100">
          <div className="w-24 h-10 bg-slate-200 rounded-xl"></div>
          <div className="w-24 h-10 bg-slate-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");
  const [myJobs, setMyJobs] = useState<JobPost[]>([]);
  const [localDrafts, setLocalDrafts] = useState<JobPost[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalJobs: 0,
    activeJobs: 0,
    totalDrafts: 0,
    totalViews: 0,
    totalApplications: 0,
    avgMatchRate: 0,
    profileViews: 0,
  });
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [loadingDrafts, setLoadingDrafts] = useState(true);

  // Job detail states (like save_post)
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [jobDetailData, setJobDetailData] = useState<any>(null);
  const [loadingJobDetail, setLoadingJobDetail] = useState(false);

  // Check online status
  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Initialize
  useEffect(() => {
    setMounted(true);
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setStatus("unauthenticated");
        window.location.href = "/auth?form=login";
        return;
      }
      setCurrentUser(user);
      setStatus("authenticated");
      fetchUserData(user.uid);
      fetchUserJobs(user.uid);
      fetchLocalDrafts();
    });
    return () => unsubscribeAuth();
  }, []);

  // Fetch user profile data
  const fetchUserData = async (userId: string) => {
    try {
      const userRef = ref(rtdb, `users/${userId}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const profile: UserProfile = {
          uid: userId,
          displayName:
            data.displayName ||
            data.username ||
            data.email?.split("@")[0] ||
            "User",
          email: data.email || "",
          phoneNumber: data.phoneNumber || data.phone || "Not provided",
          photoURL: data.photoURL || data.profileImage || "",
          username: data.username || "",
          profession: data.profession || data.businessName || "Employer",
          bio: data.bio || "No bio yet",
          location: data.location || data.province || "Not specified",
          memberSince: data.createdAt
            ? new Date(data.createdAt).toLocaleDateString()
            : "Recently",
          totalPosts: data.totalPosts || 0,
          profileViews: data.profileViews || 0,
          rating: data.rating || 0,
        };
        setUserProfile(profile);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch user's job posts
  const fetchUserJobs = (userId: string) => {
    setLoadingJobs(true);
    const jobsRef = ref(rtdb, "posts");
    const jobsQuery = query(
      jobsRef,
      orderByChild("employerId"),
      equalTo(userId),
    );

    const unsubscribeJobs = onValue(
      jobsQuery,
      (snapshot: DataSnapshot) => {
        const data = snapshot.val();
        const jobsList: JobPost[] = [];

        if (data) {
          Object.entries(data).forEach(([id, value]: [string, any]) => {
            if (value.isDraft) return;

            const job: JobPost = {
              id,
              title: value.title || "Untitled Position",
              description: value.jobDescription || value.description || "",
              location: value.province || value.location || "Cambodia",
              province: value.province,
              salary: value.salary || "Negotiable",
              salaryRange: value.salaryRange || "",
              experience: value.experience || "Not specified",
              jobType: value.workplaceType || "Full-time",
              workplaceType: value.workplaceType,
              postDate: value.timestamp
                ? new Date(value.timestamp).toLocaleDateString()
                : "Recently",
              timestamp: value.timestamp || Date.now(),
              views: value.views || 0,
              applications: value.applications || 0,
              status: value.status || "active",
              category: value.category,
              businessName: value.businessName || "Company",
              businessType: value.businessType,
              images: value.images || [],
              benefits: value.benefits || [],
              otherRequirements: value.otherRequirements,
              daysPerWeek: value.daysPerWeek,
              startTime: value.startTime,
              endTime: value.endTime,
              latitude: value.latitude,
              longitude: value.longitude,
              locationDescription: value.locationDescription,
              isDraft: false,
              employerId: value.employerId || userId,
            };
            jobsList.push(job);
          });

          const sortedJobs = jobsList.sort((a, b) => b.timestamp - a.timestamp);
          setMyJobs(sortedJobs);
        } else {
          setMyJobs([]);
        }
        setLoadingJobs(false);
      },
      (error) => {
        console.error("Error fetching jobs:", error);
        setLoadingJobs(false);
      },
    );

    return unsubscribeJobs;
  };

  // Fetch local drafts from IndexedDB
  const fetchLocalDrafts = async () => {
    setLoadingDrafts(true);
    try {
      const drafts = await DraftManager.getAllDrafts();
      const localDraftsList: JobPost[] = drafts.map((draft) => ({
        id: draft.id,
        title: draft.data.title || "Untitled Draft",
        description: draft.data.jobDescription || "",
        location: draft.data.province || "Location not specified",
        province: draft.data.province || "Not specified",
        salary: draft.data.salary || "Negotiable",
        salaryRange: "",
        experience: draft.data.experience || "Not specified",
        jobType: draft.data.workplaceType || "Full-time",
        workplaceType: draft.data.workplaceType,
        postDate: draft.createdAt
          ? new Date(draft.createdAt).toLocaleDateString()
          : "Recently",
        timestamp: draft.createdAt || Date.now(),
        views: 0,
        applications: 0,
        status: "draft",
        category: draft.data.category,
        businessName: draft.data.businessName || "Company",
        businessType: draft.data.businessType,
        images: draft.images || [],
        benefits: draft.data.benefits || [],
        otherRequirements: draft.data.otherRequirements,
        daysPerWeek: draft.data.daysPerWeek,
        startTime: draft.data.startTime,
        endTime: draft.data.endTime,
        latitude: draft.data.latitude,
        longitude: draft.data.longitude,
        locationDescription: draft.data.locationDescription,
        isDraft: true,
        isLocal: true,
        employerId: currentUser?.uid || "",
      }));

      setLocalDrafts(localDraftsList);
    } catch (error) {
      console.error("Error fetching local drafts:", error);
    } finally {
      setLoadingDrafts(false);
    }
  };

  // Update dashboard stats - FIXED: Update when both myJobs and localDrafts are available
  useEffect(() => {
    if (!loadingJobs && !loadingDrafts) {
      const stats: DashboardStats = {
        totalJobs: myJobs.length,
        activeJobs: myJobs.filter((job) => job.status === "active").length,
        totalDrafts: localDrafts.length,
        totalViews: myJobs.reduce((sum, job) => sum + (job.views || 0), 0),
        totalApplications: myJobs.reduce(
          (sum, job) => sum + (job.applications || 0),
          0,
        ),
        avgMatchRate:
          myJobs.length > 0
            ? Math.round(
                myJobs.reduce((sum, job) => sum + 85, 0) / myJobs.length,
              )
            : 0,
        profileViews: userProfile?.profileViews || 0,
      };
      setDashboardStats(stats);
    }
  }, [myJobs, localDrafts, loadingJobs, loadingDrafts, userProfile]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.location.href = "/auth?form=login";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleCreateJob = () => {
    window.location.href = "/create_post";
  };

  const handleEditJob = (job: JobPost) => {
    if (job.isDraft) {
      window.location.href = `/create_post?localDraftId=${job.id}`;
    } else {
      window.location.href = `/edit_post/${job.id}`;
    }
  };

  // NEW: Handle view job details (like save_post)
  const handleSelectJob = async (job: JobPost) => {
    setLoadingJobDetail(true);
    try {
      if (job.isDraft) {
        // For drafts, use the draft data directly
        const draft = await DraftManager.getDraft(job.id);
        if (draft) {
          const transformedData = {
            id: job.id,
            title: draft.data.title || "Untitled Draft",
            location: draft.data.province || "Location not specified",
            province: draft.data.province,
            salary: draft.data.salary || "Negotiable",
            description: draft.data.jobDescription || "",
            jobDescription: draft.data.jobDescription || "",
            experience: draft.data.experience || "Not specified",
            category: draft.data.category,
            businessName: draft.data.businessName || "Company",
            businessType: draft.data.businessType,
            workplaceType: draft.data.workplaceType,
            images: draft.images || [],
            benefits: draft.data.benefits || [],
            otherRequirements: draft.data.otherRequirements,
            daysPerWeek: draft.data.daysPerWeek,
            startTime: draft.data.startTime,
            endTime: draft.data.endTime,
            isDraft: true,
          };

          setSelectedJob(job);
          setJobDetailData(transformedData);
        }
      } else {
        // For published jobs, fetch from Firebase
        const postRef = ref(rtdb, `posts/${job.id}`);
        const postSnapshot = await get(postRef);

        if (postSnapshot.exists()) {
          const postData = postSnapshot.val();

          const transformedData = {
            id: job.id,
            postName: postData.postName,
            title: postData.title,
            location: postData.location,
            province: postData.province,
            postDate: postData.postDate,
            description: postData.description,
            jobDescription: postData.jobDescription,
            profileName: postData.profileName,
            authorName: postData.authorName,
            experience: postData.experience,
            timeCommitment: postData.timeCommitment,
            salaryRange: postData.salaryRange,
            salary: postData.salary,
            currency: postData.currency || "USD",
            profileImage: postData.profileImage,
            authorPhoto: postData.authorPhoto,
            cardBackgroundImage: postData.cardBackgroundImage,
            cardBackgroundImages: postData.cardBackgroundImages,
            images: postData.images,
            benefits: postData.benefits,
            daysPerWeek: postData.daysPerWeek,
            startTime: postData.startTime,
            endTime: postData.endTime,
            category: postData.category,
            businessName: postData.businessName,
            businessType: postData.businessType,
            workplaceType: postData.workplaceType,
            otherRequirements: postData.otherRequirements,
            latitude: postData.latitude,
            longitude: postData.longitude,
            locationDescription: postData.locationDescription,
            timestamp: postData.timestamp,
            views: postData.views || 0,
            employerId: postData.employerId || postData.authorId,
            isDraft: false,
          };

          setSelectedJob(job);
          setJobDetailData(transformedData);
        } else {
          alert("Job not found. It may have been removed.");
        }
      }
    } catch (error) {
      console.error("Error loading job details:", error);
      alert("Failed to load job details.");
    } finally {
      setLoadingJobDetail(false);
    }
  };

  const handleCloseDetail = () => {
    setSelectedJob(null);
    setJobDetailData(null);
  };

  const handlePublishDraft = async (draft: JobPost) => {
    if (!confirm("Are you sure you want to publish this draft?")) return;

    if (!isOnline || !currentUser) {
      alert("You must be online and logged in to publish a draft.");
      return;
    }

    try {
      const localDraft = await DraftManager.getDraft(draft.id);
      if (!localDraft) {
        alert("Draft not found!");
        return;
      }

      const {
        getStorage,
        ref: storageRef,
        uploadBytes,
        getDownloadURL,
      } = await import("firebase/storage");
      const storage = getStorage();

      const uploadedUrls = await Promise.all(
        localDraft.images.map(async (base64Image: string, index: number) => {
          const response = await fetch(base64Image);
          const blob = await response.blob();
          const fileExtension = "jpg";
          const storageReference = storageRef(
            storage,
            `posts/${currentUser.uid}/${draft.id}_${index}.${fileExtension}`,
          );
          const snapshot = await uploadBytes(storageReference, blob);
          return await getDownloadURL(snapshot.ref);
        }),
      );

      const newPostRef = ref(rtdb, `posts/${draft.id}`);
      const postData = {
        ...localDraft.data,
        id: draft.id,
        postId: draft.id,
        employerId: currentUser.uid,
        authorName:
          userProfile?.username || currentUser?.displayName || "Employer",
        authorPhoto: userProfile?.photoURL || "",
        images: uploadedUrls,
        status: "active",
        views: 0,
        applications: 0,
        timestamp: Date.now(),
        isDraft: false,
      };

      await set(newPostRef, postData);
      await DraftManager.deleteDraft(draft.id);

      if (userProfile) {
        const userRef = ref(rtdb, `users/${currentUser.uid}`);
        const currentTotal = userProfile.totalPosts || 0;
        await set(userRef, {
          ...userProfile,
          totalPosts: currentTotal + 1,
          updatedAt: Date.now(),
        });
      }

      alert("Draft published successfully!");
      fetchLocalDrafts();
      fetchUserJobs(currentUser.uid);

      // Close detail view if open
      if (selectedJob?.id === draft.id) {
        handleCloseDetail();
      }
    } catch (error) {
      console.error("Error publishing draft:", error);
      alert("Failed to publish draft. Please try again.");
    }
  };

  const handleDeleteJob = async (job: JobPost) => {
    if (
      !confirm(
        `Are you sure you want to delete this ${job.isDraft ? "draft" : "job post"}?`,
      )
    )
      return;

    try {
      if (job.isDraft) {
        await DraftManager.deleteDraft(job.id);
        setLocalDrafts((prev) => prev.filter((d) => d.id !== job.id));
      } else {
        await remove(ref(rtdb, `posts/${job.id}`));

        if (userProfile && currentUser) {
          const userRef = ref(rtdb, `users/${currentUser.uid}`);
          const currentTotal = userProfile.totalPosts || 0;
          await set(userRef, {
            ...userProfile,
            totalPosts: currentTotal > 0 ? currentTotal - 1 : 0,
            updatedAt: Date.now(),
          });
        }

        setMyJobs((prev) => prev.filter((j) => j.id !== job.id));
      }

      // Close detail view if open
      if (selectedJob?.id === job.id) {
        handleCloseDetail();
      }
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Failed to delete. Please try again.");
    }
  };

  // Combine all posts for display
  const allPosts = useMemo(() => {
    return [...myJobs, ...localDrafts].sort(
      (a, b) => b.timestamp - a.timestamp,
    );
  }, [myJobs, localDrafts]);

  const filteredPosts = useMemo(() => {
    let filtered = allPosts;

    if (selectedFilter !== "all") {
      if (selectedFilter === "draft") {
        filtered = filtered.filter((post) => post.isDraft);
      } else {
        filtered = filtered.filter(
          (post) => !post.isDraft && post.status === selectedFilter,
        );
      }
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query) ||
          post.businessName.toLowerCase().includes(query) ||
          post.location.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [allPosts, selectedFilter, searchQuery]);

  const getStatusColor = (status: string, isDraft?: boolean) => {
    if (isDraft) return "bg-amber-500";
    switch (status) {
      case "active":
        return "bg-emerald-500";
      case "closed":
        return "bg-rose-500";
      default:
        return "bg-slate-500";
    }
  };

  const getStatusText = (job: JobPost) => {
    if (job.isDraft) return "Local Draft";
    switch (job.status) {
      case "active":
        return "Active";
      case "closed":
        return "Closed";
      default:
        return "Unknown";
    }
  };

  // Show JobDetail when a job is selected (like save_post)
  if (selectedJob && jobDetailData) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-indigo-50/10">
        {/* Back button header */}
        <div className="bg-white px-4 md:px-8 py-4 shadow-sm border-b border-slate-100 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto">
            <button
              onClick={handleCloseDetail}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </button>
          </div>
        </div>

        <JobDetail
          id={jobDetailData.id}
          postName={jobDetailData.postName}
          title={jobDetailData.title}
          location={jobDetailData.location}
          province={jobDetailData.province}
          postDate={jobDetailData.postDate}
          description={jobDetailData.description}
          jobDescription={jobDetailData.jobDescription}
          profileName={jobDetailData.profileName}
          authorName={jobDetailData.authorName}
          experience={jobDetailData.experience}
          timeCommitment={jobDetailData.timeCommitment}
          salaryRange={jobDetailData.salaryRange}
          salary={jobDetailData.salary}
          currency={jobDetailData.currency}
          profileImage={jobDetailData.profileImage}
          authorPhoto={jobDetailData.authorPhoto}
          cardBackgroundImage={jobDetailData.cardBackgroundImage}
          cardBackgroundImages={jobDetailData.cardBackgroundImages}
          images={jobDetailData.images}
          benefits={jobDetailData.benefits}
          daysPerWeek={jobDetailData.daysPerWeek}
          startTime={jobDetailData.startTime}
          endTime={jobDetailData.endTime}
          category={jobDetailData.category}
          businessName={jobDetailData.businessName}
          businessType={jobDetailData.businessType}
          workplaceType={jobDetailData.workplaceType}
          otherRequirements={jobDetailData.otherRequirements}
          latitude={jobDetailData.latitude}
          longitude={jobDetailData.longitude}
          locationDescription={jobDetailData.locationDescription}
          timestamp={jobDetailData.timestamp}
          views={jobDetailData.views}
          employerId={jobDetailData.employerId}
        />

        {/* Add Edit and Delete buttons for job detail view */}
        {jobDetailData.isDraft ? (
          <div className="fixed top-22 right-6 flex gap-3 z-50">
            <button
              onClick={() => handleEditJob(selectedJob)}
              className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg flex items-center gap-2"
            >
              <Pencil size={18} />
              Edit Draft
            </button>
            <button
              onClick={() => handlePublishDraft(selectedJob)}
              disabled={!isOnline}
              className="px-6 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlayCircle size={18} />
              Publish Draft
            </button>
            <button
              onClick={() => handleDeleteJob(selectedJob)}
              className="px-6 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-colors shadow-lg flex items-center gap-2"
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        ) : (
          <div className="fixed top-22 right-6 flex gap-3 z-50">
            <button
              onClick={() => handleEditJob(selectedJob)}
              className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg flex items-center gap-2"
            >
              <Pencil size={18} />
              Edit Job
            </button>
            <button
              onClick={() => handleDeleteJob(selectedJob)}
              className="px-6 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 transition-colors shadow-lg flex items-center gap-2"
            >
              <Trash2 size={18} />
              Delete Job
            </button>
          </div>
        )}
      </div>
    );
  }

  if (!mounted) return null;

  if (status === "loading") {
    return <SkeletonHeader />;
  }

  if (status === "unauthenticated") {
    return (
      <div className="h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-indigo-50/20">
        <div className="text-center">
          <AlertCircle className="text-rose-500 mx-auto mb-4" size={48} />
          <h3 className="text-xl font-bold text-slate-800 mb-2">
            Authentication Required
          </h3>
          <p className="text-slate-600 mb-6">
            Please log in to access your dashboard.
          </p>
          <button
            onClick={() => (window.location.href = "/auth?form=login")}
            className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-linear-to-br from-slate-50 to-indigo-50/10">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between bg-white px-6 py-4 border-b border-slate-200 shadow-sm fixed top-0 left-0 right-0 z-40">
        <div className="flex items-center gap-3">
          {userProfile?.photoURL ? (
            <img
              src={userProfile.photoURL}
              alt="Profile"
              className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm"
            />
          ) : (
            <div className="w-10 h-10 bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center font-bold text-white text-sm uppercase">
              {userProfile?.displayName?.slice(0, 2) || "US"}
            </div>
          )}
          <span className="font-bold text-slate-800">Dashboard</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar - Fixed with overflow-y-auto */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-[320px] h-screen overflow-clip bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 transform shadow-2xl
        lg:relative lg:translate-x-0 lg:w-[320px] lg:shadow-none lg:z-0 lg:flex lg:flex-col
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static
      `}
      >
        <div className="flex flex-col px-6 py-8 gap-5 overflow-y-hidden justify-center align-center my-auto">
          {/* Profile Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {userProfile?.photoURL ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={userProfile.photoURL}
                  alt="Profile"
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-20 h-20 bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center font-black text-white text-2xl uppercase shadow-lg">
                  {userProfile?.displayName?.slice(0, 2) || "US"}
                </div>
              )}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#d3f500] rounded-full border-2 border-white flex items-center justify-center">
                <CheckCircle2 size={10} className="text-indigo-900" />
              </div>
            </div>

            <div className="text-center">
              <h2 className="font-bold text-xl text-slate-900">
                {userProfile?.displayName}
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                {userProfile?.profession}
              </p>
              <div className="flex items-center justify-center gap-2 mt-2 text-sm text-slate-400">
                <MapPin size={14} />
                <span>{userProfile?.location}</span>
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors text-sm font-medium">
              <Edit size={16} />
              Edit Profile
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <SidebarLink
              icon={<Briefcase size={20} className="text-indigo-600" />}
              label="My Jobs"
              active={
                selectedFilter === "all" ||
                selectedFilter === "active" ||
                selectedFilter === "closed"
              }
              count={dashboardStats.totalJobs}
              onClick={() => {
                setSelectedFilter("all");
                setIsMobileMenuOpen(false);
              }}
            />

            <SidebarLink
              icon={<Users size={20} className="text-blue-600" />}
              label="Candidates"
              count={dashboardStats.totalApplications}
            />
            <SidebarLink
              icon={<Bell size={20} className="text-amber-600" />}
              label="Notifications"
              count={3}
            />
            <SidebarLink
              icon={<PieChart size={20} className="text-emerald-600" />}
              label="Analytics"
            />
            <SidebarLink
              icon={<Settings size={20} className="text-slate-600" />}
              label="Settings"
            />
          </nav>

          {/* Sign Out */}
          <div className="mb-auto ">
            <button
              onClick={handleSignOut}
              className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium group"
            >
              <LogOut
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content - Scrollable */}
      <main className="flex-1 p-4 lg:p-8 overflow-y-auto lg:ml-0 lg:h-screen no-scrollbar mt-16 lg:mt-0">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-black text-slate-900">
              Dashboard
            </h1>
            <p className="text-slate-500 mt-1">
              Manage your job posts and track performance
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative flex-1 lg:flex-none lg:w-64">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              onClick={handleCreateJob}
              className="px-4 py-2.5 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              <PlusCircle size={18} />
              Create Job
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Published Jobs"
            value={dashboardStats.totalJobs}
            change={`${dashboardStats.activeJobs} active`}
            icon={<Briefcase className="text-indigo-600" size={20} />}
            color="from-indigo-50 to-blue-50"
            border="border-indigo-100"
          />
          <StatCard
            title="Local Drafts"
            value={dashboardStats.totalDrafts}
            change={!isOnline ? "Offline only" : "Ready to publish"}
            icon={<Database className="text-amber-600" size={20} />}
            color="from-amber-50 to-yellow-50"
            border="border-amber-100"
          />
          <StatCard
            title="Total Views"
            value={dashboardStats.totalViews}
            change="+24% from last month"
            icon={<Eye className="text-blue-600" size={20} />}
            color="from-blue-50 to-cyan-50"
            border="border-blue-100"
          />
          <StatCard
            title="Applications"
            value={dashboardStats.totalApplications}
            change="+12 new"
            icon={<UserCheck className="text-purple-600" size={20} />}
            color="from-purple-50 to-pink-50"
            border="border-purple-100"
          />
        </div>

        {/* Offline Warning */}
        {!isOnline && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl">
            <div className="flex items-center gap-3">
              <WifiOff size={20} className="text-amber-600" />
              <div>
                <h4 className="font-bold text-amber-800">You're Offline</h4>
                <p className="text-sm text-amber-600">
                  You can view and edit local drafts, but need to be online to
                  publish new jobs.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-500" />
            <span className="text-sm font-bold text-slate-700">Filter by:</span>
          </div>
          {["all", "active", "closed", "draft"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                selectedFilter === filter
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-500 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {filter === "all"
                ? "All Posts"
                : filter === "draft"
                  ? "Local Drafts"
                  : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Jobs`}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-2 text-sm text-slate-500">
            <span className="font-bold text-slate-900">
              {filteredPosts.length}
            </span>{" "}
            {selectedFilter === "draft" ? "drafts" : "posts"} found
          </div>
        </div>

        {/* Loading State for Job Posts */}
        {(loadingJobs || loadingDrafts) && selectedFilter !== "draft" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-50">
            {[1, 2].map((i) => (
              <SkeletonJobCard key={i} />
            ))}
          </div>
        )}

        {/* Job Posts Grid */}
        {!loadingJobs && !loadingDrafts && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group cursor-pointer"
                  onClick={() => handleSelectJob(post)}
                >
                  {/* Job Header */}
                  <div className="p-6 border-b border-slate-100">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`${getStatusColor(post.status, post.isDraft)} text-white text-xs font-bold px-3 py-1 rounded-full`}
                          >
                            {getStatusText(post)}
                          </span>
                          <span className="text-xs text-slate-500">
                            {post.postDate}
                          </span>
                          {post.isDraft && (
                            <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
                              <Database size={12} />
                              Local Draft
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-lg text-slate-900 mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-slate-500">
                          <span className="font-semibold">
                            {post.businessName}
                          </span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} />
                            {post.location}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle menu click
                        }}
                        className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400"
                      >
                        <MoreVertical size={20} />
                      </button>
                    </div>

                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {post.description || "No description available"}
                    </p>

                    {post.images?.[0] && (
                      <div className="w-full h-40 rounded-xl overflow-hidden mb-4">
                        <img
                          src={post.images[0]}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                  </div>

                  {/* Job Stats */}
                  <div className="p-6">
                    {!post.isDraft && (
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-black text-slate-900">
                            {post.views || 0}
                          </div>
                          <div className="text-xs text-slate-500">Views</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-black text-slate-900">
                            {post.applications || 0}
                          </div>
                          <div className="text-xs text-slate-500">
                            Applications
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Briefcase size={14} />
                        <span>{post.experience || "Not specified"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <DollarSign size={14} />
                        <span className="font-bold">
                          {post.salary || "Negotiable"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Clock size={14} />
                        <span>{post.jobType || "Full-time"}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectJob(post);
                          }}
                          className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
                        >
                          <Eye size={14} />
                          {post.isDraft ? "Preview" : "View"}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditJob(post);
                          }}
                          className="px-4 py-2 bg-indigo-50 text-indigo-600 hover:bg-indigo-100 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
                        >
                          <Pencil size={14} />
                          Edit
                        </button>
                        {post.isDraft && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePublishDraft(post);
                            }}
                            disabled={!isOnline}
                            className="px-4 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <PlayCircle size={14} />
                            {isOnline ? "Publish" : "Offline"}
                          </button>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteJob(post);
                        }}
                        className="px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl text-sm font-bold transition-colors flex items-center gap-2"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 flex flex-col items-center justify-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                <div className="w-20 h-20 bg-linear-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center text-indigo-300 mb-4">
                  <Briefcase size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  {selectedFilter === "draft"
                    ? "No drafts found"
                    : "No job posts found"}
                </h3>
                <p className="text-slate-500 text-center max-w-md mb-6">
                  {searchQuery
                    ? "Try adjusting your filters or search terms"
                    : selectedFilter === "draft"
                      ? "Save your job posts as drafts to review them later"
                      : "Get started by creating your first job post"}
                </p>
                <button
                  onClick={handleCreateJob}
                  className="px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center gap-2"
                >
                  <PlusCircle size={18} />
                  {selectedFilter === "draft"
                    ? "Create New Draft"
                    : "Create Your First Job"}
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

// Sidebar Link Component
const SidebarLink: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  count?: number;
  onClick?: () => void;
}> = ({ icon, label, active = false, count, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all
      ${
        active
          ? "bg-linear-to-r from-indigo-50 to-blue-50 border border-indigo-100 text-indigo-600 font-bold"
          : "text-slate-500 hover:bg-slate-50"
      }
    `}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span>{label}</span>
    </div>
    {count !== undefined && (
      <span
        className={`px-2 py-1 rounded-full text-xs font-bold ${active ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-600"}`}
      >
        {count}
      </span>
    )}
  </button>
);

// Stat Card Component
const StatCard: React.FC<{
  title: string;
  value: number;
  change: string;
  icon: React.ReactNode;
  color: string;
  border: string;
}> = ({ title, value, change, icon, color, border }) => (
  <div className={`bg-linear-to-br ${color} ${border} p-5 rounded-2xl border`}>
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-sm text-slate-600">{title}</p>
        <p className="text-2xl font-black text-slate-900 mt-1">{value}</p>
      </div>
      <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center shadow-sm">
        {icon}
      </div>
    </div>
    <p className="text-xs text-slate-500">{change}</p>
  </div>
);

export default UserDashboard;
