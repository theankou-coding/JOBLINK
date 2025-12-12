"use client";

import React, { useState } from "react";
import {
  Search,
  MapPin,
  ChevronDown,
  User,
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
    cardBackgroundImage:
      "https://i.pinimg.com/736x/ce/af/e3/ceafe34936d464b01d140e3491634210.jpg",
    location: "Tram Kak, Takeo",
    description:
      "Looking for a friendly and responsible waitress to join our family-run restaurant in Phnom Penh...",
    skills: [
      "Friendly, polite, customer-focused",
      "Basic communication in Khmer / English",
      "Food service experience preferred",
      "Punctual and reliable",
    ],
    benefits: ["Free meals during shifts", "Monthly bonus"],
    schedule: ["12 hours per day", "7 days per week", "Flexible days off"],
    onClick: () => {},
    isSelected: false,
  },
  {
    id: 2,
    postName: "Assistant Chef Position",
    profileName: "Ryoo",
    cardBackgroundImage:
      "https://i.pinimg.com/736x/a0/ff/04/a0ff04247ab6645a1927ff361d5d0bbe.jpg",
    location: "Phnom Penh, Cambodia",
    description:
      "Seeking a passionate Assistant Chef to support our Head Chef.",
    skills: [
      "Culinary degree or equivalent experience",
      "Strong organizational skills",
      "Ability to work under pressure",
      "Team player",
    ],
    benefits: ["Performance-based bonuses", "Training opportunities"],
    schedule: ["8 hours per day", "5 days per week", "Fixed weekends off"],
    onClick: () => {},
    isSelected: false,
  },
  {
    id: 3,
    postName: "Cashier/Host",
    profileName: "Ryoo",
    cardBackgroundImage:
      "https://i.pinimg.com/736x/c8/9e/32/c89e324154f96fdcd0d1786bceb8732a.jpg",
    location: "Siem Reap, Cambodia",
    description:
      "Front-of-house role combining cashier duties and hosting guests...",
    skills: [
      "Excellent communication skills",
      "Customer service experience",
      "Proficiency in POS systems",
      "Basic math skills",
    ],
    benefits: ["Tips sharing", "Health insurance options"],
    schedule: ["10 hours per day", "6 days per week", "Rotating day off"],
    onClick: () => {},
    isSelected: false,
  },
];

const HomePage = () => {
  const [selectedCardId, setSelectedCardId] = useState<number>(mockJobs[0].id);
  const selectedJob = mockJobs.find((job) => job.id === selectedCardId);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full">
      {/* NAVIGATION */}
      <header className="w-full flex justify-between items-center bg-white px-12 py-4 shadow-md z-20">
        <div className="flex items-center gap-[50px]">
          <img
            className="w-[100px] object-cover"
            src="/images/logo.png"
            alt="Logo"
          />
          <nav className="flex justify-center items-center gap-[25px]">
            <span className="font-bold text-[20px] text-blue-600">Home</span>
            <span className="font-bold text-[20px] text-slate-700 hover:text-blue-600 cursor-pointer">
              For you
            </span>
            <span className="font-bold text-[20px] text-slate-700 hover:text-blue-600 cursor-pointer">
              Create Job
            </span>
            <span className="font-bold text-[20px] text-slate-700 hover:text-blue-600 cursor-pointer">
              Saved
            </span>
            <span className="font-bold text-[20px] text-slate-700 hover:text-blue-600 cursor-pointer">
              My Dashboard
            </span>
          </nav>
        </div>

        <div className="w-[50px] h-[50px] flex justify-center items-center">
          <div className="w-[44px] h-[44px] flex justify-center items-center p-0.5 rounded-full border border-[#dadada] cursor-pointer hover:bg-gray-100">
            <User className="w-6 h-6 text-gray-700" />
          </div>
        </div>
      </header>

      {/* FILTERS */}
      <div className="flex flex-col gap-4 px-[100px] py-5 bg-white shadow-sm mb-4">
        {/* Search Bar */}
        <div className="flex gap-5">
          <div className="flex items-center gap-4 grow px-4 border border-[#d6ddeb] rounded-lg">
            <Search className="w-6 h-6 text-gray-500" />
            <input
              type="text"
              placeholder="Job title or keyword"
              className="outline-none text-lg text-[#202430] py-2"
            />
          </div>

          <div className="flex items-center gap-4 grow pl-2 pr-6 border border-[#d6ddeb] rounded-lg">
            <MapPin className="w-6 h-6 text-gray-500" />
            <div className="flex justify-between items-center w-full">
              <span className="text-[#7c8493] text-[16px]">Tram Kak, Takeo</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-5">
          {["Employment Type", "Experience", "Category", "Salary Range"].map(
            (label) => (
              <div
                key={label}
                className="flex items-center gap-2.5 px-5 py-2.5 rounded-[35px] border border-[#c2c2c2]"
              >
                <div className="w-[30px] h-[30px]" />
                <span className="text-[16px] text-[#202430] opacity-90">
                  {label}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="flex-grow flex flex-row w-full overflow-hidden">
        {/* LEFT JOB LIST */}
        <div className="w-96 flex flex-col space-y-4 p-4 border-r border-gray-200 overflow-y-auto shrink-0 bg-gray-50">
          <h3 className="text-xl font-bold sticky top-0 bg-gray-50 pb-2 z-10">
            Job Feed
          </h3>

          {mockJobs.map((job) => (
            <JobCard
              key={job.id}
              {...job}
              cardColor={selectedCardId === job.id ? "#D3F500" : "#FFFFFF"}
              onClick={setSelectedCardId}
              isSelected={selectedCardId === job.id}
            />
          ))}
        </div>

        {/* RIGHT JOB DETAILS */}
        <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
          <h3 className="text-xl font-bold sticky top-0 bg-gray-50 pb-2 z-10">
            Job Details
          </h3>

          {selectedJob ? (
            <JobDetail job={selectedJob} />
          ) : (
            <div className="p-8 text-gray-500 bg-white rounded-xl shadow-xl">
              Select a job from the feed to view its full details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
