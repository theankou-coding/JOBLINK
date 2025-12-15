"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Save,
  Globe,
  Mail,
  Phone,
  MapPin,
  Building,
  Users,
  DollarSign,
  Calendar,
  Clock,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Info,
  Image as ImageIcon,
  Languages,
} from "lucide-react";

export default function GeneralSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("general");

  // Settings state
  const [settings, setSettings] = useState({
    // General Settings
    site: {
      name: "JobLink Cambodia",
      tagline: "Your Community Job Board",
      description:
        "Connecting local talent with local opportunities across Cambodia",
      logo: "/images/logo.png",
      favicon: "/favicon.ico",
      timezone: "Asia/Phnom_Penh",
      dateFormat: "DD/MM/YYYY",
      timeFormat: "24h",
      language: "en",
      supportedLanguages: ["en", "km"],
      defaultCurrency: "USD",
      supportedCurrencies: ["USD", "KHR"],
    },

    // Contact Information
    contact: {
      email: "info@joblink.com",
      phone: "+855 23 123 456",
      address: "Phnom Penh, Cambodia",
      businessHours: "Mon-Fri: 8:00 AM - 5:00 PM",
      supportEmail: "support@joblink.com",
      salesEmail: "sales@joblink.com",
    },

    // Platform Settings
    platform: {
      maintenanceMode: false,
      registrationOpen: true,
      emailVerification: true,
      phoneVerification: false,
      allowJobPosting: true,
      maxJobsPerEmployer: 10,
      maxApplicationsPerUser: 50,
      jobExpiryDays: 30,
      autoArchiveOldJobs: true,
      featuredJobFee: 49.99,
      featuredJobDuration: 30,
    },

    // Email Settings
    email: {
      smtpHost: "smtp.joblink.com",
      smtpPort: "587",
      smtpUsername: "",
      smtpPassword: "",
      smtpEncryption: "tls",
      fromName: "JobLink Team",
      fromEmail: "noreply@joblink.com",
      emailTemplates: {
        welcome: true,
        jobApplication: true,
        jobPostConfirmation: true,
        passwordReset: true,
      },
    },
    // Social Media
    social: {
      facebook: "https://facebook.com/joblinkkh",
      linkedin: "https://linkedin.com/company/joblink",
      twitter: "https://twitter.com/joblinkkh",
      instagram: "https://instagram.com/joblinkkh",
      youtube: "",
      telegram: "",
    },
  });

  // Backup of original settings for comparison
  const [originalSettings, setOriginalSettings] = useState(settings);

  // Load settings on mount
  useEffect(() => {
    // In real app, fetch settings from API
    const loadSettings = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Use mock data for now
        setOriginalSettings(settings);
      } catch (error) {
        console.error("Failed to load settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [settings]);

  // Check for changes
  useEffect(() => {
    const hasChanges =
      JSON.stringify(settings) !== JSON.stringify(originalSettings);
    setHasChanges(hasChanges);
  }, [settings, originalSettings]);

  // Handle input changes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (section: string, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  // Handle save
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // In real app, save to API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setOriginalSettings(settings);
      setSaveSuccess(true);
      setHasChanges(false);

      // Hide success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle reset
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all changes?")) {
      setSettings(originalSettings);
      setHasChanges(false);
    }
  };

  // Render General Settings
  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Globe className="w-5 h-5 text-blue-600" />
          Site Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Name *
            </label>
            <input
              type="text"
              value={settings.site.name}
              onChange={(e) => handleChange("site", "name", e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tagline
            </label>
            <input
              type="text"
              value={settings.site.tagline}
              onChange={(e) => handleChange("site", "tagline", e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site Description
            </label>
            <textarea
              value={settings.site.description}
              onChange={(e) =>
                handleChange("site", "description", e.target.value)
              }
              rows={2}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Languages className="w-5 h-5 text-blue-600" />
          Regional Settings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Timezone
            </label>
            <select
              value={settings.site.timezone}
              onChange={(e) => handleChange("site", "timezone", e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="Asia/Phnom_Penh">Asia/Phnom Penh (GMT+7)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New York</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date Format
            </label>
            <select
              value={settings.site.dateFormat}
              onChange={(e) =>
                handleChange("site", "dateFormat", e.target.value)
              }
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Time Format
            </label>
            <select
              value={settings.site.timeFormat}
              onChange={(e) =>
                handleChange("site", "timeFormat", e.target.value)
              }
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="24h">24-hour</option>
              <option value="12h">12-hour</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Language
            </label>
            <select
              value={settings.site.language}
              onChange={(e) => handleChange("site", "language", e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="en">English</option>
              <option value="km">ខ្មែរ (Khmer)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Currency
            </label>
            <select
              value={settings.site.defaultCurrency}
              onChange={(e) =>
                handleChange("site", "defaultCurrency", e.target.value)
              }
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option value="USD">USD ($)</option>
              <option value="KHR">KHR (៛)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ImageIcon className="w-5 h-5 text-blue-600" />
          Brand Assets
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Logo
            </label>
            <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 text-center">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-3">
                Upload your logo (PNG, JPG, SVG)
              </p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Upload Logo
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Current: {settings.site.logo}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Favicon
            </label>
            <div className="border-2 border-dashed border-blue-200 rounded-lg p-6 text-center">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-3">Upload favicon (ICO, PNG)</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Upload Favicon
              </button>
              <p className="text-sm text-gray-500 mt-3">
                Current: {settings.site.favicon}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render Contact Settings
  const renderContactSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Building className="w-5 h-5 text-blue-600" />
          Company Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Address
            </label>
            <div className="flex gap-2">
              <MapPin className="w-5 h-5 text-gray-400 mt-2 shrink-0" />
              <textarea
                value={settings.contact.address}
                onChange={(e) =>
                  handleChange("contact", "address", e.target.value)
                }
                rows={2}
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="flex gap-2">
              <Phone className="w-5 h-5 text-gray-400 mt-2 shrink-0" />
              <input
                type="tel"
                value={settings.contact.phone}
                onChange={(e) =>
                  handleChange("contact", "phone", e.target.value)
                }
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Hours
            </label>
            <div className="flex gap-2">
              <Clock className="w-5 h-5 text-gray-400 mt-2 shrink-0" />
              <input
                type="text"
                value={settings.contact.businessHours}
                onChange={(e) =>
                  handleChange("contact", "businessHours", e.target.value)
                }
                className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Mail className="w-5 h-5 text-blue-600" />
          Email Addresses
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              General Email
            </label>
            <input
              type="email"
              value={settings.contact.email}
              onChange={(e) => handleChange("contact", "email", e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Support Email
            </label>
            <input
              type="email"
              value={settings.contact.supportEmail}
              onChange={(e) =>
                handleChange("contact", "supportEmail", e.target.value)
              }
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sales Email
            </label>
            <input
              type="email"
              value={settings.contact.salesEmail}
              onChange={(e) =>
                handleChange("contact", "salesEmail", e.target.value)
              }
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Render Platform Settings
  const renderPlatformSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" />
          User Management
        </h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Open Registration
              </label>
              <p className="text-sm text-gray-500">
                Allow new users to sign up
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.platform.registrationOpen}
                onChange={(e) =>
                  handleChange("platform", "registrationOpen", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Verification
              </label>
              <p className="text-sm text-gray-500">
                Require email verification for new accounts
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.platform.emailVerification}
                onChange={(e) =>
                  handleChange(
                    "platform",
                    "emailVerification",
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Allow Job Posting
              </label>
              <p className="text-sm text-gray-500">
                Allow employers to post new jobs
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.platform.allowJobPosting}
                onChange={(e) =>
                  handleChange("platform", "allowJobPosting", e.target.checked)
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          Job Settings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Jobs Per Employer
            </label>
            <input
              type="number"
              value={settings.platform.maxJobsPerEmployer}
              onChange={(e) =>
                handleChange(
                  "platform",
                  "maxJobsPerEmployer",
                  parseInt(e.target.value) || 0
                )
              }
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Expiry (Days)
            </label>
            <input
              type="number"
              value={settings.platform.jobExpiryDays}
              onChange={(e) =>
                handleChange(
                  "platform",
                  "jobExpiryDays",
                  parseInt(e.target.value) || 0
                )
              }
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Applications Per User
            </label>
            <input
              type="number"
              value={settings.platform.maxApplicationsPerUser}
              onChange={(e) =>
                handleChange(
                  "platform",
                  "maxApplicationsPerUser",
                  parseInt(e.target.value) || 0
                )
              }
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Auto Archive Old Jobs
              </label>
              <p className="text-sm text-gray-500">
                Automatically archive expired jobs
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.platform.autoArchiveOldJobs}
                onChange={(e) =>
                  handleChange(
                    "platform",
                    "autoArchiveOldJobs",
                    e.target.checked
                  )
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-blue-600" />
          Featured Jobs
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Job Fee (USD)
            </label>
            <input
              type="number"
              value={settings.platform.featuredJobFee}
              onChange={(e) =>
                handleChange(
                  "platform",
                  "featuredJobFee",
                  parseFloat(e.target.value) || 0
                )
              }
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Featured Duration (Days)
            </label>
            <input
              type="number"
              value={settings.platform.featuredJobDuration}
              onChange={(e) =>
                handleChange(
                  "platform",
                  "featuredJobDuration",
                  parseInt(e.target.value) || 0
                )
              }
              className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-blue-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            Maintenance Mode
          </h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={settings.platform.maintenanceMode}
              onChange={(e) =>
                handleChange("platform", "maintenanceMode", e.target.checked)
              }
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
          </label>
        </div>
        <p className="text-sm text-gray-600">
          When enabled, only administrators can access the site. Users will see
          a maintenance message.
        </p>
      </div>
    </div>
  );

  // Render current tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return renderGeneralSettings();
      case "contact":
        return renderContactSettings();
      case "platform":
        return renderPlatformSettings();
      case "security":
        return renderGeneralSettings();
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50/30 to-white">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Settings className="w-6 h-6 text-blue-600" />
              General Settings
            </h1>
            <p className="text-gray-600">
              Configure platform-wide settings and preferences
            </p>
          </div>

          <div className="flex items-center gap-3">
            {hasChanges && (
              <button
                onClick={handleReset}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Reset
              </button>
            )}
            <button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                hasChanges
                  ? "bg-linear-to-r from-blue-600 to-cyan-600 text-white hover:opacity-90"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">
                  Settings saved successfully!
                </p>
                <p className="text-sm text-green-700">
                  Your changes have been applied.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-blue-100 mb-6 overflow-x-auto">
          {[
            {
              id: "general",
              label: "General",
              icon: <Globe className="w-4 h-4" />,
            },
            {
              id: "contact",
              label: "Contact",
              icon: <Mail className="w-4 h-4" />,
            },
            {
              id: "platform",
              label: "Platform",
              icon: <Users className="w-4 h-4" />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 -mb-px transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600 font-medium"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading settings...</p>
          </div>
        ) : (
          <>
            {renderTabContent()}

            {/* Save Bar */}
            {hasChanges && (
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-blue-100 p-4 shadow-lg">
                <div className="container mx-auto flex items-center justify-between">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Info className="w-4 h-4" />
                    <span className="text-sm">You have unsaved changes</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Discard
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
