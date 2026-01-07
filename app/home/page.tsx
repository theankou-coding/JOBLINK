"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  ChevronDown,
  Briefcase,
  User,
  Layers,
  CircleDollarSign,
  Menu,
  X
} from "lucide-react";
import JobCard, { JobCardProps } from "@/components/JobCard";
import JobDetail from "@/components/JobDetail";

export interface Job extends JobCardProps {
  location: string;
  description: string;
  skills: string[];
  benefits: string[];
  schedule: string[];
}

const mockJobs: Job[] = [
  {
    id: 1,
    postName: "Looking for a waitress",
    profileName: "Ryoo",
    cardBackgroundImage: "https://i.pinimg.com/736x/ce/af/e3/ceafe34936d464b01d140e3491634210.jpg",
    location: "Tram Kak, Takeo",
    description: "Looking for a friendly and responsible waitress to join our family-run restaurant in Phnom Penh...",
    skills: ["Friendly, polite, customer-focused", "Basic communication in Khmer / English", "Food service experience preferred", "Punctual and reliable"],
    benefits: ["Free meals during shifts", "Monthly bonus"],
    schedule: ["12 hours per day", "7 days per week", "Flexible days off"],
    onClick: () => { },
    isSelected: false,
  },
  {
    id: 2,
    postName: "Assistant Chef Position",
    profileName: "Ryoo",
    cardBackgroundImage: "https://i.pinimg.com/736x/a0/ff/04/a0ff04247ab6645a1927ff361d5d0bbe.jpg",
    location: "Phnom Penh, Cambodia",
    description: "Seeking a passionate Assistant Chef to support our Head Chef.",
    skills: ["Culinary degree or equivalent experience", "Strong organizational skills", "Ability to work under pressure", "Team player"],
    benefits: ["Performance-based bonuses", "Training opportunities"],
    schedule: ["8 hours per day", "5 days per week", "Fixed weekends off"],
    onClick: () => { },
    isSelected: false,
  },
  {
    id: 3,
    postName: "Cashier/Host",
    profileName: "Ryoo",
    cardBackgroundImage: "https://i.pinimg.com/736x/c8/9e/32/c89e324154f96fdcd0d1786bceb8732a.jpg",
    location: "Siem Reap, Cambodia",
    description: "Front-of-house role combining cashier duties and hosting guests...",
    skills: ["Excellent communication skills", "Customer service experience", "Proficiency in POS systems", "Basic math skills"],
    benefits: ["Tips sharing", "Health insurance options"],
    schedule: ["10 hours per day", "6 days per week", "Rotating day off"],
    onClick: () => { },
    isSelected: false,
  },
];

export default function HomePage() {
  const [selectedCardId, setSelectedCardId] = useState<number>(mockJobs[0].id);
  const [showFeed, setShowFeed] = useState<boolean>(false);
  const selectedJob = mockJobs.find((job) => job.id === selectedCardId);

  return (
    <div className="flex flex-col h-screen min-h-screen bg-gray-50 w-full overflow-hidden">

      {/* --- RESPONSIVE NAVIGATION & FILTERS --- */}
      <header className="bg-white shadow-sm shrink-0 z-50 border-b border-gray-100">
        <div className="flex flex-col gap-4 px-4 md:px-6 lg:px-[100px] py-4">

          {/* Top Bar: Menu + Search + Location */}
          <div className="flex items-center gap-3">
            {/* Mobile Toggle */}
            <button
              className="lg:hidden p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-[#D3F500] hover:text-black transition-all"
              onClick={() => setShowFeed(!showFeed)}
              aria-label="Toggle Menu"
            >
              {showFeed ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Main Search Input */}
            <div className="flex items-center gap-3 grow px-4 border border-gray-200 rounded-xl bg-gray-50/50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#4640de]/10 transition-all">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Job title or keywords..."
                className="outline-none text-sm md:text-base py-2 w-full bg-transparent"
              />
            </div>

            {/* Desktop-only Location */}
            <div className="hidden md:flex items-center gap-3 grow px-4 border border-gray-200 rounded-xl bg-gray-50/50">
              <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Location..."
                className="outline-none text-sm py-2 w-full bg-transparent"
              />
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Horizontal Scrolling Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { label: "Job Type", icon: Briefcase },
              { label: "Experience", icon: User },
              { label: "Salary", icon: CircleDollarSign },
              { label: "Category", icon: Layers },
              { label: "Remote", icon: MapPin },
            ].map((filter) => (
              <button
                key={filter.label}
                className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-gray-200 bg-white whitespace-nowrap hover:border-[#4640de] transition-colors group active:scale-95"
              >
                <filter.icon className="w-3.5 h-3.5 text-gray-500 group-hover:text-[#4640de]" />
                <span className="text-[13px] font-medium text-slate-700">{filter.label}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex flex-row flex-grow overflow-hidden relative">

        {/* LEFT JOB FEED: Overlay on mobile, Sidebar on desktop */}
        {showFeed && (
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden transition-opacity"
            onClick={() => setShowFeed(false)}
          />
        )}

        <aside
          className={`
            absolute lg:relative top-0 left-0 h-full bg-white border-r border-gray-200 overflow-y-auto z-40
            w-[85%] sm:w-[380px] lg:w-[400px] xl:w-[450px]
            transform transition-transform duration-300 cubic-bezier(0.4, 0, 0.2, 1)
            ${showFeed ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <div className="p-4 lg:p-6 space-y-4">
            <div className="flex items-center justify-between sticky top-0 bg-white pb-3 z-10 border-b border-gray-50">
              <h3 className="text-lg font-bold text-slate-800">Job Feed</h3>
              <div className="text-[11px] font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded-md uppercase tracking-wider">
                {mockJobs.length} Results
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {mockJobs.map((job) => (
                <JobCard
                  key={job.id}
                  {...job}
                  cardColor={selectedCardId === job.id ? "#D3F500" : "#FFFFFF"}
                  onClick={() => {
                    setSelectedCardId(job.id);
                    if (window.innerWidth < 1024) setShowFeed(false);
                  }}
                  isSelected={selectedCardId === job.id}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* RIGHT JOB DETAILS: Full height scrolling */}
        <section className="flex-grow overflow-y-auto bg-gray-50 scroll-smooth">
          <div className="p-4 sm:p-8 lg:p-10 max-w-4xl mx-auto">
            {selectedJob ? (
              <JobDetail job={selectedJob} />
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-slate-400">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                  <Briefcase size={28} className="opacity-20" />
                </div>
                <p className="text-sm font-medium">Select a job from the list to view details</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* CSS Utility for hiding scrollbar on the filter tray */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}