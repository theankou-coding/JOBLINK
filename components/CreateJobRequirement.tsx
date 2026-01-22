"use client";
import React from "react";
import { ChevronRight, ChevronLeft, CheckCircle2 } from "lucide-react";

type CreateJobRequirementProps = {
  data: {
    experience: string;
    otherRequirements: string;
  };
  updateData: (fields: Partial<CreateJobRequirementProps["data"]>) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function CreateJobRequirement({
  data,
  updateData,
  onNext,
  onBack,
}: CreateJobRequirementProps) {
  const STEP = 5;
  const TOTAL = 6;
  const progress = (STEP / TOTAL) * 100;

  // Firebase-friendly IDs for sorting and filtering
  const experienceLevels = [
    { id: "exp_none", label: "No experience" },
    { id: "exp_1_plus", label: "1 year experience+" },
    { id: "exp_2_plus", label: "2 year experience+" },
    { id: "exp_3_plus", label: "3 year experience+" },
    { id: "exp_4_plus", label: "4 year experience+" },
    { id: "exp_custom", label: "Custom" },
  ];

  const canContinue = data.experience.trim() !== "";

  
  const toggleExperience = (id: string) => {
    updateData({ experience: id });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans no-scrollbar">

      {/* CONTENT */}
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-6 pt-14">

          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
              Tell us the requirements
            </h1>
            <p className="mt-3 text-base text-slate-500 max-w-xl">
              Specify the candidate’s experience and any additional requirements.
            </p>

            {/* PROGRESS */}
            <div className="mt-6">
              <div className="flex justify-between text-xs font-medium text-slate-400 mb-2">
                <span>Step {STEP}</span>
                <span>{STEP} of {TOTAL}</span>
              </div>
              <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-br from-[#4640DE] to-[#1e1b4b] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="space-y-6 pb-36">

            {/* EXPERIENCE LEVELS */}
            <div>
              <h2 className="text-sm font-medium text-slate-700 mb-4 uppercase tracking-wider">Experience</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                {experienceLevels.map((level) => {
                  const active = data.experience === level.id;
                  return (
                    <button
                      key={level.id}
                      onClick={() => toggleExperience(level.id)}
                      className={`flex items-center justify-between p-4 border rounded-xl transition text-sm
                        ${active
                          ? "border-[#4640DE] bg-[#EEF2FF] text-[#4640DE]"
                          : "border-gray-200 text-gray-600 hover:border-[#4640DE]/50 hover:bg-[#EEF2FF]/30 hover:text-[#4640DE]"
                        }`}
                    >
                      <span className="font-medium">{level.label}</span>
                      <CheckCircle2 size={20} className={active ? "opacity-100 text-[#4640DE]" : "opacity-20"} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* OTHER REQUIREMENTS */}
            <div className="relative group pt-4">
              <label className="absolute -top-1 left-4 text-xs text-gray-400">Additional Details</label>
              <textarea
                placeholder="Other requirements (please write as a list)"
                rows={6}
                value={data.otherRequirements}
                onChange={(e) => updateData({ otherRequirements: e.target.value })}
                className="w-full px-4 py-4 mt-4 rounded-xl border border-slate-300
                  text-base text-slate-900 placeholder:text-slate-400
                  focus:outline-none focus:border-[#4640DE]
                  focus:ring-2 focus:ring-[#4640DE]/20 transition resize-none"
              />
            </div>

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="fixed bottom-0 inset-x-0 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-4 flex gap-4">
          <button
            onClick={onBack}
            className="flex-1 py-4 rounded-xl border border-slate-300 text-slate-800 font-medium
              hover:bg-slate-50 active:scale-[0.98] transition"
          >
            <div className="flex items-center justify-center gap-2">
              <ChevronLeft size={18} />
              Back
            </div>
          </button>

          <button
            onClick={onNext}
            disabled={!canContinue}
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