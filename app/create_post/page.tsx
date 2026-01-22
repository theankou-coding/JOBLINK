"use client";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";

import CreateJobStart from "@/components/CreateJobStart";
import CreateJobCategory from "@/components/CreateJobCategory";
import CreateJobDetails from "@/components/CreateJobDetails";
import CreateJobSchedule from "@/components/CreateJobSchedule";
import CreateJobLocation from "@/components/CreateJobLocation";
import CreateJobRequirement from "@/components/CreateJobRequirement";
import CreateJobPhotos from "@/components/CreateJobPhoto";
import CreateJobPreview from "@/components/CreateJobPreview";
import { DraftManager, JobData } from "@/lib/draftManager";

type FormData = {
  category: string;
  title: string;
  jobDescription: string;
  businessName: string;
  businessType: string;
  daysPerWeek: string;
  startTime: string;
  endTime: string;
  salary: string;
  currency: "USD" | "KHR";
  benefits: string[];
  province: string;
  workplaceType: "on_site" | "remote" | "hybrid" | "";
  mapLink: string;
  locationDescription: string;
  latitude: number;
  longitude: number;
  experience: string;
  otherRequirements: string;
  location: string;
  responsibilities: string[];
  skills: string[];
};

// Complete mapping objects for all IDs to labels
const locationLabels: Record<string, string> = {
  "phnom_penh": "Phnom Penh",
  "siem_reap": "Siem Reap",
  "battambang": "Battambang",
  "kampong_cham": "Kampong Cham",
  "kampong_chhnang": "Kampong Chhnang",
  "kampong_speu": "Kampong Speu",
  "kampong_thom": "Kampong Thom",
  "kampot": "Kampot",
  "kandal": "Kandal",
  "kep": "Kep",
  "koh_kong": "Koh Kong",
  "kratie": "Kratie",
  "mondulkiri": "Mondulkiri",
  "oddar_meanchey": "Oddar Meanchey",
  "pailin": "Pailin",
  "preah_vihear": "Preah Vihear",
  "prey_veng": "Prey Veng",
  "pursat": "Pursat",
  "ratanakiri": "Ratanakiri",
  "sihanoukville": "Sihanoukville",
  "stung_treng": "Stung Treng",
  "svay_rieng": "Svay Rieng",
  "takeo": "Takeo",
  "tbong_khmum": "Tbong Khmum",
  "banteay_meanchey": "Banteay Meanchey",
};

const experienceLabels: Record<string, string> = {
  "exp_none": "No experience",
  "exp_1_plus": "1 year experience+",
  "exp_2_plus": "2 years experience+",
  "exp_3_plus": "3 years experience+",
  "exp_4_plus": "4 years experience+",
  "exp_5_plus": "5 years experience+",
};

const workplaceLabels: Record<string, string> = {
  "on_site": "On-site",
  "remote": "Remote",
  "hybrid": "Hybrid",
};

const categoryLabels: Record<string, string> = {
  "full_time": "Full-time",
  "part_time": "Part-time",
  "remote": "Remote",
  "internship": "Internship",
  "freelance": "Freelance",
  "other": "Other",
};

const businessTypeLabels: Record<string, string> = {
  "technology": "Technology",
  "medical_healthcare": "Medical/Healthcare",
  "education": "Education",
  "food_beverage": "Food & Beverage",
  "retail": "Retail",
  "finance": "Finance",
  "construction": "Construction",
  "marketing": "Marketing",
  "other": "Other",
};

const benefitLabels: Record<string, string> = {
  "free_meal": "Free meal",
  "monthly_bonus": "Monthly bonus",
  "overtime_pay": "Overtime pay",
  "uniform_provided": "Uniform provided",
  "staff_discounts": "Staff discounts",
  "health_insurance": "Health insurance",
  "holiday_pay": "Holiday pay",
  "annual_bonus": "End-of-year bonus",
};

// Helper function to convert FormData to JobData for saving
const convertFormDataToJobData = (formData: FormData): JobData => {
  return {
    category: formData.category,
    title: formData.title,
    jobDescription: formData.jobDescription,
    businessName: formData.businessName,
    businessType: formData.businessType,
    daysPerWeek: formData.daysPerWeek,
    salary: formData.salary,
    currency: formData.currency,
    benefits: formData.benefits,
    experience: formData.experience,
    otherRequirements: formData.otherRequirements,
    startTime: formData.startTime,
    endTime: formData.endTime,
    province: formData.province,
    workplaceType: formData.workplaceType,
    location: formData.province,
    locationDescription: formData.locationDescription,
    mapLink: formData.mapLink,
    latitude: formData.latitude,
    longitude: formData.longitude,
    responsibilities: [],
    skills: []
  };
};

