// jobs/page.tsx (Assuming this is your main job feed page)
"use client";

import React, { useState } from "react";
// Assuming JobCard and JobDetail are correctly imported based on your project structure
import JobCard, { JobCardProps } from "@/components/JobCard"; 
import JobDetail from "@/components/JobDetail";

// Define the full Job type for TypeScript
export interface Job extends JobCardProps {
    // Adding fields needed for the JobDetail component
    location: string;
    description: string;
    skills: string[];
    benefits: string[];
    schedule: string[];
    // Other fields from JobCardProps are inherited
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
            "Looking for a friendly and responsible waitress to join our family-run restaurant in Phnom Penh. We value teamwork, good communication, and a positive attitude toward customers. If you enjoy working in a lively local setting, apply now!",
        skills: ["Friendly, polite, customer-focused", "Basic communication in Khmer / English", "Food service experience preferred", "Punctual and reliable"],
        benefits: ["Free meals during shifts", "Monthly bonus"],
        schedule: ["12 hours per day", "7 days per week", "Flexible days off"],
        onClick: (id: number) => {}, // Dummy functions needed for JobCardProps
        isSelected: false,
    },
    {
        id: 2,
        postName: "Assistant Chef Position",
        profileName: "Ryoo",
        cardBackgroundImage:
            "https://i.pinimg.com/736x/a0/ff/04/a0ff04247ab6645a1927ff361d5d0bbe.jpg",
        location: "Phnom Penh, Cambodia",
        description: "Seeking a passionate Assistant Chef to support our Head Chef. Must have knowledge of local and international cuisine preparation. Great opportunity for growth!",
        skills: ["Culinary degree or equivalent experience", "Strong organizational skills", "Ability to work under pressure", "Team player"],
        benefits: ["Performance-based bonuses", "Training opportunities"],
        schedule: ["8 hours per day", "5 days per week", "Fixed weekends off"],
        onClick: (id: number) => {},
        isSelected: false,
    },
    {
        id: 3,
        postName: "Cashier/Host",
        profileName: "Ryoo",
        cardBackgroundImage:
            "https://i.pinimg.com/736x/c8/9e/32/c89e324154f96fdcd0d1786bceb8732a.jpg",
        location: "Siem Reap, Cambodia",
        description: "Front-of-house role combining cashier duties and hosting guests. Excellent customer service skills are a must. Experience with POS systems preferred.",
        skills: ["Excellent communication skills", "Customer service experience", "Proficiency in POS systems", "Basic math skills"],
        benefits: ["Tips sharing", "Health insurance options"],
        schedule: ["10 hours per day", "6 days per week", "Rotating day off"],
        onClick: (id: number) => {},
        isSelected: false,
    },
];

const JobFeedPage = () => {
    const [selectedCardId, setSelectedCardId] = useState<number>(mockJobs[0].id);

    // Find the currently selected job object
    const selectedJob = mockJobs.find((job) => job.id === selectedCardId);

    return (
        <div className="min-h-screen bg-gray-50 p-8 flex space-x-8">
            {/* Job Feed List (Left Panel) */}
            <div className="flex flex-col space-y-4 w-96 sticky top-0 h-full"> {/* Added sticky/h-full for better layout */}
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Job Feed</h3>

                {mockJobs.map((job) => {
                    // Simple color logic: selected is yellow, others are white.
                    const cardColor = selectedCardId === job.id ? "#D3F500" : "#FFFFFF";

                    return (
                        <JobCard
                            key={job.id}
                            {...job}
                            // Ensure JobCard gets all required props for TS
                            cardColor={cardColor}
                            onClick={setSelectedCardId}
                            isSelected={selectedCardId === job.id}
                        />
                    );
                })}
            </div>

            {/* Job Details Panel (Right Panel) */}
            <div className="flex-grow">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Job Details</h3>

                {selectedJob ? (
                    // Pass the full selectedJob object to JobDetail
                    <JobDetail job={selectedJob} />
                ) : (
                    <div className="card w-full bg-white shadow-xl p-8 rounded-xl border-4 border-gray-200">
                        <p className="text-gray-500">Select a job from the feed to view its full details.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobFeedPage;