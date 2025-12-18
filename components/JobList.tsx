"use client";

import { useState } from "react";
import JobCard from "@/components/JobCard";

const mockJobs = [
  {
    id: 1,
    postName: "Looking for a waitress",
    profileName: "Ryoo",
    cardBackgroundImage: "https://i.pinimg.com/736x/ce/af/e3/ceafe34936d464b01d140e3491634210.jpg",
  },
  {
    id: 2,
    postName: "Assistant Chef Position",
    profileName: "Ryoo",
    cardBackgroundImage: "https://daisyui.com/images/stock/photo-1572569511254-d8f925fe2c4c.jpg",
  },
  {
    id: 3,
    postName: "Cashier/Host",
    profileName: "Ryoo",
    cardBackgroundImage: "https://daisyui.com/images/stock/photo-1499623861536-e820610f6888.jpg",
  },
];

export default function JobList() {
  const [selectedId, setSelectedId] = useState<number | null>(1); // Start with first card selected

  const handleCardClick = (id: number) => {
    setSelectedId(id);
  };

  return (
    <div className="flex flex-col gap-4">
      {mockJobs.map((job, index) => {
        const isSelected = selectedId === job.id;
        const isFirstCard = index === 0;
        
        // Determine card color
        let cardColor = "#FFFFFF"; // Default to white
        
        if (isSelected) {
          cardColor = "#D3F500"; // Selected card is green
        } else if (isFirstCard && selectedId === null) {
          cardColor = "#D3F500"; // First card is green when nothing is selected
        }
        // All other cases remain white

        return (
          <JobCard
            key={job.id}
            id={job.id}
            postName={job.postName}
            profileName={job.profileName}
            cardBackgroundImage={job.cardBackgroundImage}
            location="Tram Kak, Takeo"
            postDate="12 hours ago"
            description="Looking for a friendly and responsible waitress to join our small family-run restaurant in Phnom Penh. We value teamwork, good communication, and a positive attitude toward customers."
            companyName="Femboy Eatery"
            experience="1 years experience+"
            timeCommitment="Full time"
            salaryRange="$500 - $600"
            siteType="On site"
            cardColor={cardColor}
            onClick={handleCardClick}
            isSelected={isSelected}
          />
        );
      })}
    </div>
  );
}