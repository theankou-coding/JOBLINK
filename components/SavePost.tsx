"use client";

import React, { useEffect, useState } from "react";
import {
    Bookmark,
    Search,
    Trash2,
    Share2,
    MapPin,
    Calendar,
    Loader2,
    AlertCircle,
    Home,
    Eye,
    Users,
    Briefcase,
    ChevronRight,
    ArrowLeft,
} from "lucide-react";
import { rtdb, auth } from "@/firebase/clientApp";
import { ref, onValue, remove, get } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import JobDetail from "@/components/JobDetail";

interface SavedJob {
    id: string;
    jobId: string;
    title: string;
    location: string;
    salary: string;
    savedAt: number;
    jobImage: string;
    type?: string;
    description?: string;
    tags?: string[];
    views?: number;
    applications?: number;
    experience?: string;
    employerName?: string;
    employerImage?: string;
}

interface SavedJobCardProps {
    job: SavedJob;
    onBookmark: (jobId: string) => void;
    onSelect: (job: SavedJob) => void;
    onShare: (job: SavedJob) => void;
}

// --- SKELETON COMPONENTS ---
const SkeletonSavedJobCard: React.FC = () => {
    return (
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden animate-pulse">
            <div className="h-52 bg-slate-200 relative"></div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <div className="h-6 bg-slate-300 rounded mb-2 w-3/4"></div>
                        <div className="h-4 bg-slate-300 rounded w-1/2"></div>
                    </div>
                    <div className="w-10 h-10 bg-slate-300 rounded-xl"></div>
                </div>
                <div className="h-4 bg-slate-200 rounded mb-4 w-full"></div>
                <div className="h-4 bg-slate-200 rounded mb-4 w-5/6"></div>
                <div className="flex flex-wrap gap-2 mb-5">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-16 h-6 bg-slate-200 rounded-lg"></div>
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-3 mb-5 p-4 bg-slate-100 rounded-2xl">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="text-center">
                            <div className="h-3 bg-slate-300 rounded mb-1"></div>
                            <div className="h-4 bg-slate-300 rounded w-full"></div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                        <div>
                            <div className="h-3 bg-slate-300 rounded mb-1 w-12"></div>
                            <div className="h-6 bg-slate-300 rounded w-20"></div>
                        </div>
                        <div className="border-l pl-4 border-slate-200">
                            <div className="h-3 bg-slate-300 rounded mb-1 w-16"></div>
                            <div className="h-6 bg-slate-300 rounded w-16"></div>
                        </div>
                    </div>
                    <div className="w-10 h-10 bg-slate-300 rounded-xl"></div>
                </div>
            </div>
        </div>
    );
};

