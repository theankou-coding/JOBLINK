"use client";

import { useState } from "react";
import {
  FaRocket,
  FaDollarSign,
  FaUsers,
  FaSearch,
  FaBell,
  FaChartLine,
  FaShieldAlt,
  FaMobileAlt,
  FaBriefcase,
  FaHandshake,
  FaClock,
  FaGlobe,
} from "react-icons/fa";

export default function FeaturesSection() {
  const [activeTab, setActiveTab] = useState<
    "job-seekers" | "employers" | "platform"
  >("job-seekers");

  const features = {
    "job-seekers": [
      {
        icon: <FaSearch className="w-8 h-8" />,
        title: "Smart Job Matching",
        description:
          "AI-powered matching that connects you with opportunities that align with your skills and career goals.",
        color: "bg-blue-100 text-blue-600",
      },
      {
        icon: <FaBell className="w-8 h-8" />,
        title: "Instant Notifications",
        description:
          "Get real-time alerts for new job postings, application updates, and interview invitations.",
        color: "bg-green-100 text-green-600",
      },
      {
        icon: <FaChartLine className="w-8 h-8" />,
        title: "Career Growth Tracking",
        description:
          "Track your application progress, skill development, and career milestones in one place.",
        color: "bg-purple-100 text-purple-600",
      },
      {
        icon: <FaUsers className="w-8 h-8" />,
        title: "Community Networking",
        description:
          "Connect with professionals, mentors, and companies within your local community.",
        color: "bg-orange-100 text-orange-600",
      },
    ],
    employers: [
      {
        icon: <FaBriefcase className="w-8 h-8" />,
        title: "Effortless Job Posting",
        description:
          "Post jobs in minutes with our intuitive dashboard. No technical expertise required.",
        color: "bg-red-100 text-red-600",
      },
      {
        icon: <FaHandshake className="w-8 h-8" />,
        title: "Direct Candidate Access",
        description:
          "Connect directly with qualified candidates without expensive recruiting agencies.",
        color: "bg-teal-100 text-teal-600",
      },
      {
        icon: <FaClock className="w-8 h-8" />,
        title: "Time-saving Tools",
        description:
          "Automated screening, interview scheduling, and communication tools to streamline hiring.",
        color: "bg-amber-100 text-amber-600",
      },
      {
        icon: <FaGlobe className="w-8 h-8" />,
        title: "Local Talent Pool",
        description:
          "Access verified local talent that's ready to contribute to your community's growth.",
        color: "bg-indigo-100 text-indigo-600",
      },
    ],
    platform: [
      {
        icon: <FaRocket className="w-8 h-8" />,
        title: "No Download Needed",
        description:
          "Access JobLink directly from your browser. No apps to install, no storage required.",
        color: "bg-blue-100 text-blue-600",
      },
      {
        icon: <FaDollarSign className="w-8 h-8" />,
        title: "Affordable Pricing",
        description:
          "Cost-effective solutions for businesses of all sizes. Post jobs at competitive rates.",
        color: "bg-green-100 text-green-600",
      },
      {
        icon: <FaShieldAlt className="w-8 h-8" />,
        title: "Secure & Private",
        description:
          "Enterprise-grade security protecting your data and ensuring privacy compliance.",
        color: "bg-purple-100 text-purple-600",
      },
      {
        icon: <FaMobileAlt className="w-8 h-8" />,
        title: "Mobile Optimized",
        description:
          "Fully responsive design that works perfectly on any device, anywhere.",
        color: "bg-pink-100 text-pink-600",
      },
    ],
  };

  const stats = [
    { number: "10K+", label: "Active Jobs", description: "Posted monthly" },
    { number: "50K+", label: "Users", description: "Connected professionals" },
    {
      number: "500+",
      label: "Companies",
      description: "Trusting our platform",
    },
    { number: "95%", label: "Satisfaction", description: "User rating" },
  ];

  return (
    <section className="w-full mt-10 py-16 md:py-24 bg-linear-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            WHY CHOOSE JOBLINK
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need for
            <span className="text-blue-600"> Career Success</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl">
            A comprehensive platform designed to bridge the gap between talent
            and opportunity in your community.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-gray-500 text-sm">{stat.description}</div>
            </div>
          ))}
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("job-seekers")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "job-seekers"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            For Job Seekers
          </button>
          <button
            onClick={() => setActiveTab("employers")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "employers"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            For Employers
          </button>
          <button
            onClick={() => setActiveTab("platform")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeTab === "platform"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            Platform Features
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features[activeTab].map((feature, index) => (
            <div
              key={index}
              className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Icon Container */}
              <div
                className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover Line */}
              <div className="mt-6 w-12 h-1 bg-blue-500 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="bg-linear-to-r from-blue-600 to-blue-700 rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">
              How JobLink Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                  1
                </div>
                <h4 className="text-xl font-semibold mb-3">Create Profile</h4>
                <p className="text-blue-100">
                  Sign up and build your professional profile in minutes
                </p>
              </div>
              <div className="relative">
                <div className="before:absolute before:w-12 before:h-1 before:bg-white/30 before:left-full before:top-8 before:hidden md:before:block">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                    2
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-3">
                  Discover & Connect
                </h4>
                <p className="text-blue-100">
                  Browse opportunities or post jobs and connect directly
                </p>
              </div>
              <div className="relative">
                <div className="before:absolute before:w-12 before:h-1 before:bg-white/30 before:left-full before:top-8 before:hidden md:before:block">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold mb-4 mx-auto">
                    3
                  </div>
                </div>
                <h4 className="text-xl font-semibold mb-3">Grow Together</h4>
                <p className="text-blue-100">
                  Build lasting professional relationships in your community
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Bottom */}
        <div className="text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Career Journey?
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-lg">
              Join as Job Seeker
            </button>
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-full border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 text-lg">
              Hire Talent Now
            </button>
          </div>
          <p className="text-gray-500 mt-6">
            No credit card required • Free 14-day trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
