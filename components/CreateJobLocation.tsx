"use client";
import React, { JSX, useState } from "react";
import { ChevronRight, ChevronLeft, MapPin, Home, Globe } from "lucide-react";

type CreatePostLocationProps = {
  data: {
    mapLink: string;
    locationDescription: string;
    province: string; // Will store the ID for Firebase
    workplaceType: "on_site" | "remote" | "hybrid" | ""; 
    latitude?: number;
    longitude?: number;
  };
  updateData: (fields: Partial<CreatePostLocationProps["data"]>) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function CreatePostLocation({
  data,
  updateData,
  onNext,
  onBack,
}: CreatePostLocationProps) {
  const STEP = 4;
  const TOTAL = 6;
  const progress = (STEP / TOTAL) * 100;

  // Firebase-friendly IDs mapped to Display Names
  const provinces = [
    { locationId: "phnom_penh", label: "Phnom Penh" },
    { locationId: "kandal", label: "Kandal" },
    { locationId: "siem_reap", label: "Siem Reap" },
    { locationId: "battambang", label: "Battambang" },
    { locationId: "kampong_cham", label: "Kampong Cham" },
    { locationId: "kampong_speu", label: "Kampong Speu" },
    { locationId: "kampot", label: "Kampot" },
    { locationId: "prey_veng", label: "Prey Veng" },
    { locationId: "takeo", label: "Takeo" },
    { locationId: "sihanoukville", label: "Sihanoukville" },
    { locationId: "banteay_meanchey", label: "Banteay Meanchey" },
    { locationId: "kampong_thom", label: "Kampong Thom" },
    { locationId: "kampong_chhnang", label: "Kampong Chhnang" },
    { locationId: "kratie", label: "Kratie" },
    { locationId: "mondulkiri", label: "Mondulkiri" },
    { locationId: "ratanakiri", label: "Ratanakiri" },
    { locationId: "stung_treng", label: "Stung Treng" },
    { locationId: "oddar_meanchey", label: "Oddar Meanchey" },
    { locationId: "pursat", label: "Pursat" },
    { locationId: "kep", label: "Kep" },
    { locationId: "tbong_khmum", label: "Tbong Khmum" },
    { locationId: "preah_vihear", label: "Preah Vihear" },
    { locationId: "koh_kong", label: "Koh Kong" },
    { locationId: "svay_rieng", label: "Svay Rieng" }
  ];

  const workplaceTypes: { id: "on_site" | "remote" | "hybrid"; label: string; icon: JSX.Element }[] = [
    { id: "on_site", label: "On-site", icon: <Home size={20} /> },
    { id: "remote", label: "Remote", icon: <Globe size={20} /> },
    { id: "hybrid", label: "Hybrid", icon: <Home size={20} /> },
  ];

  const [provinceModalOpen, setProvinceModalOpen] = useState(false);

  const canContinue = data.province && data.workplaceType && data.mapLink && data.latitude !== undefined;

  const openProvinceModal = () => setProvinceModalOpen(true);
  const closeProvinceModal = () => setProvinceModalOpen(false);
  
  const selectProvince = (provinceId: string) => {
    updateData({ province: provinceId });
    closeProvinceModal();
  };

  // Helper to find the label for the button display
  const currentProvinceLabel = provinces.find(p => p.locationId === data.province)?.label || "Select province";

  const extractLatLng = (url: string): { latitude: number; longitude: number } | null => {
    try {
      let match = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (match) return { latitude: parseFloat(match[1]), longitude: parseFloat(match[2]) };

      match = url.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/);
      if (match) return { latitude: parseFloat(match[1]), longitude: parseFloat(match[2]) };

      match = url.match(/(?:query=|q=)(-?\d+\.\d+),(-?\d+\.\d+)/);
      if (match) return { latitude: parseFloat(match[1]), longitude: parseFloat(match[2]) };

      return null;
    } catch {
      return null;
    }
  };

  const handleMapLinkChange = (value: string) => {
    updateData({ mapLink: value });
    const coordinates = extractLatLng(value);
    if (coordinates) {
      updateData({ latitude: coordinates.latitude, longitude: coordinates.longitude });
    } else {
      updateData({ latitude: undefined, longitude: undefined });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">

      {/* CONTENT */}
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-6 pt-14">

          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
              Workplace Details
            </h1>
            <p className="mt-3 text-base text-slate-500 max-w-xl">
              Let candidates know where they will work and the type of workplace.
            </p>

            {/* PROGRESS */}
            <div className="mt-6">
              <div className="flex justify-between text-xs font-medium text-slate-400 mb-2">
                <span>Step {STEP}</span>
                <span>{STEP} of {TOTAL}</span>
              </div>
              <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-br from-[#4640DE] to-[#1e1b4b] transition-all duration-500"
                     style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="space-y-6 pb-36">

            {/* WORKPLACE TYPE */}
            <div>
              <h2 className="text-sm font-medium text-slate-700 mb-2 uppercase tracking-wider">Workplace Type</h2>
              <div className="flex gap-4">
                {workplaceTypes.map(type => {
                  const active = data.workplaceType === type.id;
                  return (
                    <button
                      key={type.id}
                      onClick={() => updateData({ workplaceType: type.id })}
                      className={`flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-xl border text-sm font-medium transition
                        ${active ? "border-[#4640DE] bg-[#EEF2FF] text-[#4640DE]"
                                 : "border-gray-200 bg-white text-gray-700 hover:border-[#4640DE]/50 hover:bg-[#EEF2FF]/30 hover:text-[#4640DE]"}`}
                    >
                      {type.icon}
                      <span>{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PROVINCE */}
            <div>
              <h2 className="text-sm font-medium text-slate-700 mb-2 uppercase tracking-wider">Province</h2>
              <button
                onClick={openProvinceModal}
                className="w-full text-left px-4 py-4 rounded-xl border border-slate-300 text-slate-900 hover:border-[#4640DE] hover:bg-[#EEF2FF]/30 transition"
              >
                {currentProvinceLabel}
              </button>
            </div>

            {/* PROVINCE MODAL */}
            {provinceModalOpen && (
              <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl max-h-[80vh] overflow-y-auto w-80 p-4 shadow-2xl">
                  <h3 className="text-lg font-semibold mb-2 px-3">Select Province</h3>
                  <div className="space-y-1">
                    {provinces.map(province => (
                      <button
                        key={province.locationId}
                        onClick={() => selectProvince(province.locationId)}
                        className={`w-full text-left px-3 py-2 rounded transition ${data.province === province.locationId ? 'bg-[#EEF2FF] text-[#4640DE] font-medium' : 'hover:bg-slate-50'}`}
                      >
                        {province.label}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={closeProvinceModal}
                    className="mt-4 w-full px-3 py-3 bg-slate-100 text-slate-700 font-medium rounded-xl hover:bg-slate-200 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* GOOGLE MAP LINK */}
            <div className="relative group">
              <MapPin className="absolute left-4 top-4.5 text-gray-400 group-focus-within:text-[#4640DE]" size={20} />
              <input
                type="url"
                placeholder="Google Maps Link"
                value={data.mapLink}
                onChange={e => handleMapLinkChange(e.target.value)}
                className="w-full px-11 py-4 rounded-xl border border-slate-300
                  text-base text-slate-900 placeholder:text-slate-400
                  focus:outline-none focus:border-[#4640DE]
                  focus:ring-2 focus:ring-[#4640DE]/20 transition"
              />
              {data.mapLink && data.latitude === undefined && (
                <p className="text-red-500 text-xs mt-1 ml-1">Invalid Google Maps link</p>
              )}
            </div>

            {/* locationDESCRIPTION */}
            <div className="relative group">
              <Home className="absolute left-4 top-4.5 text-gray-400 group-focus-within:text-[#4640DE]" size={20} />
              <textarea
                placeholder="About the workplace"
                value={data.locationDescription}
                onChange={e => updateData({ locationDescription: e.target.value })}
                className="w-full px-11 py-4 rounded-xl border border-slate-300
                  text-base text-slate-900 placeholder:text-slate-400
                  focus:outline-none focus:border-[#4640DE]
                  focus:ring-2 focus:ring-[#4640DE]/20 transition resize-none h-28"
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
            className="flex-1 py-4 rounded-xl border border-slate-300 text-slate-800 font-medium hover:bg-slate-50 active:scale-[0.98] transition"
          >
            <div className="flex items-center justify-center gap-2">
              <ChevronLeft size={18} /> Back
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
              Next <ChevronRight size={18} />
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
}