// Update this function in your main page
const convertJobDataToFormData = (jobData: any): FormData => {
  console.log("DEBUG - Original jobData:", jobData);

  // Handle category conversion
  let categoryId = jobData.category || "";
  const labelToIdMap: Record<string, string> = {
    "Full-time": "full_time",
    "Full time": "full_time",
    "Part-time": "part_time",
    "Part time": "part_time",
    "Remote": "remote",
    "Internship": "internship",
    "Freelance": "freelance",
    "Other": "other",
  };

  if (labelToIdMap[categoryId]) {
    categoryId = labelToIdMap[categoryId];
  } else if (categoryId) {
    const lowerCategoryId = categoryId.toLowerCase().replace(/[-\s]/g, '_');
    if (categoryLabels[lowerCategoryId]) {
      categoryId = lowerCategoryId;
    }
  }

  // Handle workplaceType conversion
  let workplaceType = jobData.workplaceType || "";
  if (workplaceType) {
    const workplaceLabelToId: Record<string, string> = {
      "On-site": "on_site",
      "On site": "on_site",
      "Remote": "remote",
      "Hybrid": "hybrid",
    };

    if (workplaceLabelToId[workplaceType]) {
      workplaceType = workplaceLabelToId[workplaceType];
    }
  }

  // Handle businessType conversion
  let businessType = jobData.businessType || "";
  if (businessType) {
    const businessLabelToId: Record<string, string> = {
      "Technology": "technology",
      "Medical/Healthcare": "medical_healthcare",
      "Medical": "medical_healthcare",
      "Healthcare": "medical_healthcare",
      "Education": "education",
      "Food & Beverage": "food_beverage",
      "Food and Beverage": "food_beverage",
      "Retail": "retail",
      "Finance": "finance",
      "Construction": "construction",
      "Marketing": "marketing",
      "Other": "other",
    };

    if (businessLabelToId[businessType]) {
      businessType = businessLabelToId[businessType];
    } else {
      const normalizedId = businessType.toLowerCase().replace(/[-\s/]/g, '_');
      const validIds = [
        "technology", "medical_healthcare", "education",
        "food_beverage", "retail", "finance",
        "construction", "marketing", "other"
      ];
      if (validIds.includes(normalizedId)) {
        businessType = normalizedId;
      }
    }
  }

  // Handle benefits conversion
  let benefits: string[] = [];
  if (jobData.benefits && Array.isArray(jobData.benefits)) {
    const benefitLabelToId: Record<string, string> = {
      "Free meal": "free_meal",
      "Monthly bonus": "monthly_bonus",
      "Overtime pay": "overtime_pay",
      "Uniform provided": "uniform_provided",
      "Staff discounts": "staff_discounts",
      "Health insurance": "health_insurance",
      "Holiday": "holiday_pay",
      "End-of-year bonus": "annual_bonus"
    };

    benefits = jobData.benefits.map((benefit: string) => {
      if (benefitLabelToId[benefit]) {
        return benefitLabelToId[benefit];
      }
      if (benefit.startsWith("free_meal") ||
        benefit.startsWith("monthly_bonus") ||
        benefit.startsWith("overtime_pay") ||
        benefit.startsWith("uniform_provided") ||
        benefit.startsWith("staff_discounts") ||
        benefit.startsWith("health_insurance") ||
        benefit.startsWith("holiday_pay") ||
        benefit.startsWith("annual_bonus")) {
        return benefit;
      }
      return benefit.toLowerCase().replace(/[-\s]/g, '_');
    });
  }

  // Handle experience conversion - ADD THIS SECTION
  let experience = jobData.experience || "";
  if (experience) {
    const experienceLabelToId: Record<string, string> = {
      "No experience": "exp_none",
      "1 year experience+": "exp_1_plus",
      "2 years experience+": "exp_2_plus",
      "3 years experience+": "exp_3_plus",
      "4 years experience+": "exp_4_plus",
      "5 years experience+": "exp_5_plus",
      "Custom": "exp_custom",
    };

    if (experienceLabelToId[experience]) {
      experience = experienceLabelToId[experience];
    } else {
      // Try to normalize
      const normalized = experience.toLowerCase().replace(/[-\s+]/g, '_');
      if (normalized.startsWith('exp_')) {
        experience = normalized;
      }
    }
  }

  return {
    category: categoryId,
    title: jobData.title || "",
    jobDescription: jobData.jobDescription || "",
    businessName: jobData.businessName || "",
    businessType: businessType,
    daysPerWeek: jobData.daysPerWeek || "",
    startTime: jobData.startTime || "",
    endTime: jobData.endTime || "",
    salary: jobData.salary || "",
    currency: jobData.currency || "USD",
    benefits: benefits,
    province: jobData.province || jobData.location || "",
    workplaceType: workplaceType as "on_site" | "remote" | "hybrid" | "",
    mapLink: jobData.mapLink || "",
    locationDescription: jobData.locationDescription || "",
    latitude: jobData.latitude,
    longitude: jobData.longitude,
    experience: experience, // Use the converted experience
    otherRequirements: jobData.otherRequirements || "",
    location: jobData.location || "",
    responsibilities: jobData.responsibilities || [],
    skills: jobData.skills || [],
  };
};

