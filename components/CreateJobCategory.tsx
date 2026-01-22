"use client";
import React from "react";
import {
  Clock,
  Users,
  Globe, // Changed for Remote
  Briefcase,
  ChevronRight,
  ChevronLeft,
  GraduationCap, // Changed for Internship
  MoreHorizontal, // Changed for Other
} from "lucide-react";

type CreateJobCategoryProps = {
  category: string;
  setCategory: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function CreateJobCategory({
  category,
  setCategory,
  onNext,
  onBack,
}: CreateJobCategoryProps) {
  const STEP = 1;
  const TOTAL = 6;
  const progress = (STEP / TOTAL) * 100;

  // Updated IDs to match standard Firebase/Database naming conventions
  const categories = [
    { id: "full_time", label: "Full-time", icon: Clock },
    { id: "part_time", label: "Part-time", icon: Clock },
    { id: "remote", label: "Remote", icon: Globe },
    { id: "internship", label: "Internship", icon: GraduationCap },
    { id: "freelance", label: "Freelance", icon: Briefcase },
    { id: "other", label: "Other", icon: MoreHorizontal },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      {/* CONTENT */}
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-6 pt-14">
          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
              Choose a job category
            </h1>
            <p className="mt-3 text-base text-slate-500 max-w-xl">
              Select the type of work you’re offering.
            </p>

            {/* PROGRESS */}
            <div className="mt-6">
              <div className="flex justify-between text-xs font-medium text-slate-400 mb-2">
                <span>Step {STEP}</span>
                <span>
                  {STEP} of {TOTAL}
                </span>
              </div>
              <div className="h-[3px] bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-br from-[#4640DE] to-[#1e1b4b]
                  transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* CATEGORY LIST */}
          <div className="space-y-3 pb-36">
            {categories.map((item) => {
              const active = category === item.id;
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => setCategory(item.id)}
                  className={`w-full flex items-center gap-5 px-6 py-5 rounded-2xl border text-left
                    transition-all duration-200
                    ${
                      active
                        ? "border-black bg-white"
                        : "border-slate-200 hover:border-slate-400 hover:bg-slate-50"
                    }
                    hover:shadow-sm active:scale-[0.98]`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition
                      ${
                        active
                          ? "bg-black text-white"
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                      }`}
                  >
                    <Icon size={22} />
                  </div>

                  <div className="flex-1">
                    <p className="text-lg font-medium text-slate-900">
                      {item.label}
                    </p>
                  </div>

                  {active && (
                    <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center">
                      <div className="w-2.5 h-2.5 bg-black rounded-full" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 py-4 rounded-xl border border-slate-300
            text-slate-800 font-medium
            hover:bg-slate-50 active:scale-[0.98]
            transition"
          >
            <div className="flex items-center justify-center gap-2">
              <ChevronLeft size={18} />
              Back
            </div>
          </button>

          <button
            onClick={onNext}
            disabled={!category}
            className="flex-1 py-4 rounded-xl font-medium text-white
              bg-linear-to-br from-[#4640DE] to-[#1e1b4b]
              hover:from-[#3730a3] hover:to-[#1e1b4b]
              hover:shadow-lg hover:shadow-[#4640DE]/30
              active:scale-[0.98]
              disabled:opacity-30 disabled:cursor-not-allowed
              transition-all"
          >
            <div className="flex items-center justify-center gap-2">
              Next
              <ChevronRight size={18} />
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
}