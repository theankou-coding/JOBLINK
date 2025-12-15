"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  MapPin,
  Calendar,
  Users,
  FileText,
  Clock,
  Globe,
  Building,
  Tag,
  ArrowLeft,
  Save,
  X,
  Plus,
  Trash2,
} from "lucide-react";

export default function AddNewJobPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Form state
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    companyId: "",
    jobType: "full-time",
    experienceLevel: "mid-level",
    location: {
      city: "",
      province: "",
      remoteType: "on-site", // on-site, remote, hybrid
    },
    salary: {
      min: "",
      max: "",
      currency: "USD",
      isNegotiable: false,
    },
    description: "",
    responsibilities: [""],
    requirements: [""],
    benefits: [""],
    category: "",
    tags: [] as string[],
    applicationDeadline: "",
    vacancyCount: 1,
    isFeatured: false,
    isUrgent: false,
    contactEmail: "",
    contactPhone: "",
  });

  // Categories data
  const jobCategories = [
    "Technology & IT",
    "Marketing & Sales",
    "Finance & Accounting",
    "Human Resources",
    "Operations & Management",
    "Customer Service",
    "Healthcare & Medical",
    "Education & Training",
    "Construction & Engineering",
    "Hospitality & Tourism",
    "Retail & Merchandising",
    "Transportation & Logistics",
    "Creative & Design",
    "Legal & Compliance",
    "Administration & Support",
  ];

  const jobTypes = [
    {
      id: "full-time",
      label: "Full Time",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      id: "part-time",
      label: "Part Time",
      icon: <Clock className="w-4 h-4" />,
    },
    {
      id: "contract",
      label: "Contract",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      id: "temporary",
      label: "Temporary",
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      id: "internship",
      label: "Internship",
      icon: <Users className="w-4 h-4" />,
    },
    { id: "remote", label: "Remote", icon: <Globe className="w-4 h-4" /> },
  ];

  const experienceLevels = [
    { id: "entry", label: "Entry Level" },
    { id: "mid-level", label: "Mid Level" },
    { id: "senior", label: "Senior Level" },
    { id: "executive", label: "Executive" },
  ];

  const remoteTypes = [
    { id: "on-site", label: "On-site" },
    { id: "remote", label: "Remote" },
    { id: "hybrid", label: "Hybrid" },
  ];

  // Handle form changes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: string, value: any) => {
    setFormData((prev) => {
      // Handle nested fields
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        return {
          ...prev,
          [parent]: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ...(prev as any)[parent],
            [child]: value,
          },
        };
      }
      return { ...prev, [field]: value };
    });
    setIsDirty(true);
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle array field changes
  const handleArrayChange = (
    field: keyof typeof formData,
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) =>
        i === index ? value : item
      ),
    }));
    setIsDirty(true);
  };

  // Add new item to array field
  const addArrayItem = (field: keyof typeof formData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""],
    }));
  };

  // Remove item from array field
  const removeArrayItem = (field: keyof typeof formData, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }));
  };

  // Handle tag input
  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (!formData.tags.includes(newTag) && formData.tags.length < 10) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
        }));
        e.currentTarget.value = "";
      }
    }
  };

  // Remove tag
  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
    if (!formData.company.trim())
      newErrors.company = "Company name is required";
    if (!formData.location.city.trim())
      newErrors["location.city"] = "City is required";
    if (!formData.description.trim())
      newErrors.description = "Job description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (formData.responsibilities.some((r) => !r.trim()))
      newErrors.responsibilities = "All responsibilities must be filled";
    if (formData.requirements.some((r) => !r.trim()))
      newErrors.requirements = "All requirements must be filled";
    if (
      formData.salary.min &&
      formData.salary.max &&
      parseFloat(formData.salary.max) < parseFloat(formData.salary.min)
    ) {
      newErrors.salary = "Maximum salary must be greater than minimum salary";
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Job data to be saved:", formData);
      // In real app: await api.post('/jobs', formData);

      alert("Job posted successfully!");
      setIsDirty(false);
      router.push("/admin/jobs");
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Failed to post job. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle back navigation with warning
  const handleBack = () => {
    if (
      isDirty &&
      !window.confirm(
        "You have unsaved changes. Are you sure you want to leave?"
      )
    ) {
      return;
    }
    router.back();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50/30 to-white">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Post New Job</h1>
              <p className="text-gray-600">
                Fill in the details to create a new job listing
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleBack}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-4 py-2 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Posting...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Post Job
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information Card */}
            <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                Basic Information
              </h2>

              <div className="space-y-6">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => handleChange("jobTitle", e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.jobTitle ? "border-red-300" : "border-blue-200"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/30`}
                    placeholder="e.g., Senior Software Engineer"
                  />
                  {errors.jobTitle && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.jobTitle}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company *
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => handleChange("company", e.target.value)}
                      className={`flex-1 px-4 py-3 rounded-lg border ${
                        errors.company ? "border-red-300" : "border-blue-200"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500/30`}
                      placeholder="Company name"
                    />
                    <div className="w-48">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Company ID
                      </label>
                      <input
                        type="text"
                        value={formData.companyId}
                        onChange={(e) =>
                          handleChange("companyId", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        placeholder="Optional"
                      />
                    </div>
                  </div>
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.company}
                    </p>
                  )}
                </div>

                {/* Job Type & Experience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Type
                    </label>
                    <select
                      value={formData.jobType}
                      onChange={(e) => handleChange("jobType", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    >
                      {jobTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Experience Level
                    </label>
                    <select
                      value={formData.experienceLevel}
                      onChange={(e) =>
                        handleChange("experienceLevel", e.target.value)
                      }
                      className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    >
                      {experienceLevels.map((level) => (
                        <option key={level.id} value={level.id}>
                          {level.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <input
                        type="text"
                        value={formData.location.city}
                        onChange={(e) =>
                          handleChange("location.city", e.target.value)
                        }
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors["location.city"]
                            ? "border-red-300"
                            : "border-blue-200"
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/30`}
                        placeholder="City"
                      />
                      {errors["location.city"] && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors["location.city"]}
                        </p>
                      )}
                    </div>
                    <div>
                      <input
                        type="text"
                        value={formData.location.province}
                        onChange={(e) =>
                          handleChange("location.province", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        placeholder="Province (Optional)"
                      />
                    </div>
                    <div>
                      <select
                        value={formData.location.remoteType}
                        onChange={(e) =>
                          handleChange("location.remoteType", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      >
                        {remoteTypes.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Salary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Salary Range
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          value={formData.salary.min}
                          onChange={(e) =>
                            handleChange("salary.min", e.target.value)
                          }
                          className="w-full pl-8 pr-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                          placeholder="Min"
                        />
                      </div>
                    </div>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        to
                      </div>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <input
                          type="number"
                          value={formData.salary.max}
                          onChange={(e) =>
                            handleChange("salary.max", e.target.value)
                          }
                          className="w-full pl-8 pr-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                          placeholder="Max"
                        />
                      </div>
                    </div>
                    <div>
                      <select
                        value={formData.salary.currency}
                        onChange={(e) =>
                          handleChange("salary.currency", e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      >
                        <option value="USD">USD</option>
                        <option value="KHR">KHR</option>
                      </select>
                    </div>
                    <div>
                      <label className="flex items-center h-full px-4 py-3 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-50">
                        <input
                          type="checkbox"
                          checked={formData.salary.isNegotiable}
                          onChange={(e) =>
                            handleChange(
                              "salary.isNegotiable",
                              e.target.checked
                            )
                          }
                          className="mr-2 rounded border-blue-300"
                        />
                        <span className="text-sm">Negotiable</span>
                      </label>
                    </div>
                  </div>
                  {errors.salary && (
                    <p className="mt-1 text-sm text-red-600">{errors.salary}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Job Description Card */}
            <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Job Description *
              </h2>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={8}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.description ? "border-red-300" : "border-blue-200"
                } focus:outline-none focus:ring-2 focus:ring-blue-500/30`}
                placeholder="Describe the job position, company culture, and what makes this role exciting..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description}
                </p>
              )}
              <div className="mt-2 text-sm text-gray-500">
                Provide a compelling description to attract the best candidates.
                Use bullet points for clarity.
              </div>
            </div>

            {/* Responsibilities Card */}
            <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                Key Responsibilities
              </h2>
              <div className="space-y-3">
                {formData.responsibilities.map((responsibility, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={responsibility}
                        onChange={(e) =>
                          handleArrayChange(
                            "responsibilities",
                            index,
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        placeholder={`Responsibility ${index + 1}`}
                      />
                    </div>
                    {formData.responsibilities.length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeArrayItem("responsibilities", index)
                        }
                        className="px-3 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {errors.responsibilities && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.responsibilities}
                </p>
              )}
              <button
                type="button"
                onClick={() => addArrayItem("responsibilities")}
                className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add Responsibility
              </button>
            </div>

            {/* Requirements Card */}
            <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Requirements & Qualifications
              </h2>
              <div className="space-y-3">
                {formData.requirements.map((requirement, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={requirement}
                        onChange={(e) =>
                          handleArrayChange(
                            "requirements",
                            index,
                            e.target.value
                          )
                        }
                        className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        placeholder={`Requirement ${index + 1}`}
                      />
                    </div>
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("requirements", index)}
                        className="px-3 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {errors.requirements && (
                <p className="mt-2 text-sm text-red-600">
                  {errors.requirements}
                </p>
              )}
              <button
                type="button"
                onClick={() => addArrayItem("requirements")}
                className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add Requirement
              </button>
            </div>

            {/* Benefits Card */}
            <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Benefits & Perks
              </h2>
              <div className="space-y-3">
                {formData.benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        value={benefit}
                        onChange={(e) =>
                          handleArrayChange("benefits", index, e.target.value)
                        }
                        className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        placeholder={`Benefit ${index + 1}`}
                      />
                    </div>
                    {formData.benefits.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeArrayItem("benefits", index)}
                        className="px-3 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => addArrayItem("benefits")}
                className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
                Add Benefit
              </button>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Category & Tags Card */}
            <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Tag className="w-5 h-5 text-blue-600" />
                Category & Tags
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.category ? "border-red-300" : "border-blue-200"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/30`}
                  >
                    <option value="">Select a category</option>
                    {jobCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.category}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (Press Enter to add)
                  </label>
                  <input
                    type="text"
                    onKeyDown={handleTagInput}
                    className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    placeholder="e.g., React, Node.js, Management"
                  />
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="hover:text-blue-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Details Card */}
            <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Additional Details
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    value={formData.applicationDeadline}
                    onChange={(e) =>
                      handleChange("applicationDeadline", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vacancy Count
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.vacancyCount}
                    onChange={(e) =>
                      handleChange(
                        "vacancyCount",
                        parseInt(e.target.value) || 1
                      )
                    }
                    className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) =>
                        handleChange("isFeatured", e.target.checked)
                      }
                      className="rounded border-blue-300 text-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Feature this job
                    </span>
                  </label>
                  <p className="text-xs text-gray-500">
                    Featured jobs appear at the top of search results
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isUrgent}
                      onChange={(e) =>
                        handleChange("isUrgent", e.target.checked)
                      }
                      className="rounded border-blue-300 text-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Mark as Urgent Hiring
                    </span>
                  </label>
                  <p className="text-xs text-gray-500">
                    Urgent jobs have special highlighting
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information Card */}
            <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) =>
                      handleChange("contactEmail", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    placeholder="hr@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) =>
                      handleChange("contactPhone", e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                    placeholder="+855 23 123 456"
                  />
                </div>
              </div>
            </div>

            {/* Preview & Actions Card */}
            <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-xl border border-blue-100 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Job Preview
              </h3>

              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <h4 className="font-medium text-gray-900 mb-2">
                    {formData.jobTitle || "Job Title"}
                  </h4>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <Building className="w-4 h-4" />
                    <span>{formData.company || "Company Name"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{formData.location.city || "Location"}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full py-3 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:opacity-90 font-medium"
                  >
                    {isLoading ? "Posting Job..." : "Publish Job"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      // Save as draft logic
                      console.log("Save as draft:", formData);
                      alert("Job saved as draft!");
                      setIsDirty(false);
                    }}
                    className="w-full py-3 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 font-medium"
                  >
                    Save as Draft
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
