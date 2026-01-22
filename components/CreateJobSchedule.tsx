"use client";
import React, { useState } from "react";
import { ChevronRight, ChevronLeft, Clock, Calendar, CheckCircle2, Coins } from "lucide-react";

type CreateJobScheduleProps = {
  data: {
    daysPerWeek: string;
    startTime: string;
    endTime: string;
    salary: string;
    currency: "USD" | "KHR";
    benefits: string[];
  };
  updateData: (fields: Partial<CreateJobScheduleProps["data"]>) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function CreateJobSchedule({ data, updateData, onNext, onBack }: CreateJobScheduleProps) {
  const STEP = 3;
  const TOTAL = 6;
  const progress = (STEP / TOTAL) * 100;

  // UPDATED: IDs to match Firebase naming conventions while keeping your labels
  const benefitOptions = [
    { id: "free_meal", label: "Free meal" },
    { id: "monthly_bonus", label: "Monthly bonus" },
    { id: "overtime_pay", label: "Overtime pay" },
    { id: "uniform_provided", label: "Uniform provided" },
    { id: "staff_discounts", label: "Staff discounts" },
    { id: "health_insurance", label: "Health insurance" },
    { id: "holiday_pay", label: "Holiday" },
    { id: "annual_bonus", label: "End-of-year bonus" }
  ];

  const toggleBenefit = (benefitId: string) => {
    const current = data.benefits.includes(benefitId)
      ? data.benefits.filter((b) => b !== benefitId)
      : [...data.benefits, benefitId];
    updateData({ benefits: current });
  };

  const canContinue = data.daysPerWeek && data.salary;

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">

      {/* CONTENT */}
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-6 pt-14">

          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
              Schedule & Pay
            </h1>
            <p className="mt-3 text-base text-slate-500 max-w-xl">
              Let candidates know the expected schedule, salary, and perks.
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

            {/* WORKING HOURS RANGE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <Clock className="absolute left-4 top-4.5 text-gray-400 group-focus-within:text-[#4640DE]" size={20} />
                <input
                  type="time"
                  value={data.startTime || ""}
                  onChange={(e) => updateData({ startTime: e.target.value })}
                  className="w-full px-11 py-4 rounded-xl border border-slate-300
        text-base text-slate-900 placeholder:text-slate-400
        focus:outline-none focus:border-[#4640DE]
        focus:ring-2 focus:ring-[#4640DE]/20 transition"
                />
                <label className="absolute left-4 -top-5 text-xs text-gray-400">Start Time</label>
              </div>

              <div className="relative group">
                <Clock className="absolute left-4 top-4.5 text-gray-400 group-focus-within:text-[#4640DE]" size={20} />
                <input
                  type="time"
                  value={data.endTime || ""}
                  onChange={(e) => updateData({ endTime: e.target.value })}
                  className="w-full px-11 py-4 rounded-xl border border-slate-300
        text-base text-slate-900 placeholder:text-slate-400
        focus:outline-none focus:border-[#4640DE]
        focus:ring-2 focus:ring-[#4640DE]/20 transition"
                />
                <label className="absolute left-4 -top-5 text-xs text-gray-400">End Time</label>
              </div>
            </div>

            {/* DAYS PER WEEK */}
            <div className="relative group">
              <Calendar className="absolute left-4 top-4.5 text-gray-400 group-focus-within:text-[#4640DE]" size={20} />
              <input
                type="number"
                placeholder="Days per week"
                value={data.daysPerWeek}
                onChange={(e) => {
                  let val = e.target.value;
                  if (val === "") {
                    updateData({ daysPerWeek: "" });
                  } else {
                    let num = Number(val);
                    if (!isNaN(num)) num = Math.min(Math.max(num, 0), 7);
                    updateData({ daysPerWeek: String(num) });
                  }
                }}
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
                }}
                className="w-full px-11 py-4 rounded-xl border border-slate-300
                  text-base text-slate-900 placeholder:text-slate-400
                  focus:outline-none focus:border-[#4640DE]
                  focus:ring-2 focus:ring-[#4640DE]/20 transition"
                min={0}
                max={7}
                step={1}
              />
            </div>

            {/* SALARY + CURRENCY */}
            <div className="relative group">
              <div className="absolute left-4 top-4 w-6 h-6 flex items-center justify-center text-gray-400 transition-all duration-300 ease-in-out">
                {data.currency === "USD" ? (
                  <span className="text-gray-400 font-bold text-lg animate-fadeIn">$</span>
                ) : (
                  <span className="text-gray-400 font-bold text-2xl animate-fadeIn">៛</span>
                )}
              </div>

              <input
                type="number"
                placeholder="Salary"
                value={data.salary}
                onChange={(e) => {
                  const sanitized = e.target.value.replace(/\D/g, "");
                  updateData({ salary: sanitized });
                }}
                onKeyDown={(e) => {
                  if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
                }}
                className="w-full pr-32 px-11 py-4 rounded-xl border border-slate-300
      text-base text-slate-900 placeholder:text-slate-400
      focus:outline-none focus:border-[#4640DE]
      focus:ring-2 focus:ring-[#4640DE]/20 transition"
                min={0}
                step={100}
              />

              <select
                value={data.currency}
                onChange={(e) => updateData({ currency: e.target.value as "USD" | "KHR" })}
                className="absolute right-2 top-2 bottom-2 px-2 py-2 rounded-xl border border-slate-300 text-sm bg-white"
              >
                <option value="USD">USD $</option>
                <option value="KHR">KHR ៛</option>
              </select>
            </div>

            {/* BENEFITS */}
            <div>
              <h2 className="text-sm font-medium text-slate-700 mb-4 uppercase tracking-wider">Benefits</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {benefitOptions.map((benefit) => {
                  const active = data.benefits.includes(benefit.id);
                  return (
                    <button
                      key={benefit.id}
                      onClick={() => toggleBenefit(benefit.id)}
                      className={`flex items-center justify-between p-4 border rounded-xl transition text-sm
                        ${active
                          ? "border-[#4640DE] bg-[#EEF2FF] text-[#4640DE]"
                          : "border-gray-200 text-gray-600 hover:border-[#4640DE]/50 hover:bg-[#EEF2FF]/30 hover:text-[#4640DE]"
                        }`}
                    >
                      <span className="font-medium">{benefit.label}</span>
                      <CheckCircle2 size={20} className={active ? "opacity-100 text-[#4640DE]" : "opacity-20"} />
                    </button>
                  );
                })}
              </div>
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