const SkeletonHeader: React.FC = () => {
    return (
        <div className="bg-white px-4 md:px-8 py-8 shadow-sm border-b border-slate-100 animate-pulse">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-slate-300 rounded-2xl"></div>
                        <div>
                            <div className="w-48 h-8 bg-slate-300 rounded mb-2"></div>
                            <div className="w-64 h-4 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                    <div className="w-full max-w-md">
                        <div className="w-full h-12 bg-slate-200 rounded-2xl"></div>
                    </div>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="w-32 h-10 bg-slate-200 rounded-full"></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- SAVED JOB CARD COMPONENT ---
const SavedJobCard: React.FC<SavedJobCardProps> = ({ job, onBookmark, onSelect, onShare }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [employerImageError, setEmployerImageError] = useState(false);

    return (
        <div
            className="bg-white rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-2xl hover:border-indigo-200/60 transition-all duration-500 group overflow-hidden cursor-pointer relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onSelect(job)}
        >
            {/* Image Section */}
            <div className="h-52 relative overflow-hidden bg-linear-to-br from-slate-100 to-slate-200">
                {job.jobImage && !imageError ? (
                    <img
                        src={job.jobImage}
                        className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`}
                        alt={job.title}
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Briefcase className="w-16 h-16 text-slate-300" />
                    </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

                {/* Job Type Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                        {job.type || "Full-time"}
                    </span>
                </div>

                {/* Employer Profile */}
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-md flex items-center justify-center overflow-hidden shadow-lg border-2 border-white/50">
                        {job.employerImage && !employerImageError ? (
                            <img
                                src={job.employerImage}
                                alt={job.employerName || "Employer"}
                                className="w-full h-full object-cover"
                                onError={() => setEmployerImageError(true)}
                            />
                        ) : (
                            <span className="font-black text-slate-700 text-xl">
                                {job.employerName ? job.employerName[0].toUpperCase() : "E"}
                            </span>
                        )}
                    </div>
                    <div className="text-white">
                        <p className="font-bold text-sm drop-shadow-lg">{job.employerName || "Employer"}</p>
                        <p className="text-xs text-white/80 flex items-center gap-1">
                            <MapPin size={10} />
                            {job.location || "Location not specified"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
                {/* Title & Actions */}
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 min-w-0 pr-3">
                        <h3 className="font-black text-slate-900 text-xl leading-tight mb-2 group-hover:text-indigo-600 transition-colors line-clamp-2">
                            {job.title || "Untitled Job"}
                        </h3>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); onBookmark(job.id); }}
                        className="p-2.5 rounded-xl transition-all text-slate-400 hover:text-rose-600 hover:bg-rose-50 shrink-0"
                        title="Remove from saved"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>

                {/* Description */}
                {job.description && (
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {job.description}
                    </p>
                )}

                {/* Tags */}
                {job.tags && job.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-5">
                        {job.tags.slice(0, 4).map((tag, index) => (
                            <span key={index} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold">
                                {tag}
                            </span>
                        ))}
                        {job.tags.length > 4 && (
                            <span className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold">
                                +{job.tags.length - 4} more
                            </span>
                        )}
                    </div>
                )}

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3 mb-5 p-4 bg-slate-50 rounded-2xl">
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                            <Calendar size={12} />
                            <span className="text-[10px] font-medium uppercase tracking-wider">Saved</span>
                        </div>
                        <span className="text-xs font-bold text-slate-700">
                            {job.savedAt ? new Date(job.savedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "N/A"}
                        </span>
                    </div>
                    <div className="text-center border-l border-r border-slate-200">
                        <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                            <Eye size={12} />
                            <span className="text-[10px] font-medium uppercase tracking-wider">Views</span>
                        </div>
                        <span className="text-xs font-bold text-slate-700">{job.views || 0}</span>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 text-slate-500 mb-1">
                            <Users size={12} />
                            <span className="text-[10px] font-medium uppercase tracking-wider">Applied</span>
                        </div>
                        <span className="text-xs font-bold text-slate-700">{job.applications || 0}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="text-left">
                            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium mb-0.5">Salary</div>
                            <div className="font-black text-slate-900 text-base">{job.salary || "Negotiable"}</div>
                        </div>
                        {job.experience && (
                            <div className="text-left border-l pl-4 border-slate-200">
                                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-medium mb-0.5">Experience</div>
                                <div className="font-bold text-slate-900 text-sm">{job.experience}</div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onShare(job);
                        }}
                        className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                        title="Share job"
                    >
                        <Share2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function SavePost() {
    const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<SavedJob[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("All");
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [selectedJob, setSelectedJob] = useState<any>(null);
    const [loadingJobDetail, setLoadingJobDetail] = useState(false);
    const [jobDetailData, setJobDetailData] = useState<any>(null);
    const [dataFetched, setDataFetched] = useState(false);
    const [initialAuthChecked, setInitialAuthChecked] = useState(false);
    const router = useRouter();

    const categories = ["All", "Recently Saved", "High Salary", "Phnom Penh", "Remote"];

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                router.push("/login");
            }
            setInitialAuthChecked(true);
        });

        return () => unsubscribe();
    }, [router]);

    useEffect(() => {
        if (!currentUser || !initialAuthChecked) {
            return;
        }

        const savedRef = ref(rtdb, `savedJobs/${currentUser.uid}`);

        setLoading(true);
        setDataFetched(false);

        const unsubscribe = onValue(savedRef,
            async (snapshot) => {
                try {
                    if (!snapshot.exists()) {
                        console.log("📭 No saved jobs found in database");
                        setSavedJobs([]);
                        setFilteredJobs([]);
                        setLoading(false);
                        setDataFetched(true);
                        return;
                    }

                    console.log("📦 Found saved jobs in database, processing...");
                    const data = snapshot.val();
                    const jobsList: SavedJob[] = [];

                    for (const [savedJobId, savedData] of Object.entries(data) as [string, any][]) {
                        const jobId = savedData.jobId || savedJobId;

                        // Fetch the full job post data
                        const postRef = ref(rtdb, `posts/${jobId}`);
                        const postSnapshot = await get(postRef);

                        if (postSnapshot.exists()) {
                            const postData = postSnapshot.val();

                            const job: SavedJob = {
                                id: savedJobId,
                                jobId: jobId,
                                title: postData.title || "Untitled Job",
                                location: postData.province || postData.location || "Location not specified",
                                salary: postData.salaryRange || postData.salary || "Negotiable",
                                savedAt: savedData.savedAt || savedData.timestamp || Date.now(),
                                jobImage: postData.cardBackgroundImage || postData.images?.[0] || null,
                                type: postData.category || postData.workplaceType || "Full-time",
                                description: postData.jobDescription || postData.description,
                                tags: postData.skills || [],
                                views: postData.views || 0,
                                applications: postData.applications || 0,
                                experience: postData.experience,
                                employerName: postData.authorName || postData.businessName || "Employer",
                                employerImage: postData.authorPhoto
                            };

                            jobsList.push(job);
                        }
                    }

                    const sortedJobs = jobsList.sort((a, b) => b.savedAt - a.savedAt);
                    setSavedJobs(sortedJobs);
                    setFilteredJobs(sortedJobs);
                    setLoading(false);
                    setDataFetched(true);
                } catch (err) {
                    console.error("Error processing saved jobs:", err);
                    setError("Failed to load saved jobs.");
                    setLoading(false);
                    setDataFetched(true);
                }
            },
            (err) => {
                console.error("Database error:", err);
                setError("Failed to connect to database.");
                setLoading(false);
                setDataFetched(true);
            }
        );

        return () => unsubscribe();
    }, [currentUser, initialAuthChecked]);

    useEffect(() => {
        let result = savedJobs;

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(job =>
                job.title?.toLowerCase().includes(query) ||
                job.location?.toLowerCase().includes(query) ||
                job.employerName?.toLowerCase().includes(query)
            );
        }

        if (filter !== "All") {
            switch (filter) {
                case "Recently Saved":
                    const oneWeekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
                    result = result.filter(job => job.savedAt > oneWeekAgo);
                    break;
                case "High Salary":
                    result = result.filter(job => {
                        const salaryMatch = job.salary?.match(/\d+/);
                        return salaryMatch && parseInt(salaryMatch[0]) >= 1500;
                    });
                    break;
                case "Phnom Penh":
                    result = result.filter(job =>
                        job.location?.toLowerCase().includes("phnom penh")
                    );
                    break;
                case "Remote":
                    result = result.filter(job =>
                        job.type?.toLowerCase() === "remote" ||
                        job.title?.toLowerCase().includes("remote") ||
                        job.location?.toLowerCase().includes("remote")
                    );
                    break;
            }
        }

        setFilteredJobs(result);
    }, [savedJobs, searchQuery, filter]);

    const handleDelete = async (savedJobId: string) => {
        if (!currentUser || !confirm("Remove this job from your saved list?")) return;

        try {
            await remove(ref(rtdb, `savedJobs/${currentUser.uid}/${savedJobId}`));
            
            // Remove from local state
            setSavedJobs(prev => prev.filter(job => job.id !== savedJobId));
            setFilteredJobs(prev => prev.filter(job => job.id !== savedJobId));
            
            // If the deleted job is currently being viewed, close it
            if (selectedJob?.jobId === savedJobId) {
                setSelectedJob(null);
                setJobDetailData(null);
            }
        } catch (error) {
            console.error("Error deleting:", error);
            alert("Failed to remove job.");
        }
    };

    const handleShare = (job: SavedJob) => {
        const shareUrl = `${window.location.origin}/job/${job.jobId}`;
        const shareText = `Check out: ${job.title}`;

        if (navigator.share) {
            navigator.share({ title: job.title, text: shareText, url: shareUrl }).catch(console.error);
        } else {
            navigator.clipboard.writeText(`${shareText}\n${shareUrl}`)
                .then(() => alert("Link copied!"))
                .catch(() => alert("Failed to copy"));
        }
    };

    const handleSelectJob = async (job: SavedJob) => {
        setLoadingJobDetail(true);
        try {
            // Fetch full job details
            const postRef = ref(rtdb, `posts/${job.jobId}`);
            const postSnapshot = await get(postRef);

            if (postSnapshot.exists()) {
                const postData = postSnapshot.val();
                
                // Transform the data to match JobDetail props
                const transformedData = {
                    id: job.jobId,
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
                };

                setSelectedJob(job);
                setJobDetailData(transformedData);
            } else {
                alert("Job not found. It may have been removed.");
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

    // Show JobDetail component when a job is selected
    if (selectedJob && jobDetailData) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30">
                {/* Back button header */}
                <div className="bg-white px-4 md:px-8 py-4 shadow-sm border-b border-slate-100">
                    <div className="max-w-7xl mx-auto">
                        <button
                            onClick={handleCloseDetail}
                            className="flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Back to Saved Jobs
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
            </div>
        );
    }

    // Show skeleton loading state - show skeleton until we have a user AND data is fetched
    if (loading || !initialAuthChecked || (currentUser && !dataFetched)) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30">
                <SkeletonHeader />
                <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <SkeletonSavedJobCard key={i} />
                        ))}
                    </div>
                </main>
            </div>
        );
    }

    // Show loading spinner when job detail is loading
    if (loadingJobDetail) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="animate-spin text-indigo-600 mx-auto mb-4" size={56} />
                    <p className="text-slate-700 font-bold text-lg">
                        Loading job details...
                    </p>
                    <p className="text-slate-400 text-sm mt-1">
                        Please wait
                    </p>
                </div>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30 flex items-center justify-center p-4">
                <div className="text-center max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-200">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4">
                        <AlertCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">Oops!</h3>
                    <p className="text-slate-600 mb-6">{error}</p>
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={() => window.location.reload()}
                            className="px-5 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={() => router.push("/")}
                            className="px-5 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2"
                        >
                            <Home size={18} />
                            Go Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50/30">
            {/* Header */}
            <div className="bg-white px-4 md:px-8 py-8 shadow-sm border-b border-slate-100">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-linear-to-br from-indigo-600 to-indigo-700 rounded-2xl text-white shadow-lg shadow-indigo-200">
                                <Bookmark size={28} fill="currentColor" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Saved Jobs</h1>
                                <p className="text-slate-500 font-medium mt-1.5 flex items-center gap-2">
                                    <span className="flex items-center gap-1.5">
                                        <Briefcase size={14} />
                                        {savedJobs.length} job{savedJobs.length !== 1 ? 's' : ''} saved
                                    </span>
                                    <span className="text-slate-300">•</span>
                                    <span className="text-indigo-600 font-bold">
                                        {filteredJobs.length} shown
                                    </span>
                                </p>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="relative group max-w-md w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search by title or location..."
                                className="pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl w-full outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 focus:bg-white transition-all font-medium text-slate-700"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Category Filters */}
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap ${filter === cat
                                    ? "bg-linear-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-200"
                                    : "bg-white text-slate-600 border-2 border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Jobs Grid */}
            <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
                {savedJobs.length > 0 ? (
                    filteredJobs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredJobs.map((job) => (
                                <SavedJobCard
                                    key={job.id}
                                    job={job}
                                    onBookmark={handleDelete}
                                    onSelect={handleSelectJob}
                                    onShare={handleShare}
                                />
                            ))}
                        </div>
                    ) : (
                        // No matches found
                        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-sm">
                            <div className="w-24 h-24 bg-linear-to-br from-slate-100 to-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6 shadow-inner">
                                <Search size={48} />
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 mb-2">No matches found</h3>
                            <p className="text-slate-500 text-base mb-6 max-w-md text-center">
                                Try adjusting your search or filters to find what you're looking for.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setFilter("All");
                                }}
                                className="px-6 py-3.5 bg-linear-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )
                ) : (
                    // No saved jobs at all
                    <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200 shadow-sm">
                        <div className="w-24 h-24 bg-linear-to-br from-slate-100 to-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6 shadow-inner">
                            <Bookmark size={48} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 mb-2">No saved jobs yet</h3>
                        <p className="text-slate-500 text-base mb-6 max-w-md text-center">
                            Start building your collection by saving jobs that interest you!
                        </p>
                        <button
                            onClick={() => router.push("/home")}
                            className="px-6 py-3.5 bg-linear-to-r from-indigo-600 to-indigo-700 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center gap-2 group"
                        >
                            Browse Jobs
                            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                )}
            </main>
        </div>
    );
}