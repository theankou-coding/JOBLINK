"use client";

import { useState, useEffect } from "react";
import {
  Star,
  DollarSign,
  MapPin,
  Building,
  Eye,
  EyeOff,
  Edit2,
  Trash2,
  Search,
  Plus,
  Calendar,
  Users,
  Zap,
  Check,
  X,
  ArrowUpDown,
  Download,
  AlertCircle,
} from "lucide-react";

interface FeaturedJob {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  jobType: string;
  experienceLevel: string;
  isActive: boolean;
  isUrgent: boolean;
  isRemote: boolean;
  featuredUntil: string;
  featuredPosition: number;
  views: number;
  applications: number;
  postedDate: string;
  category: string;
  tags: string[];
}

export default function FeaturedJobsPage() {
  const [isLoading] = useState(true);
  const [featuredJobs, setFeaturedJobs] = useState<FeaturedJob[]>([]);
  const [filteredJobs] = useState<FeaturedJob[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all"); // all, active, expired
  const [sortBy, setSortBy] = useState<string>("position"); // position, views, applications, date
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentJob, setCurrentJob] = useState<FeaturedJob | null>(null);

  // Form states
  const [jobForm, setJobForm] = useState({
    jobId: "",
    featuredUntil: "",
    featuredPosition: 1,
    isUrgent: false,
    isActive: true,
  });

  // Mock data - in real app, fetch from API
  useEffect(() => {}, []);

  // Filter and sort jobs
  useEffect(() => {
    let result = [...featuredJobs];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus === "active") {
      result = result.filter(
        (job) => job.isActive && new Date(job.featuredUntil) >= new Date()
      );
    } else if (filterStatus === "expired") {
      result = result.filter(
        (job) => !job.isActive || new Date(job.featuredUntil) < new Date()
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "position":
          aValue = a.featuredPosition;
          bValue = b.featuredPosition;
          break;
        case "views":
          aValue = a.views;
          bValue = b.views;
          break;
        case "applications":
          aValue = a.applications;
          bValue = b.applications;
          break;
        case "date":
          aValue = new Date(a.postedDate).getTime();
          bValue = new Date(b.postedDate).getTime();
          break;
        default:
          aValue = a.featuredPosition;
          bValue = b.featuredPosition;
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [featuredJobs, searchTerm, filterStatus, sortBy, sortOrder]);

  // Handle job selection
  const handleSelectJob = (id: string) => {
    setSelectedJobs((prev) =>
      prev.includes(id) ? prev.filter((jobId) => jobId !== id) : [...prev, id]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedJobs.length === filteredJobs.length) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(filteredJobs.map((job) => job.id));
    }
  };

  // Open add modal
  const openAddModal = () => {
    setJobForm({
      jobId: "",
      featuredUntil: "",
      featuredPosition: filteredJobs.length + 1,
      isUrgent: false,
      isActive: true,
    });
    setShowAddModal(true);
  };

  // Open edit modal
  const openEditModal = (job: FeaturedJob) => {
    setCurrentJob(job);
    setJobForm({
      jobId: job.id,
      featuredUntil: job.featuredUntil,
      featuredPosition: job.featuredPosition,
      isUrgent: job.isUrgent,
      isActive: job.isActive,
    });
    setShowEditModal(true);
  };

  // Open delete modal
  const openDeleteModal = (job: FeaturedJob) => {
    setCurrentJob(job);
    setShowDeleteModal(true);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobForm.jobId) {
      alert("Please select a job");
      return;
    }

    if (!jobForm.featuredUntil) {
      alert("Featured until date is required");
      return;
    }

    if (showEditModal && currentJob) {
      // Update existing featured job
      setFeaturedJobs((prev) =>
        prev.map((job) =>
          job.id === currentJob.id
            ? {
                ...job,
                featuredUntil: jobForm.featuredUntil,
                featuredPosition: jobForm.featuredPosition,
                isUrgent: jobForm.isUrgent,
                isActive: jobForm.isActive,
              }
            : job
        )
      );
    } else {
      // Add new featured job - in real app, you'd fetch the job details
      const newJob: FeaturedJob = {
        id: `featured_${Date.now()}`,
        title: "New Featured Job",
        company: "Company Name",
        companyLogo: "/images/companies/default.png",
        location: "Phnom Penh",
        salary: { min: 1000, max: 2000, currency: "USD" },
        jobType: "Full-time",
        experienceLevel: "Mid-level",
        isActive: jobForm.isActive,
        isUrgent: jobForm.isUrgent,
        isRemote: false,
        featuredUntil: jobForm.featuredUntil,
        featuredPosition: jobForm.featuredPosition,
        views: 0,
        applications: 0,
        postedDate: new Date().toISOString().split("T")[0],
        category: "General",
        tags: ["Featured"],
      };
      setFeaturedJobs((prev) => [...prev, newJob]);
    }

    setShowAddModal(false);
    setShowEditModal(false);
    setCurrentJob(null);
  };

  // Handle delete
  const handleDelete = () => {
    if (currentJob) {
      setFeaturedJobs((prev) => prev.filter((job) => job.id !== currentJob.id));
      setShowDeleteModal(false);
      setCurrentJob(null);
      setSelectedJobs((prev) => prev.filter((id) => id !== currentJob.id));
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    switch (action) {
      case "activate":
        setFeaturedJobs((prev) =>
          prev.map((job) =>
            selectedJobs.includes(job.id) ? { ...job, isActive: true } : job
          )
        );
        break;
      case "deactivate":
        setFeaturedJobs((prev) =>
          prev.map((job) =>
            selectedJobs.includes(job.id) ? { ...job, isActive: false } : job
          )
        );
        break;
      case "delete":
        if (window.confirm(`Delete ${selectedJobs.length} featured jobs?`)) {
          setFeaturedJobs((prev) =>
            prev.filter((job) => !selectedJobs.includes(job.id))
          );
          setSelectedJobs([]);
        }
        break;
    }
  };

  // Toggle job status
  const toggleJobStatus = (id: string) => {
    setFeaturedJobs((prev) =>
      prev.map((job) =>
        job.id === id ? { ...job, isActive: !job.isActive } : job
      )
    );
  };

  // Format currency
  const formatCurrency = (amount: number, currency: string) => {
    if (currency === "USD") {
      return `$${amount.toLocaleString()}`;
    }
    return `${amount.toLocaleString()}៛`;
  };

  // Check if job is expired
  const isJobExpired = (date: string) => {
    return new Date(date) < new Date();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50/30 to-white">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
              Featured Jobs Management
            </h1>
            <p className="text-gray-600">
              Manage featured job listings and promotions
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:opacity-90 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Feature a Job
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">
                  Active Featured
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {
                    featuredJobs.filter(
                      (j) => j.isActive && !isJobExpired(j.featuredUntil)
                    ).length
                  }
                </div>
              </div>
              <Star className="w-8 h-8 text-amber-500/30" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Total Views</div>
                <div className="text-2xl font-bold text-gray-900">
                  {featuredJobs
                    .reduce((sum, job) => sum + job.views, 0)
                    .toLocaleString()}
                </div>
              </div>
              <Eye className="w-8 h-8 text-blue-500/30" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Applications</div>
                <div className="text-2xl font-bold text-gray-900">
                  {featuredJobs
                    .reduce((sum, job) => sum + job.applications, 0)
                    .toLocaleString()}
                </div>
              </div>
              <Users className="w-8 h-8 text-green-500/30" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Urgent Hiring</div>
                <div className="text-2xl font-bold text-red-600">
                  {featuredJobs.filter((j) => j.isUrgent).length}
                </div>
              </div>
              <Zap className="w-8 h-8 text-red-500/30" />
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl border border-blue-100 p-4 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search featured jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="all">All Status</option>
                <option value="active">Active Only</option>
                <option value="expired">Expired</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              >
                <option value="position">Sort by Position</option>
                <option value="views">Sort by Views</option>
                <option value="applications">Sort by Applications</option>
                <option value="date">Sort by Date</option>
              </select>

              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="px-3 py-2 border border-blue-200 rounded-lg hover:bg-blue-50"
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedJobs.length > 0 && (
            <div className="mt-4 pt-4 border-t border-blue-100 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                {selectedJobs.length} jobs selected
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction("activate")}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleBulkAction("deactivate")}
                  className="px-3 py-1 bg-amber-100 text-amber-700 rounded text-sm hover:bg-amber-200"
                >
                  Deactivate
                </button>
                <button
                  onClick={() => handleBulkAction("delete")}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                >
                  Remove Featured
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Featured Jobs Table */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading featured jobs...</p>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-blue-100">
            <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No featured jobs found
            </h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or add a featured job
            </p>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:opacity-90"
            >
              Feature Your First Job
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-blue-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="py-3 px-4 text-left">
                      <input
                        type="checkbox"
                        checked={
                          selectedJobs.length === filteredJobs.length &&
                          filteredJobs.length > 0
                        }
                        onChange={handleSelectAll}
                        className="rounded border-blue-300"
                      />
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                      Position
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                      Job Details
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                      Status
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                      Performance
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                      Featured Until
                    </th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredJobs.map((job) => {
                    const isExpired = isJobExpired(job.featuredUntil);
                    return (
                      <tr
                        key={job.id}
                        className="border-b border-blue-50 hover:bg-blue-50/50"
                      >
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={selectedJobs.includes(job.id)}
                            onChange={() => handleSelectJob(job.id)}
                            className="rounded border-blue-300"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                job.featuredPosition <= 3
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              <span className="font-bold">
                                {job.featuredPosition}
                              </span>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">
                                Position
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                #{job.featuredPosition}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                              <Building className="w-5 h-5 text-gray-500" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {job.title}
                              </h4>
                              <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                                <span className="flex items-center gap-1">
                                  <Building className="w-3 h-3" />
                                  {job.company}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {job.location}
                                </span>
                                <span className="flex items-center gap-1">
                                  <DollarSign className="w-3 h-3" />
                                  {formatCurrency(
                                    job.salary.min,
                                    job.salary.currency
                                  )}{" "}
                                  -{" "}
                                  {formatCurrency(
                                    job.salary.max,
                                    job.salary.currency
                                  )}
                                </span>
                              </div>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {job.tags.slice(0, 2).map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                                {job.tags.length > 2 && (
                                  <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                                    +{job.tags.length - 2}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-1">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                                job.isActive && !isExpired
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {job.isActive && !isExpired ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  Active
                                </>
                              ) : (
                                <>
                                  <X className="w-3 h-3" />
                                  {isExpired ? "Expired" : "Inactive"}
                                </>
                              )}
                            </span>
                            {job.isUrgent && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                                <Zap className="w-3 h-3" />
                                Urgent
                              </span>
                            )}
                            {job.isRemote && (
                              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                🌎 Remote
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="space-y-2">
                            <div>
                              <div className="text-xs text-gray-500">Views</div>
                              <div className="text-sm font-medium text-gray-900">
                                {job.views.toLocaleString()}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">
                                Applications
                              </div>
                              <div className="text-sm font-medium text-green-600">
                                {job.applications}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {job.featuredUntil}
                              </div>
                              <div className="text-xs text-gray-500">
                                {isExpired
                                  ? "Expired"
                                  : `${Math.ceil(
                                      (new Date(job.featuredUntil).getTime() -
                                        new Date().getTime()) /
                                        (1000 * 60 * 60 * 24)
                                    )} days left`}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleJobStatus(job.id)}
                              className={`p-1 rounded ${
                                job.isActive
                                  ? "text-green-600 hover:bg-green-50"
                                  : "text-gray-600 hover:bg-gray-100"
                              }`}
                              title={job.isActive ? "Deactivate" : "Activate"}
                            >
                              {job.isActive ? (
                                <Eye className="w-4 h-4" />
                              ) : (
                                <EyeOff className="w-4 h-4" />
                              )}
                            </button>
                            <button
                              onClick={() => openEditModal(job)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => openDeleteModal(job)}
                              className="p-1 text-red-600 hover:bg-red-50 rounded"
                              title="Remove Featured"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit Featured Job Modal */}
        {(showAddModal || showEditModal) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    {showEditModal ? "Edit Featured Job" : "Feature a Job"}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Job *
                      </label>
                      <select
                        value={jobForm.jobId}
                        onChange={(e) =>
                          setJobForm((prev) => ({
                            ...prev,
                            jobId: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        required
                      >
                        <option value="">Choose a job to feature</option>
                        {[
                          {
                            id: "job1",
                            title: "Senior Software Engineer - Phnom Penh Tech",
                          },
                          {
                            id: "job2",
                            title: "Marketing Manager - Sokha Hotels",
                          },
                          { id: "job3", title: "Finance Director - ABA Bank" },
                          {
                            id: "job4",
                            title: "UI/UX Designer - Design Studio",
                          },
                        ].map((job) => (
                          <option key={job.id} value={job.id}>
                            {job.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Featured Position
                      </label>
                      <select
                        value={jobForm.featuredPosition}
                        onChange={(e) =>
                          setJobForm((prev) => ({
                            ...prev,
                            featuredPosition: parseInt(e.target.value),
                          }))
                        }
                        className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num}>
                            Position #{num}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Featured Until *
                      </label>
                      <input
                        type="date"
                        value={jobForm.featuredUntil}
                        onChange={(e) =>
                          setJobForm((prev) => ({
                            ...prev,
                            featuredUntil: e.target.value,
                          }))
                        }
                        className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pricing Tier
                      </label>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border border-blue-200 rounded-lg">
                          <div>
                            <div className="font-medium">Standard</div>
                            <div className="text-sm text-gray-500">
                              7 days featured
                            </div>
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            $49
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-blue-200 rounded-lg bg-blue-50">
                          <div>
                            <div className="font-medium">Premium</div>
                            <div className="text-sm text-gray-500">
                              14 days featured
                            </div>
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            $89
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 border border-blue-200 rounded-lg">
                          <div>
                            <div className="font-medium">Enterprise</div>
                            <div className="text-sm text-gray-500">
                              30 days featured
                            </div>
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            $149
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={jobForm.isUrgent}
                          onChange={(e) =>
                            setJobForm((prev) => ({
                              ...prev,
                              isUrgent: e.target.checked,
                            }))
                          }
                          className="rounded border-blue-300 text-amber-500"
                        />
                        <div>
                          <div className="font-medium text-gray-700">
                            Mark as Urgent Hiring
                          </div>
                          <div className="text-sm text-gray-500">
                            Add urgent hiring badge
                          </div>
                        </div>
                      </label>

                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={jobForm.isActive}
                          onChange={(e) =>
                            setJobForm((prev) => ({
                              ...prev,
                              isActive: e.target.checked,
                            }))
                          }
                          className="rounded border-blue-300 text-blue-600"
                        />
                        <div>
                          <div className="font-medium text-gray-700">
                            Active Featured Job
                          </div>
                          <div className="text-sm text-gray-500">
                            Make job visible on platform
                          </div>
                        </div>
                      </label>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Featured Job Benefits
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          Appears at top of search results
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          Highlighted with premium badge
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          3x more views than regular jobs
                        </li>
                        <li className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500" />
                          Dedicated featured section
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddModal(false);
                        setShowEditModal(false);
                      }}
                      className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-3 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:opacity-90 font-medium"
                    >
                      {showEditModal
                        ? "Update Featured Job"
                        : "Feature Job ($49)"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && currentJob && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full">
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Remove Featured Status
                  </h2>
                  <p className="text-gray-600">
                    Are you sure you want to remove
                    <span className="font-semibold">
                      {currentJob.title}
                    </span>{" "}
                    from featured jobs?
                  </p>
                  <div className="mt-4 p-3 bg-amber-50 rounded-lg text-sm text-amber-700">
                    <p>
                      This will not delete the job, only remove its featured
                      status.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Remove Featured
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
