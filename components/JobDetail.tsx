"use client";

import React from "react";
import { 
  DollarSign, MapPin, Briefcase, Clock, Eye, 
  MessageSquare, Navigation, CheckCircle2 
} from "lucide-react";

export interface JobDetailProps {
  job: {
    id: number;
    postName: string;
    profileName: string;
    cardBackgroundImage: string;
    description: string;
    skills: string[];
    benefits: string[];
    schedule: string[];
    location: string;
  };
}

const JobDetail: React.FC<JobDetailProps> = ({ job }) => {
  return (
    <div className="flex flex-col gap-[15px] w-full bg-white p-[25px] rounded-[20px] shadow-sm mb-30">
      
      {/* HERO IMAGE SECTION */}
      <div className="relative w-full">
        <img 
          src={job.cardBackgroundImage} 
          className="w-full h-[260px] sm:h-[400px] object-cover rounded-[20px]" 
          alt="Job Hero" 
        />

        {/* RESPONSIVE PAGINATION */}
        <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 sm:gap-2.5">
          <div className="w-5 h-2 sm:w-[30px] sm:h-2.5 bg-white rounded-full"></div>
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white/70 rounded-full"></div>
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white/70 rounded-full"></div>
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white/70 rounded-full"></div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-[30px]">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col gap-6 grow">
          <div>
            <h1 className="font-bold text-[22px] sm:text-[25px] text-slate-700">
              {job.postName}
            </h1>
            <p className="mt-3 text-[14px] sm:text-[15px] text-slate-600 leading-relaxed">
              {job.description}
            </p>
            <p className="mt-2 text-[#4640de] font-medium text-[14px] sm:text-[15px]">
              Femboy Eatery
            </p>
          </div>

          {/* QUICK STATS */}
          <div className="flex justify-between items-center py-5 border-y border-slate-50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-[#d4e8db] rounded-full">
                <DollarSign size={20} className="text-[#2d6a4f]" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-slate-700">$500-$600</p>
                <p className="text-[10px] text-slate-400 uppercase">Salary</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center bg-[#f1e1d7] rounded-full">
                <MapPin size={20} className="text-[#bc6c25]" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-slate-700">{job.location}</p>
                <p className="text-[10px] text-slate-400 uppercase">Location</p>
              </div>
            </div>
          </div>

          {/* REQUIREMENTS */}
          <div className="space-y-6">
            <section>
              <h2 className="font-bold text-[18px] sm:text-[20px] text-slate-700 mb-3">
                Skill Requirement
              </h2>
              <ul className="grid grid-cols-1 gap-2">
                {job.skills.map((skill, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-600 text-[14px] sm:text-[15px]">
                    <CheckCircle2 size={16} className="text-green-500" /> {skill}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-bold text-[18px] sm:text-[20px] text-slate-700 mb-3">
                Where you’ll work
              </h2>
              <div className="relative h-[220px] sm:h-[300px] w-full bg-slate-100 rounded-[20px] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="flex items-center gap-2 bg-[#4640de] px-6 py-3 rounded-full text-white font-bold shadow-lg hover:scale-105 transition-transform">
                    <Navigation size={18} /> Get Direction
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="lg:w-[320px] shrink-0">
          <div className="sticky top-0 flex flex-col gap-5 p-5 bg-slate-50 rounded-[15px] border border-slate-100">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pinimg.com/736x/a0/ff/04/a0ff04247ab6645a1927ff361d5d0bbe.jpg"
                  className="w-12 h-12 rounded-full border-2 border-white"
                  alt="author"
                />
                <div>
                  <p className="font-bold text-slate-700">{job.profileName}</p>
                  <p className="text-[10px] text-slate-400 uppercase">Employer</p>
                </div>
              </div>

              <button className="text-[#4640de] p-2 bg-white rounded-full shadow-sm hover:bg-blue-50">
                <MessageSquare size={20} />
              </button>
            </div>

            <div className="py-2 px-4 bg-green-100 text-green-700 rounded-lg text-sm font-bold text-center">
              Status: Available
            </div>

            <button className="w-full py-4 bg-[#4640de] text-white rounded-full font-bold shadow-md hover:bg-[#3730a3] transition-colors">
              Apply Now
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobDetail;
