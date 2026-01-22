"use client";

import React from "react";
import ForYouPage from "@/components/ForYouPage"; // Adjust path based on where you saved the previous code

export default function SavedPage() {
  return (
    <div className="w-full">
      {/* We wrap the ForYouPage component here. 
          The 'SavedLayout' will automatically wrap this content 
          providing the #F8F9FB background and no-scrollbar container.
      */}
      <ForYouPage />
    </div>
  );
}