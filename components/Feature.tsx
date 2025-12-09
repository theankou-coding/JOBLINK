// components/FeaturesSection.jsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      title: "Advanced Job Search & Filters",
      description:
        "Quickly find the right opportunity with powerful search tools and smart filtering options.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14a3.5 3.5 0 005 0l4-4a3.5 3.5 0 00-5-5l-.5.5"
          />
        </svg>
      ),
      color: "blue",
      gradient: "from-blue-500 to-blue-600",
      stats: "95% accuracy",
    },
    {
      title: "Post Job with Various Categories",
      description:
        "Easily create listings for full-time, part-time, remote, or community-based jobs.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      color: "green",
      gradient: "from-green-500 to-green-600",
      stats: "10+ categories",
    },
    {
      title: "AI-Powered Job Recommendations",
      description:
        "Get personalized job suggestions based on your skills, experience, and activity.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      color: "purple",
      gradient: "from-purple-500 to-purple-600",
      stats: "Smart matching",
    },
    {
      title: "Real-Time Chat With File Sharing",
      description:
        "Connect instantly with employers or candidates, and exchange resumes, images, or documents.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
      color: "red",
      gradient: "from-red-500 to-red-600",
      stats: "Instant connection",
    },
    {
      title: "Smart Notification Center",
      description:
        "Stay informed with alerts for new matches, messages, job updates, and application status.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
      ),
      color: "yellow",
      gradient: "from-yellow-500 to-yellow-600",
      stats: "Real-time alerts",
    },
    {
      title: "Featured Job Listings & Boosted Visibility",
      description:
        "Promote job posts for higher reach and attract more qualified candidates.",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ),
      color: "pink",
      gradient: "from-pink-500 to-pink-600",
      stats: "5x more views",
    },
  ];

  return (
    <section className="min-h-screen bg-linear-to-b from-gray-50 to-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
              Numerous Features
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to Succeed
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Powerful tools designed to connect local talent with opportunities
            and streamline the hiring process.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div
                className={`mb-6 w-14 h-14 rounded-xl bg-linear-to-r ${feature.gradient} flex items-center justify-center`}
              >
                <div className="text-white">{feature.icon}</div>
              </div>

              {/* Title and Description */}
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {feature.description}
              </p>

              {/* Stats Badge */}
              <div
                className={`inline-flex items-center px-4 py-2 rounded-full bg-${feature.color}-50 text-${feature.color}-700 font-medium text-sm`}
              >
                <span>{feature.stats}</span>
              </div>

              {/* Hover Effect Line */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-2 bg-linear-to-r ${feature.gradient} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>

              {/* Decorative Element */}
              <div
                className={`absolute -top-4 -right-4 w-24 h-24 bg-linear-to-br ${feature.gradient} rounded-full opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 border border-blue-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <p className="text-gray-700 font-medium">Active Users</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                99%
              </div>
              <p className="text-gray-700 font-medium">Satisfaction Rate</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <p className="text-gray-700 font-medium">Support Available</p>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
                1M+
              </div>
              <p className="text-gray-700 font-medium">Matches Made</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 bg-white rounded-2xl px-8 py-6 shadow-lg">
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Ready to get started?
              </h3>
              <p className="text-gray-600">
                Join thousands who have found success with JobLink
              </p>
            </div>
            <div className="flex space-x-4">
              <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                Sign Up Free
              </button>
              <button className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors duration-300">
                See Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
