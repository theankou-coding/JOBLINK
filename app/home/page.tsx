"use client";

import React, {
  useEffect,
  useState,
  useMemo,
  useRef,
  useCallback,
} from "react";
import {
  Search,
  MapPin,
  ChevronDown,
  Briefcase,
  User,
  Layers,
  CircleDollarSign,
  Menu,
  X,
  Check,
  Filter,
} from "lucide-react";
import { rtdb } from "@/firebase/clientApp";
import { ref, onValue, get } from "firebase/database";
import JobCard from "@/components/JobCard";
import JobDetail from "@/components/JobDetail";

const PROVINCES = [
  "All",
  "Phnom Penh",
  "Siem Reap",
  "Sihanoukville",
  "Battambang",
  "Kampot",
  "Banteay Meanchey",
  "Kampong Cham",
  "Kampong Chhnang",
  "Kampong Speu",
  "Kampong Thom",
  "Kandal",
  "Kep",
  "Koh Kong",
  "Kratié",
  "Mondulkiri",
  "Oddar Meanchey",
  "Pailin",
  "Preah Vihear",
  "Prey Veng",
  "Pursat",
  "Ratanakiri",
  "Stung Treng",
  "Svay Rieng",
  "Takéo",
  "Tboung Khmum",
];
const JOB_TYPES = ["All Types", "On-site", "Remote", "Hybrid"];
const EXPERIENCE_LEVELS = [
  "All Experience",
  "No experience",
  "Junior",
  "Mid-level",
  "Senior",
];
const SALARY_RANGES = [
  "Any Salary",
  "$0 - $500",
  "$500 - $1000",
  "$1000 - $2000",
  "$2000+",
];
const CATEGORIES = [
  "All Categories",
  "Design",
  "Development",
  "Marketing",
  "Sales",
  "Customer Service",
];

