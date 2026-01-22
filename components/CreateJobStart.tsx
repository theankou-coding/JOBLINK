"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight, Building2, ClipboardList, Eye, ChevronLeft } from "lucide-react";

export default function CreateJobStart({ onNext }: { onNext: () => void }) {
  const steps = [
    {
      title: "Tell us about the job",
      desc: "Share basics like title, location, and type.",
      icon: <Building2 className="text-[#4640DE]" size={24} />,
    },
    {
      title: "Requirements",
      desc: "List the key skills and schedule requirements.",
      icon: <ClipboardList className="text-orange-500" size={24} />,
    },
    {
      title: "Review before posting",
      desc: "Check your details before publishing to seekers.",
      icon: <Eye className="text-green-500" size={24} />,
    },
  ];

  return (
    <div className="flex h-screen font-sans bg-white overflow-hidden">
      {/* LEFT BRAND SIDE */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-[#4640DE] to-[#1e1b4b] p-20 items-center justify-center relative overflow-hidden">
        <div className="absolute top-0 left-0 text-white/5 text-[15rem] font-bold leading-none -translate-x-12 -translate-y-12 select-none">
          JobLink
        </div>

        <div className="max-w-md text-white relative z-10">
          <span className="font-black text-3xl tracking-tighter italic mb-10 block">
            JobLink
          </span>
          <h1 className="text-6xl font-bold mb-8 leading-tight">
            It’s easy to get started.
          </h1>
          <p className="text-xl text-white/80">
            Follow our guided steps to publish your job and find candidates fast.
          </p>
        </div>
      </div>

      {/* RIGHT CONTENT SIDE */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {/* CONTENT */}
        <div className="flex-1 px-8 py-12 overflow-y-auto">
          <div className="max-w-xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">
              You're about to create a new post
            </h2>

            <div className="space-y-10">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="flex gap-6 items-start pb-8 border-b border-gray-100 last:border-0"
                >
                  <div className="p-4 bg-[#EEF2FF] rounded-2xl">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {step.title}
                    </h3>
                    <p className="text-gray-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-slate-200 px-8 py-6">
          <div className="flex gap-6 max-w-xl mx-auto">
            <Link
              href="/user_dashboard"
              className="flex-1 flex items-center justify-center gap-2 py-4 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-slate-50 transition"
            >
              <ChevronLeft size={18} />
              Return
            </Link>

            <button
                        onClick={onNext}
                        className="flex-1 py-4 rounded-xl font-medium text-white
                          bg-linear-to-br from-[#4640DE] to-[#1e1b4b]
                          hover:from-[#3730a3] hover:to-[#1e1b4b]
                          hover:shadow-lg hover:shadow-[#4640DE]/30
                          active:scale-[0.98]
                          disabled:opacity-30 disabled:cursor-not-allowed
                          transition-all"
                      >
                        <div className="flex items-center justify-center gap-2">
                          Start
                          <ChevronRight size={18} />
                        </div>
                      </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
