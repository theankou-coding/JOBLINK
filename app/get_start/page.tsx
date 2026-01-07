"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Building,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Zap,
  Users,
  Target,
  Award,
  Shield,
  Globe,
  Clock,
  Star,
  TrendingUp,
  FileText,
  MessageSquare,
  Smartphone,
} from "lucide-react";

export default function GetStartedPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<
    "job-seeker" | "employer" | null
  >(null);
  const [currentStep, setCurrentStep] = useState(1);

  const handleContinue = () => {
    if (!selectedType) return;

    if (selectedType === "job-seeker") {
      router.push("/signup?type=job-seeker");
    } else {
      router.push("/signup?type=employer");
    }
  };

  const jobSeekerBenefits = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Job Matching",
      description:
        "Get personalized job recommendations based on your skills and preferences",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "One-Click Applications",
      description: "Apply to jobs instantly with your pre-filled profile",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Local Opportunities",
      description:
        "Access verified jobs from Cambodian businesses in your area",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Career Growth",
      description:
        "Access training resources and skill development opportunities",
    },
  ];

  const employerBenefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Verified Talent Pool",
      description: "Access pre-screened candidates with verified profiles",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Hiring",
      description: "End-to-end encrypted communication and data protection",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Local Market Focus",
      description: "Connect with talent that understands the Cambodian market",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Growth Tools",
      description: "Analytics and tools to optimize your hiring process",
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Choose Your Path",
      description: "Select job seeker or employer",
    },
    {
      number: 2,
      title: "Create Account",
      description: "Sign up in under 2 minutes",
    },
    {
      number: 3,
      title: "Complete Profile",
      description: "Add your details and preferences",
    },
    {
      number: 4,
      title: "Start Connecting",
      description: "Begin your job search or hiring",
    },
  ];

  const stats = [
    {
      number: "10K+",
      label: "Active Job Seekers",
      icon: <User className="w-5 h-5" />,
    },
    {
      number: "2K+",
      label: "Verified Businesses",
      icon: <Building className="w-5 h-5" />,
    },
    {
      number: "15K+",
      label: "Successful Matches",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      number: "4.9",
      label: "Average Rating",
      icon: <Star className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative pt-20 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              START YOUR JOURNEY TODAY
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Begin Your Success Story with
              <span className="block text-blue-600 mt-2">JobLink Cambodia</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Join thousands of Cambodians who found their perfect career match
              or ideal team member through our community-driven platform.
            </p>

            {/* Progress Steps */}
            <div className="flex justify-center mb-12">
              <div className="flex items-center gap-8">
                {steps.map((step) => (
                  <div
                    key={step.number}
                    className="flex flex-col items-center relative"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                        step.number === currentStep
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110"
                          : step.number < currentStep
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {step.number < currentStep ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <div className="mt-3 text-center">
                      <div
                        className={`font-semibold ${
                          step.number <= currentStep
                            ? "text-gray-900"
                            : "text-gray-400"
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {step.description}
                      </div>
                    </div>
                    {step.number < steps.length && (
                      <div
                        className={`absolute top-6 left-full w-16 h-0.5 transform translate-x-4 ${
                          step.number < currentStep
                            ? "bg-green-400"
                            : "bg-gray-200"
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <div className="text-blue-600">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {stat.number}
                </div>
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Step 1: Choose Your Path */}
        <div className="max-w-4xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Step 1: Are You Looking for a Job or Hiring Talent?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Job Seeker Card */}
            <div
              onClick={() => setSelectedType("job-seeker")}
              className={`bg-white rounded-3xl p-8 border-2 cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                selectedType === "job-seeker"
                  ? "border-blue-500 shadow-xl"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-20 h-20 rounded-2xl mb-6 flex items-center justify-center ${
                    selectedType === "job-seeker"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                      : "bg-blue-50"
                  }`}
                >
                  <User
                    className={`w-10 h-10 ${
                      selectedType === "job-seeker"
                        ? "text-white"
                        : "text-blue-600"
                    }`}
                  />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  I am a Job Seeker
                </h3>
                <p className="text-gray-600 mb-8">
                  Find your dream job, grow your career, and connect with
                  Cambodian employers
                </p>

                {selectedType === "job-seeker" && (
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                )}

                <div className="space-y-4 w-full">
                  {jobSeekerBenefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-blue-600">{benefit.icon}</div>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">
                          {benefit.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          {benefit.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-sm text-gray-500">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-4 h-4" />
                    Average time to find a job: 2-4 weeks
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    95% satisfaction rate
                  </div>
                </div>
              </div>
            </div>

            {/* Employer Card */}
            <div
              onClick={() => setSelectedType("employer")}
              className={`bg-white rounded-3xl p-8 border-2 cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                selectedType === "employer"
                  ? "border-purple-500 shadow-xl"
                  : "border-gray-200 hover:border-purple-300"
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-20 h-20 rounded-2xl mb-6 flex items-center justify-center ${
                    selectedType === "employer"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500"
                      : "bg-purple-50"
                  }`}
                >
                  <Building
                    className={`w-10 h-10 ${
                      selectedType === "employer"
                        ? "text-white"
                        : "text-purple-600"
                    }`}
                  />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  I am an Employer
                </h3>
                <p className="text-gray-600 mb-8">
                  Find qualified talent, grow your team, and build your business
                  in Cambodia
                </p>

                {selectedType === "employer" && (
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                )}

                <div className="space-y-4 w-full">
                  {employerBenefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-purple-600">{benefit.icon}</div>
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">
                          {benefit.title}
                        </div>
                        <div className="text-sm text-gray-600">
                          {benefit.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 text-sm text-gray-500">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Clock className="w-4 h-4" />
                    Average time to hire: 1-2 weeks
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-4 h-4" />
                    85% retention rate after 6 months
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="mt-12 text-center">
            <button
              onClick={handleContinue}
              disabled={!selectedType}
              className={`px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-3 mx-auto ${
                selectedType
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:scale-105"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue to Step 2
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-gray-500 text-sm mt-4">
              {selectedType
                ? "Great choice! Click continue to create your account"
                : "Please select whether you're a job seeker or employer"}
            </p>
          </div>
        </div>

        {/* Why Choose JobLink */}
        <div className="max-w-6xl mx-auto mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Thousands of Cambodians Choose JobLink
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-3xl">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Made for Cambodia
              </h3>
              <p className="text-gray-600 mb-6">
                Built specifically for the Cambodian job market with local
                language support, payment methods, and cultural understanding.
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-semibold">
                <span>Learn about our local focus</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-8 rounded-3xl">
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Safe & Verified
              </h3>
              <p className="text-gray-600 mb-6">
                All businesses are verified, all profiles are authenticated, and
                all communication is encrypted for your safety.
              </p>
              <div className="flex items-center gap-2 text-purple-600 font-semibold">
                <span>Our safety measures</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-3xl">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Community Driven
              </h3>
              <p className="text-gray-600 mb-6">
                Join a growing community of professionals helping each other
                succeed in Cambodia&apos;s evolving job market.
              </p>
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <span>Meet our community</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Experience */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Smartphone className="w-4 h-4" />
              MOBILE-FIRST EXPERIENCE
            </div>
            <h2 className="text-3xl font-bold mb-6">
              Access JobLink Anywhere, Anytime
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              No app download needed. Our mobile-optimized platform works
              perfectly on any device, even on slower connections.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <FileText className="w-8 h-8 mx-auto mb-4" />
                <div className="font-semibold">Apply on Mobile</div>
                <div className="text-sm text-blue-200">
                  Complete applications from your phone
                </div>
              </div>
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <MessageSquare className="w-8 h-8 mx-auto mb-4" />
                <div className="font-semibold">Instant Messages</div>
                <div className="text-sm text-blue-200">
                  Chat with employers in real-time
                </div>
              </div>
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                <Zap className="w-8 h-8 mx-auto mb-4" />
                <div className="font-semibold">Quick Notifications</div>
                <div className="text-sm text-blue-200">
                  Get alerts for new opportunities
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Career or Business?
          </h2>
          <p className="text-gray-600 text-xl mb-10">
            Join JobLink today and take the first step toward your success in
            Cambodia is job market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setSelectedType("job-seeker")}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300"
            >
              Start Job Search
            </button>
            <button
              onClick={() => setSelectedType("employer")}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300"
            >
              Start Hiring
            </button>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border-2 border-gray-300 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              Book a Demo
            </Link>
          </div>
          <div className="mt-8 text-gray-500 text-sm">
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                Set up in 5 minutes
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-purple-500" />
                30-day free trial
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