export default function CreatePostPage() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null);

  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [base64Images, setBase64Images] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormData>({
    category: "",
    title: "",
    jobDescription: "",
    businessName: "",
    businessType: "",
    daysPerWeek: "",
    startTime: "",
    endTime: "",
    salary: "",
    currency: "USD",
    benefits: [],
    province: "",
    workplaceType: "",
    mapLink: "",
    locationDescription: "",
    latitude: 0,
    longitude: 0,
    experience: "",
    otherRequirements: "",
    location: "",
    responsibilities: [],
    skills: [],
  });

  // Check for draft ID in URL
  useEffect(() => {
    const draftId = searchParams.get("localDraftId");
    if (draftId) {
      loadDraftData(draftId);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const loadDraftData = async (draftId: string) => {
    try {
      setLoading(true);
      setEditingDraftId(draftId);

      const draft = await DraftManager.getDraft(draftId);
      if (draft) {
        console.log("DEBUG - Loaded draft:", draft);
        console.log("DEBUG - Draft data:", draft.data);
        console.log("DEBUG - Workplace type in draft:", draft.data.workplaceType);
        console.log("DEBUG - Province in draft:", draft.data.province);

        // Convert JobData to FormData with proper defaults
        const convertedData = convertJobDataToFormData(draft.data);
        console.log("DEBUG - Converted form data:", convertedData);

        setFormData(convertedData);

        // Convert base64 images to File objects for the form
        if (draft.images && draft.images.length > 0) {
          const files = await Promise.all(
            draft.images.map(async (base64, index) => {
              try {
                const response = await fetch(base64);
                const blob = await response.blob();
                return new File([blob], `draft_image_${index}.jpg`, { type: 'image/jpeg' });
              } catch (error) {
                console.error("Error converting image:", error);
                return null;
              }
            })
          );

          const validFiles = files.filter((file): file is File => file !== null);
          setImageFiles(validFiles);
          setBase64Images(draft.images);
        }
      }
    } catch (error) {
      console.error("Error loading draft:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (fields: Partial<FormData>) => {
    console.log("DEBUG - Updating form data with:", fields);
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleNext = () => setStep((p) => p + 1);
  const handleBack = () => setStep((p) => p - 1);

  const handlePublish = async () => {
    console.log("Publishing job with data:", formData);
    // Your publish logic here - use formData (with IDs) for database

    // If editing a draft, delete it after publishing
    if (editingDraftId) {
      await DraftManager.deleteDraft(editingDraftId);
    }
  };

  // Format data for preview - convert all IDs to labels
  const formattedPreviewData = useMemo(() => {
    const formatted = {
      ...formData,
      province: locationLabels[formData.province] || formData.province,
      experience: experienceLabels[formData.experience] || formData.experience,
      workplaceType: workplaceLabels[formData.workplaceType as keyof typeof workplaceLabels] || formData.workplaceType,
      category: categoryLabels[formData.category] || formData.category,
      businessType: businessTypeLabels[formData.businessType] || formData.businessType,
      benefits: formData.benefits.map(benefitId => benefitLabels[benefitId] || benefitId),
      workplaceLabel: workplaceLabels[formData.workplaceType as keyof typeof workplaceLabels] || formData.workplaceType,
      categoryLabel: categoryLabels[formData.category] || formData.category,
    };

    console.log("DEBUG - Formatted preview data:", formatted);
    return formatted;
  }, [formData]);


  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#4640DE] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading draft data...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {step === 0 && <CreateJobStart onNext={handleNext} />}
      {step === 1 && (
        <CreateJobCategory
          category={formData.category}
          setCategory={(val: string) => updateFormData({ category: val })}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 2 && (
        <CreateJobDetails
          data={{
            title: formData.title,
            jobDescription: formData.jobDescription,
            businessName: formData.businessName,
            businessType: formData.businessType
          }}
          updateData={(fields) => updateFormData(fields)}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <CreateJobSchedule
          data={formData}
          updateData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 4 && (
        <CreateJobLocation
          data={formData}
          updateData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 5 && (
        <CreateJobRequirement
          data={formData}
          updateData={updateFormData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 6 && (
        <CreateJobPhotos
          images={imageFiles}
          setImages={setImageFiles}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 7 && (
        <CreateJobPreview
          data={formattedPreviewData}
          images={imageFiles}
          onBack={handleBack}
          onPublish={handlePublish}
        />
      )}
    </main>
  );
}