"use client";
import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Trash2, Camera, ImagePlus } from "lucide-react";

/* ---------- File Preview ---------- */
const FilePreview = ({
  file,
  isActive,
  onClick,
  isCover,
}: {
  file: File;
  isActive: boolean;
  onClick: () => void;
  isCover: boolean;
}) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const newUrl = URL.createObjectURL(file);
    setUrl(newUrl);
    return () => URL.revokeObjectURL(newUrl);
  }, [file]);

  return (
    <div className="relative group">
      {url ? (
        <img
          src={url}
          alt="preview"
          className={`w-full aspect-square object-cover rounded-xl cursor-pointer transition-all
            ${isActive ? "ring-4 ring-[#4640DE] ring-offset-2" : "hover:opacity-90"}`}
          onClick={onClick}
        />
      ) : (
        <div className="w-full aspect-square bg-slate-100 animate-pulse rounded-xl" />
      )}
      
      {isCover && (
        <div className="absolute top-2 left-2 px-3 py-1 bg-[#4640DE] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md z-10">
          Cover
        </div>
      )}
    </div>
  );
};

/* ---------- Props ---------- */
type CreateJobPhotosProps = {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  onNext: () => void;
  onBack: () => void;
};

export default function CreateJobPhotos({
  images,
  setImages,
  onNext,
  onBack,
}: CreateJobPhotosProps) {
  const STEP = 6;
  const TOTAL = 6;
  const progress = (STEP / TOTAL) * 100;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).slice(0, 5 - images.length);
      setImages((prev) => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setActiveIndex(null);
  };

  const setAsCover = (index: number) => {
    const newImages = [...images];
    const [selected] = newImages.splice(index, 1);
    newImages.unshift(selected);
    setImages(newImages);
    setActiveIndex(null);
  };

  const canContinue = images.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      {/* CONTENT */}
      <div className="flex-1">
        <div className="max-w-4xl mx-auto px-6 pt-14">
          
          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-900 tracking-tight">
              Add photos of your workplace
            </h1>
            <p className="mt-3 text-base text-slate-500 max-w-xl">
              The first photo will be your cover image.
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

          {/* CONTENT */}
          <div className="space-y-10 pb-36">
            {images.length === 0 ? (
              <label className="flex flex-col items-center justify-center w-full aspect-video border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all group">
                <div className="bg-indigo-50 p-6 rounded-full mb-4 group-hover:scale-110 transition-transform">
                  <ImagePlus size={40} className="text-[#4640DE]" />
                </div>
                <span className="text-slate-500 font-medium">Click to upload (JPG, PNG)</span>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleUpload} 
                  accept="image/*" 
                  multiple 
                />
              </label>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {images.map((file, index) => (
                    <div key={`${file.name}-${index}`} className="relative">
                      <FilePreview
                        file={file}
                        isActive={activeIndex === index}
                        isCover={index === 0}
                        onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                      />

                      {/* ACTION OVERLAY */}
                      {activeIndex === index && (
                        <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center pointer-events-none">
                          {/* Trash Button - Top Right */}
                          <button
                            onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                            className="absolute top-2 right-2 p-2 bg-white text-red-600 rounded-full shadow-xl hover:bg-red-50 pointer-events-auto transition-transform active:scale-90"
                          >
                            <Trash2 size={18} />
                          </button>

                          {/* Set Cover Button - Top Left (Only if not already cover) */}
                          {index !== 0 && (
                            <button
                              onClick={(e) => { e.stopPropagation(); setAsCover(index); }}
                              className="absolute top-2 left-2 px-3 py-1.5 bg-[#4640DE] text-white text-[10px] font-bold rounded-full shadow-xl pointer-events-auto transition-transform active:scale-90"
                            >
                              Set Cover
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {images.length < 5 && (
                    <label className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition-all text-slate-400 group">
                      <div className="p-4 bg-slate-100 rounded-full mb-2 group-hover:bg-slate-200 transition">
                        <Camera size={24} />
                      </div>
                      <span className="text-sm text-slate-500">Add more</span>
                      <input 
                        type="file" 
                        className="hidden" 
                        onChange={handleUpload} 
                        accept="image/*" 
                        multiple 
                      />
                    </label>
                  )}
                </div>
              </div>
            )}
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