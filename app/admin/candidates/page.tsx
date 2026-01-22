"use client";

import { useState } from "react";

import Image from "next/image";
import {
  Search,
  Filter,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Eye,
  Trash2,
  UserPlus,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Candidate {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  position: string;
  status: "active" | "pending" | "rejected" | "hired";
  experience: string;
  skills: string[];
  appliedDate: string;
  resumeUrl: string;
  rating: number;
  avatar: string;
}

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([
    {
      id: 1,
      name: "Sokha Chan",
      email: "sokha.chan@example.com",
      phone: "+855 12 345 678",
      location: "Phnom Penh",
      position: "Frontend Developer",
      status: "active",
      experience: "3 years",
      skills: ["React", "Next.js", "TypeScript", "Tailwind"],
      appliedDate: "2024-01-15",
      resumeUrl: "#",
      rating: 4.5,
      avatar: "/Images/avatar1.png",
    },
    {
      id: 2,
      name: "Bopha Lim",
      email: "bopha.lim@example.com",
      phone: "+855 23 456 789",
      location: "Siem Reap",
      position: "UX Designer",
      status: "pending",
      experience: "2 years",
      skills: ["Figma", "UI/UX", "Adobe XD", "Prototyping"],
      appliedDate: "2024-01-14",
      resumeUrl: "#",
      rating: 4.2,
      avatar: "/Images/avatar2.png",
    },
    {
      id: 3,
      name: "Ratha Kim",
      email: "ratha.kim@example.com",
      phone: "+855 34 567 890",
      location: "Battambang",
      position: "Backend Developer",
      status: "hired",
      experience: "5 years",
      skills: ["Node.js", "Python", "MongoDB", "AWS"],
      appliedDate: "2024-01-13",
      resumeUrl: "#",
      rating: 4.8,
      avatar: "/Images/avatar3.png",
    },
    {
      id: 4,
      name: "Srey Mom",
      email: "sreymom@example.com",
      phone: "+855 45 678 901",
      location: "Sihanoukville",
      position: "Marketing Manager",
      status: "rejected",
      experience: "4 years",
      skills: ["Digital Marketing", "SEO", "Social Media", "Analytics"],
      appliedDate: "2024-01-12",
      resumeUrl: "#",
      rating: 3.9,
      avatar: "/Images/avatar4.png",
    },
    {
      id: 5,
      name: "Vuthy Chea",
      email: "vuthy.chea@example.com",
      phone: "+855 56 789 012",
      location: "Kampong Cham",
      position: "Data Analyst",
      status: "active",
      experience: "2 years",
      skills: ["Python", "SQL", "Excel", "Tableau"],
      appliedDate: "2024-01-11",
      resumeUrl: "#",
      rating: 4.3,
      avatar: "/Images/avatar5.png",
    },
    {
      id: 6,
      name: "Chanthou Meas",
      email: "chanthou@example.com",
      phone: "+855 67 890 123",
      location: "Phnom Penh",
      position: "Project Manager",
      status: "pending",
      experience: "6 years",
      skills: ["Agile", "Scrum", "Jira", "Team Management"],
      appliedDate: "2024-01-10",
      resumeUrl: "#",
      rating: 4.7,
      avatar: "Images/avatar6.png",
    },
    {
      id: 7,
      name: "Dara Seng",
      email: "dara.seng@example.com",
      phone: "+855 78 901 234",
      location: "Takeo",
      position: "Mobile Developer",
      status: "active",
      experience: "3 years",
      skills: ["React Native", "Flutter", "iOS", "Android"],
      appliedDate: "2024-01-09",
      resumeUrl: "#",
      rating: 4.4,
      avatar: "/Images/avatar7.png",
    },
    {
      id: 8,
      name: "Sopheap Ly",
      email: "sopheap@example.com",
      phone: "+855 89 012 345",
      location: "Kampot",
      position: "Content Writer",
      status: "hired",
      experience: "2 years",
      skills: ["Writing", "SEO", "Blogging", "Editing"],
      appliedDate: "2024-01-08",
      resumeUrl: "#",
      rating: 4.1,
      avatar: "/Images/avatar8.png",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]);
  const itemsPerPage = 6;

  // Calculate pagination
  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" || candidate.status === selectedStatus;

    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some((skill) => candidate.skills.includes(skill));

    return matchesSearch && matchesStatus && matchesSkills;
  });

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCandidates = filteredCandidates.slice(startIndex, endIndex);

  // Status colors
  const statusColors = {
    active: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    rejected: "bg-red-100 text-red-800",
    hired: "bg-blue-100 text-blue-800",
  };

  // All unique skills from candidates
  const allSkills = Array.from(new Set(candidates.flatMap((c) => c.skills)));

  // Handle select/deselect all
  const handleSelectAll = () => {
    if (selectedCandidates.length === currentCandidates.length) {
      setSelectedCandidates([]);
    } else {
      setSelectedCandidates(currentCandidates.map((c) => c.id));
    }
  };

  // Handle single candidate selection
  const handleSelectCandidate = (id: number) => {
    setSelectedCandidates((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id],
    );
  };

  // Handle status change
  const handleStatusChange = (id: number, newStatus: Candidate["status"]) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === id ? { ...candidate, status: newStatus } : candidate,
      ),
    );
  };

  // Handle delete candidate
  const handleDeleteCandidate = (id: number) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      setCandidates((prev) => prev.filter((candidate) => candidate.id !== id));
      setSelectedCandidates((prev) => prev.filter((cid) => cid !== id));
    }
  };

  // Stats
  const stats = {
    total: candidates.length,
    active: candidates.filter((c) => c.status === "active").length,
    pending: candidates.filter((c) => c.status === "pending").length,
    hired: candidates.filter((c) => c.status === "hired").length,
    rejected: candidates.filter((c) => c.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Candidates</h1>
          <p className="text-gray-600 mt-1">
            Manage and review all candidate applications
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="h-4 w-4" />
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <UserPlus className="h-4 w-4" />
            Add Candidate
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Candidates</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.active}
              </p>
            </div>
            <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {stats.pending}
              </p>
            </div>
            <div className="h-12 w-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Hired</p>
              <p className="text-2xl font-bold text-blue-600">{stats.hired}</p>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Star className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Rejected</p>
              <p className="text-2xl font-bold text-red-600">
                {stats.rejected}
              </p>
            </div>
            <div className="h-12 w-12 bg-red-50 rounded-lg flex items-center justify-center">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Candidates
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or position..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Skills Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {allSkills.slice(0, 5).map((skill) => (
                <button
                  key={skill}
                  onClick={() =>
                    setSelectedSkills((prev) =>
                      prev.includes(skill)
                        ? prev.filter((s) => s !== skill)
                        : [...prev, skill],
                    )
                  }
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedSkills.includes(skill)
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {skill}
                </button>
              ))}
              {allSkills.length > 5 && (
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
                  +{allSkills.length - 5} more
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Clear Filters */}
        {(searchTerm ||
          selectedStatus !== "all" ||
          selectedSkills.length > 0) && (
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              {filteredCandidates.length} candidates found
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedStatus("all");
                setSelectedSkills([]);
              }}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* Candidates Table */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        {/* Table Header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={
                  selectedCandidates.length === currentCandidates.length &&
                  currentCandidates.length > 0
                }
                onChange={handleSelectAll}
                className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                {selectedCandidates.length} selected
              </span>
            </div>
            <div className="flex items-center gap-2">
              {selectedCandidates.length > 0 && (
                <>
                  <button className="px-3 py-1 text-sm text-green-600 hover:text-green-700">
                    <CheckCircle className="h-4 w-4 inline mr-1" />
                    Approve
                  </button>
                  <button className="px-3 py-1 text-sm text-red-600 hover:text-red-700">
                    <XCircle className="h-4 w-4 inline mr-1" />
                    Reject
                  </button>
                  <button className="px-3 py-1 text-sm text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4 inline mr-1" />
                    Delete
                  </button>
                </>
              )}
              <button className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-700">
                <Filter className="h-4 w-4" />
                Sort
              </button>
            </div>
          </div>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-gray-200">
          {currentCandidates.length > 0 ? (
            currentCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedCandidates.includes(candidate.id)}
                    onChange={() => handleSelectCandidate(candidate.id)}
                    className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  />

                  {/* Avatar */}
                  <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      {candidate.avatar ? (
                        <Image
                          src={candidate.avatar}
                          alt={candidate.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="text-lg font-semibold">
                          {candidate.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Candidate Info */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">
                            {candidate.name}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[candidate.status]}`}
                          >
                            {candidate.status.charAt(0).toUpperCase() +
                              candidate.status.slice(1)}
                          </span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm font-medium">
                              {candidate.rating}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">
                          {candidate.position}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          Applied on {candidate.appliedDate}
                        </p>
                        <p className="text-sm font-medium text-gray-700">
                          {candidate.experience} experience
                        </p>
                      </div>
                    </div>

                    {/* Contact & Skills */}
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span>{candidate.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span>{candidate.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span>{candidate.location}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 flex items-center gap-3">
                      <button className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100">
                        <Eye className="h-4 w-4" />
                        View Profile
                      </button>
                      <button className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-lg text-sm hover:bg-green-100">
                        <Mail className="h-4 w-4" />
                        Send Email
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(candidate.id, "hired")
                        }
                        className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm hover:bg-blue-100"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Hire
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(candidate.id, "rejected")
                        }
                        className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 rounded-lg text-sm hover:bg-red-100"
                      >
                        <XCircle className="h-4 w-4" />
                        Reject
                      </button>
                      <button
                        onClick={() => handleDeleteCandidate(candidate.id)}
                        className="flex items-center gap-1 px-3 py-1 bg-red-50 text-red-700 rounded-lg text-sm hover:bg-red-100 ml-auto"
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="h-16 w-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <UserPlus className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No candidates found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter to find what you are looking
                for.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span>{" "}
                  to{" "}
                  <span className="font-medium">
                    {Math.min(endIndex, filteredCandidates.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium">
                    {filteredCandidates.length}
                  </span>{" "}
                  candidates
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-3 py-1 rounded-lg ${
                        currentPage === pageNum
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="bg-white p-6 rounded-xl shadow border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Candidate Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
            <p className="text-sm text-gray-600">Active Applications</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {Math.round((stats.hired / stats.total) * 100)}%
            </p>
            <p className="text-sm text-gray-600">Hire Rate</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">7 days</p>
            <p className="text-sm text-gray-600">Avg. Response Time</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">4.3</p>
            <p className="text-sm text-gray-600">Avg. Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
}
