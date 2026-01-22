"use client";
import React from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

type CreateJobDetailsProps = {
  data: {
    title: string;
    jobDescription: string;
    businessName: string;
    businessType: string;
  };
  updateData: (fields: Partial<CreateJobDetailsProps["data"]>) => void;
  onNext: () => void;
  onBack: () => void;
};

// Updated to use Firebase-friendly IDs for database storage
const BUSINESS_TYPES = [
  { id: "technology", label: "Technology" },
  { id: "medical_healthcare", label: "Medical/Healthcare" },
  { id: "education", label: "Education" },
  { id: "food_beverage", label: "Food & Beverage" },
  { id: "retail", label: "Retail" },
  { id: "finance", label: "Finance" },
  { id: "construction", label: "Construction" },
  { id: "marketing", label: "Marketing" },
  { id: "other", label: "Other" },
];

export default function CreateJobDetails({
  data,
  updateData,
  onNext,
  onBack,
}: CreateJobDetailsProps) {
  const STEP = 2;
  const TOTAL = 6;
  const progress = (STEP / TOTAL) * 100;

  const canContinue =
    data.title.trim() &&
    data.jobDescription.trim() &&
    data.businessName.trim() &&
    data.businessType.trim();

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-6 pt-14">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
              Tell us about the job
            </h1>
            <p className="mt-3 text-base text-slate-500 max-w-xl">
              Add clear details so candidates know exactly what you’re offering.
            </p>

            <div className="mt-6">
              <div className="flex justify-between text-xs font-medium text-slate-400 mb-2">
                <span>Step {STEP}</span>
                <span>{STEP} of {TOTAL}</span>
              </div>
              <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-br from-[#4640DE] to-[#1e1b4b] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-10 pb-36">
            {/* JOB TITLE */}
            <div className="relative group">
              <label className="absolute left-4 -top-5 text-xs font-medium text-slate-500">
                Job title
              </label>
              <input
                type="text"
                placeholder="e.g. Barista, Sales Assistant"
                value={data.title}
                onChange={(e) => updateData({ title: e.target.value })}
                className="w-full px-6 py-4 rounded-xl border border-slate-300 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/20 transition"
              />
            </div>

            {/* BUSINESS NAME */}
            <div className="relative group">
              <label className="absolute left-4 -top-5 text-xs font-medium text-slate-500">
                Business / company name
              </label>
              <input
                type="text"
                placeholder="Your business name"
                value={data.businessName}
                onChange={(e) => updateData({ businessName: e.target.value })}
                className="w-full px-6 py-4 rounded-xl border border-slate-300 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/20 transition"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="relative group pt-4">
              <label className="absolute left-4 -top-1 text-xs font-medium text-slate-500">
                Job description
              </label>
              <textarea
                rows={6}
                placeholder="Describe responsibilities, schedule, requirements…"
                value={data.jobDescription}
                onChange={(e) => updateData({ jobDescription: e.target.value })}
                className="w-full px-6 py-4 rounded-xl border border-slate-300 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#4640DE] focus:ring-2 focus:ring-[#4640DE]/20 transition resize-none"
              />
            </div>

            {/* BUSINESS TYPE */}
            <div className="space-y-4">
              <label className="text-xs font-medium text-slate-500 ml-4">
                What industry is your business in?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {BUSINESS_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => updateData({ businessType: type.id })}
                    className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                      data.businessType === type.id
                        ? "border-[#4640DE] bg-[#4640DE]/5 text-[#4640DE] ring-1 ring-[#4640DE]"
                        : "border-slate-200 text-slate-600 hover:border-slate-400"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 py-4 rounded-xl border border-slate-300 text-slate-800 font-medium hover:bg-slate-50 active:scale-[0.98] transition"
          >
            <div className="flex items-center justify-center gap-2">
              <ChevronLeft size={18} />
              Back
            </div>
          </button>

          <button
            onClick={onNext}
            disabled={!canContinue}
            className="flex-1 py-4 rounded-xl font-medium text-white bg-gradient-to-br from-[#4640DE] to-[#1e1b4b] hover:from-[#3730a3] hover:to-[#1e1b4b] hover:shadow-lg hover:shadow-[#4640DE]/30 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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