export default function JobFeedPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [showFeed, setShowFeed] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [userProfiles, setUserProfiles] = useState<Record<string, any>>({});
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedJobType, setSelectedJobType] = useState("All Types");
  const [selectedExperience, setSelectedExperience] =
    useState("All Experience");
  const [selectedSalary, setSelectedSalary] = useState("Any Salary");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile filters when clicking outside on mobile
  useEffect(() => {
    if (!isMobile || !showMobileFilters) return;

    const handleClickOutsideMobile = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isFilterButton = target.closest(
        'button[aria-label="Toggle filters"]',
      );
      const isFilterContent = target.closest(".mobile-filter-content");

      if (!isFilterButton && !isFilterContent) {
        setShowMobileFilters(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideMobile);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideMobile);
  }, [isMobile, showMobileFilters]);

  // Fetch user profiles
  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        const profilesRef = ref(rtdb, "profiles");
        const snapshot = await get(profilesRef);

        if (snapshot.exists()) {
          const profiles = snapshot.val();
          setUserProfiles(profiles);
        }
      } catch (error) {
        console.error("Error fetching user profiles:", error);
      }
    };

    fetchUserProfiles();
  }, []);

  // Fetch jobs
  useEffect(() => {
    const postsRef = ref(rtdb, "posts");
    const unsubscribe = onValue(postsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const jobsData = Object.entries(data).map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ([key, value]: [string, any]) => {
            const date = value.timestamp
              ? new Date(value.timestamp).toLocaleDateString()
              : "Recently";

            const employerId = value.employerId;
            const userProfile = employerId ? userProfiles[employerId] : null;

            return {
              id: key,
              postName: value.title || "Untitled Position",
              title: value.title || "Untitled Position",
              businessName: value.businessName || "Company",

              profileName:
                userProfile?.username ||
                userProfile?.displayName ||
                value.authorName ||
                value.businessName ||
                "User",
              profileImage:
                userProfile?.photoURL ||
                userProfile?.profileImage ||
                value.authorPhoto ||
                null,

              employerId: employerId,

              cardBackgroundImage:
                value.images?.[0] ||
                "https://images.unsplash.com/photo-1497366216548-37526070297c",
              cardBackgroundImages: value.images || [],

              location: value.province || value.location || "Cambodia",
              province: value.province,

              postDate: date,
              timestamp: value.timestamp || 0,

              description: value.description || "",
              jobDescription: value.jobDescription || value.description || "",
              experience: value.experience || "No experience",
              timeCommitment: value.workplaceType || "Full-time",
              salaryRange: value.salary
                ? `${value.currency || "$"}${value.salary}`
                : "Negotiable",
              salary: value.salary,
              currency: value.currency || "USD",
              skills: value.otherRequirements ? [value.otherRequirements] : [],
              benefits: value.benefits || [],
              schedule: value.daysPerWeek
                ? [`${value.daysPerWeek} days/week`]
                : [],
              daysPerWeek: value.daysPerWeek,
              startTime: value.startTime,
              endTime: value.endTime,
              category: value.category,
              businessType: value.businessType,

              workplaceType: value.workplaceType,
              otherRequirements: value.otherRequirements,
              latitude: value.latitude,
              longitude: value.longitude,
              locationDescription: value.locationDescription,
              views: value.views || 0,

              authorName:
                value.authorName || userProfile?.username || "Employer",
              authorPhoto: value.authorPhoto || userProfile?.photoURL || null,
            };
          },
        );

        const sortedJobs = jobsData.sort((a, b) => b.timestamp - a.timestamp);
        setJobs(sortedJobs);
        if (sortedJobs.length > 0 && !selectedCardId)
          setSelectedCardId(sortedJobs[0].id);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [selectedCardId, userProfiles]);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSearch =
        job.postName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.profileName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation =
        selectedLocation === "All" || job.location?.includes(selectedLocation);
      const matchesType =
        selectedJobType === "All Types" ||
        job.timeCommitment === selectedJobType;
      const matchesExp =
        selectedExperience === "All Experience" ||
        job.experience === selectedExperience;
      const matchesCat =
        selectedCategory === "All Categories" ||
        job.category === selectedCategory;

      // Filter by salary range if selected
      let matchesSalary = true;
      if (selectedSalary !== "Any Salary" && job.salary) {
        const salary = parseFloat(job.salary);
        if (selectedSalary === "$0 - $500")
          matchesSalary = salary >= 0 && salary <= 500;
        else if (selectedSalary === "$500 - $1000")
          matchesSalary = salary > 500 && salary <= 1000;
        else if (selectedSalary === "$1000 - $2000")
          matchesSalary = salary > 1000 && salary <= 2000;
        else if (selectedSalary === "$2000+") matchesSalary = salary > 2000;
      }

      return (
        matchesSearch &&
        matchesLocation &&
        matchesType &&
        matchesExp &&
        matchesCat &&
        matchesSalary
      );
    });
  }, [
    jobs,
    searchQuery,
    selectedLocation,
    selectedJobType,
    selectedExperience,
    selectedCategory,
    selectedSalary,
  ]);

  const selectedJob = jobs.find((job) => job.id === selectedCardId);

  const renderFilter = useCallback(
    (
      id: string,
      label: string,
      currentVal: string,
      options: string[],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Icon: any,
    ) => (
      <div className="relative shrink-0">
        <button
          onClick={() => setActiveDropdown(activeDropdown === id ? null : id)}
          className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-full border text-[12px] sm:text-[13px] font-bold whitespace-nowrap active:scale-95 transition-all ${
            currentVal.includes("All") || currentVal.includes("Any")
              ? "border-gray-200 bg-white text-slate-700 hover:border-gray-300"
              : "border-indigo-600 bg-indigo-50 text-indigo-600 shadow-sm hover:border-indigo-700"
          }`}
          aria-label={`Filter by ${label}`}
          aria-expanded={activeDropdown === id}
        >
          <Icon size={13} className="sm:w-3.5 sm:h-3.5 shrink-0" />
          <span className="max-w-20 xs:max-w-[100px] sm:max-w-none truncate text-left">
            {currentVal.includes("All") || currentVal.includes("Any")
              ? label
              : currentVal}
          </span>
          <ChevronDown
            size={12}
            className={`transition-transform shrink-0 ${activeDropdown === id ? "rotate-180" : ""}`}
          />
        </button>

        {activeDropdown === id && (
          <div className="fixed md:absolute inset-0 md:inset-auto top-0 md:top-full left-0 md:left-auto right-0 md:right-auto mt-0 md:mt-2 w-full md:w-56 bg-white border border-gray-100 rounded-none md:rounded-2xl shadow-2xl z-50 py-2 max-h-[calc(100vh-80px)] md:max-h-96 overflow-y-auto overscroll-contain">
            <div className="flex items-center justify-between p-4 border-b md:hidden sticky top-0 bg-white z-10">
              <h3 className="font-bold text-lg">{label}</h3>
              <button
                onClick={() => setActiveDropdown(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Close filter"
              >
                <X size={20} />
              </button>
            </div>
            <div className="pt-1 md:pt-0">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    if (id === "type") setSelectedJobType(opt);
                    if (id === "exp") setSelectedExperience(opt);
                    if (id === "sal") setSelectedSalary(opt);
                    if (id === "cat") setSelectedCategory(opt);
                    setActiveDropdown(null);
                  }}
                  className="w-full px-4 py-3 text-left text-sm font-medium hover:bg-indigo-50 flex items-center justify-between transition-colors"
                  aria-label={`Select ${opt}`}
                >
                  <span
                    className={
                      currentVal === opt
                        ? "text-indigo-600 font-bold"
                        : "text-slate-600"
                    }
                  >
                    {opt}
                  </span>
                  {currentVal === opt && (
                    <Check size={14} className="text-indigo-600 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    ),
    [activeDropdown],
  );

  return (
    <div
      className="flex flex-col  bg-gray-50 w-full overflow-hidden"
      ref={dropdownRef}
    >
      {/* Header Section */}
      <header className="bg-white shadow-sm shrink-0 z-40 border-b border-gray-100">
        <div className="flex flex-col gap-3 px-4 md:px-6 lg:px-8 py-4">
          {/* Top Row: Search and Location */}
          <div className="flex items-center gap-3 w-full">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors shrink-0"
              onClick={() => setShowFeed(!showFeed)}
              aria-label={showFeed ? "Close job feed" : "Open job feed"}
            >
              {showFeed ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Search Input */}
            <div className="flex items-center gap-3 grow px-4 py-2.5 border border-gray-200 rounded-full bg-gray-50/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search job title or company..."
                className="outline-none py-0.5 w-full bg-transparent font-medium text-sm sm:text-base placeholder-gray-400"
                aria-label="Search jobs"
              />
              {/* Mobile Filter Button */}
              <button
                className="lg:hidden p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                aria-label={showMobileFilters ? "Hide filters" : "Show filters"}
              >
                <Filter size={18} />
              </button>
            </div>

            {/* Location Filter - Desktop */}
            <div className="hidden sm:block relative w-64">
              <button
                onClick={() =>
                  setActiveDropdown(activeDropdown === "loc" ? null : "loc")
                }
                className="flex items-center gap-3 w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 hover:bg-white transition-all text-left"
                aria-label="Select location"
                aria-expanded={activeDropdown === "loc"}
              >
                <MapPin className="w-5 h-5 text-indigo-600 shrink-0" />
                <span className="flex-1 text-sm font-semibold text-slate-700 truncate text-left">
                  {selectedLocation === "All"
                    ? "All Locations"
                    : selectedLocation}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ${activeDropdown === "loc" ? "rotate-180" : ""}`}
                />
              </button>
              {activeDropdown === "loc" && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 py-2 max-h-96 overflow-y-auto overscroll-contain">
                  {PROVINCES.map((prov) => (
                    <button
                      key={prov}
                      onClick={() => {
                        setSelectedLocation(prov);
                        setActiveDropdown(null);
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm font-medium hover:bg-indigo-50 flex items-center justify-between transition-colors"
                      aria-label={`Select ${prov}`}
                    >
                      <span
                        className={
                          selectedLocation === prov
                            ? "text-indigo-600 font-bold"
                            : "text-slate-600"
                        }
                      >
                        {prov}
                      </span>
                      {selectedLocation === prov && (
                        <Check size={16} className="text-indigo-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Location Dropdown */}
          <div className="sm:hidden">
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === "loc" ? null : "loc")
              }
              className="flex items-center gap-3 w-full px-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50/50 hover:bg-white transition-all text-left"
              aria-label="Select location"
              aria-expanded={activeDropdown === "loc"}
            >
              <MapPin className="w-5 h-5 text-indigo-600 shrink-0" />
              <span className="flex-1 text-sm font-semibold text-slate-700 truncate text-left">
                {selectedLocation === "All"
                  ? "All Locations"
                  : selectedLocation}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform shrink-0 ${activeDropdown === "loc" ? "rotate-180" : ""}`}
              />
            </button>

            {activeDropdown === "loc" && (
              <div className="fixed inset-0 top-0 left-0 right-0 mt-0 w-full bg-white border border-gray-100 rounded-none shadow-2xl z-50 py-2 max-h-[calc(100vh-80px)] overflow-y-auto overscroll-contain">
                <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
                  <h3 className="font-bold text-lg">Location</h3>
                  <button
                    onClick={() => setActiveDropdown(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="Close location filter"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="pt-1">
                  {PROVINCES.map((prov) => (
                    <button
                      key={prov}
                      onClick={() => {
                        setSelectedLocation(prov);
                        setActiveDropdown(null);
                      }}
                      className="w-full px-4 py-3 text-left text-sm font-medium hover:bg-indigo-50 flex items-center justify-between transition-colors"
                      aria-label={`Select ${prov}`}
                    >
                      <span
                        className={
                          selectedLocation === prov
                            ? "text-indigo-600 font-bold"
                            : "text-slate-600"
                        }
                      >
                        {prov}
                      </span>
                      {selectedLocation === prov && (
                        <Check size={14} className="text-indigo-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Filter Chips Row - Desktop */}
          <div className="hidden md:flex flex-row items-center gap-2 pb-1">
            {renderFilter(
              "type",
              "Job Type",
              selectedJobType,
              JOB_TYPES,
              Briefcase,
            )}
            {renderFilter(
              "exp",
              "Experience",
              selectedExperience,
              EXPERIENCE_LEVELS,
              User,
            )}
            {renderFilter(
              "sal",
              "Salary",
              selectedSalary,
              SALARY_RANGES,
              CircleDollarSign,
            )}
            {renderFilter(
              "cat",
              "Category",
              selectedCategory,
              CATEGORIES,
              Layers,
            )}
          </div>

          {/* Mobile Filter Panel */}
          {showMobileFilters && isMobile && (
            <div className="md:hidden mobile-filter-content flex flex-col gap-3 p-4 bg-white border border-gray-200 rounded-xl mt-2 shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {renderFilter(
                  "type",
                  "Job Type",
                  selectedJobType,
                  JOB_TYPES,
                  Briefcase,
                )}
                {renderFilter(
                  "exp",
                  "Experience",
                  selectedExperience,
                  EXPERIENCE_LEVELS,
                  User,
                )}
                {renderFilter(
                  "sal",
                  "Salary",
                  selectedSalary,
                  SALARY_RANGES,
                  CircleDollarSign,
                )}
                {renderFilter(
                  "cat",
                  "Category",
                  selectedCategory,
                  CATEGORIES,
                  Layers,
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-1 overflow-hidden">
        {/* Job Feed Sidebar */}
        <aside
          className={`
            fixed lg:relative top-0 left-0 h-full bg-white border-r border-gray-200 z-30 
            w-full lg:w-112.5 xl:w-125 shrink-0 
            transform transition-transform duration-300 ease-in-out
            ${showFeed ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            shadow-xl lg:shadow-none
            ${activeDropdown ? "overflow-hidden" : ""}
          `}
        >
          <div className="flex flex-col h-full">
            {/* Feed Header */}
            <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
              <h3 className="text-lg font-bold text-black tracking-tight">
                Job Feed
              </h3>
              <span className="text-[11px] font-bold px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md uppercase">
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1 ? "Job" : "Jobs"}
              </span>
            </div>

            {/* Feed Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 no-scrollbar">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-11">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
                  <p className="text-gray-500 text-sm">Loading jobs...</p>
                </div>
              ) : filteredJobs.length > 0 ? (
                <div className="space-y-3">
                  {filteredJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      {...job}
                      isSelected={selectedCardId === job.id}
                      onClick={() => {
                        setSelectedCardId(job.id);
                        if (window.innerWidth < 1024) setShowFeed(false);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                  <Briefcase className="w-12 h-12 text-gray-300 mb-3" />
                  <p className="text-gray-500 font-medium">No jobs found</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Try adjusting your filters
                  </p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {showFeed && (
          <div
            className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-20 transition-opacity"
            onClick={() => setShowFeed(false)}
            aria-hidden="true"
          />
        )}

        {/* Job Detail Section */}
        <section className="flex-1 overflow-y-auto bg-[#F8F9FB] min-w-0">
          <div className="w-full h-full">
            {selectedJob ? (
              <JobDetail {...selectedJob} />
            ) : !loading ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4 p-8 text-center">
                <Briefcase size={64} className="opacity-20" />
                <p className="font-bold uppercase tracking-widest text-sm">
                  Select a job to view details
                </p>
                <p className="text-sm text-gray-400 max-w-md">
                  Choose a job from the feed to see detailed information,
                  requirements, and how to apply.
                </p>
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}
