"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="mt-10 w-full bg-linear-to-b from-white to-blue-50 pt-20 md:pt-28 pb-16 md:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center px-4 sm:px-6 lg:px-8 gap-12 lg:gap-20">
        {/* Left Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center order-2 lg:order-1"
        >
          {/* Tagline Badge */}
          <div className="inline-flex items-center justify-start mb-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative overflow-hidden"
            >
              <div className="bg-linear-to-r from-blue-600 via-blue-500 to-purple-600 text-white px-5 py-2.5 rounded-full text-sm md:text-base font-semibold shadow-lg shadow-blue-500/30">
                Discover Jobs. Connect Faster. Work Smarter.
              </div>
              <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-purple-600 rounded-full blur opacity-30 -z-10"></div>
            </motion.div>
          </div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="block bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              JobLink:
            </span>
            <span className="block text-gray-800 text-2xl sm:text-3xl md:text-4xl font-semibold mt-2">
              Your community&apos;s gateway to jobs, hiring, and growth.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-600 text-base sm:text-lg md:text-xl mb-8 leading-relaxed max-w-2xl"
          >
            Discover job opportunities that match your skills and goals. All
            from people and businesses in your community.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10"
          >
            <Link
              href="/signup"
              className="group relative bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-2xl hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300 text-center text-lg min-w-[200px] overflow-hidden"
            >
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-linear-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              href="/demo"
              className="group flex items-center justify-center gap-3 min-w-[200px] px-6 py-4 border border-gray-300 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all duration-300"
            >
              <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-linear-to-r from-blue-50 to-purple-50 group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-300 shadow-sm">
                <span className="text-blue-600 text-lg">▶</span>
              </div>
              <div className="text-left">
                <span className="text-gray-700 font-semibold text-lg group-hover:text-blue-600 transition-colors block">
                  See How it Works
                </span>
                <span className="text-gray-500 text-sm">3 min demo</span>
              </div>
            </Link>
          </motion.div>

          {/* Features Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6"
          >
            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 group">
              <div className="w-10 h-10 bg-linear-to-r from-green-100 to-green-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div>
                <span className="text-gray-700 font-medium block">
                  No download needed
                </span>
                <span className="text-gray-500 text-sm">Works in browser</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 group">
              <div className="w-10 h-10 bg-linear-to-r from-blue-100 to-blue-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <span className="text-gray-700 font-medium block">
                  Affordable job platform
                </span>
                <span className="text-gray-500 text-sm">No hidden fees</span>
              </div>
            </div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <p className="text-gray-500 text-sm mb-4">
              Trusted by businesses across Cambodia
            </p>
            <div className="flex flex-wrap items-center gap-6">
              {["Phnom Penh", "Siem Reap", "Battambang", "Sihanoukville"].map(
                (city, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-700 font-medium">{city}</span>
                  </div>
                )
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Image - Phone Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex justify-center items-center order-1 lg:order-2 mb-8 lg:mb-0"
        >
          <div className="relative w-full max-w-md lg:max-w-xl">
            {/* Main Phone Mockup */}
            <div className="relative z-10">
              {/* Floating elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-linear-to-r from-blue-500 to-purple-500 rounded-2xl opacity-10 blur-xl animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-linear-to-r from-green-500 to-blue-500 rounded-3xl opacity-10 blur-xl animate-pulse delay-1000"></div>

              {/* Phone Mockup Container */}
              <div className="relative bg-linear-to-br from-gray-900 to-black rounded-[3rem] p-6 shadow-2xl border-8 border-gray-900">
                {/* Phone Screen */}
                <div className="bg-linear-to-br from-blue-50 to-gray-50 rounded-3xl overflow-hidden">
                  <div className="h-96 flex flex-col items-center justify-center p-6">
                    {/* App Header */}
                    <div className="w-full flex items-center justify-between mb-8">
                      <div className="w-8 h-8 bg-linear-to-r from-blue-600 to-purple-600 rounded-full"></div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-gray-800">
                          JobLink
                        </div>
                        <div className="text-xs text-gray-500">
                          Your community jobs
                        </div>
                      </div>
                      <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                    </div>

                    {/* Job Cards */}
                    <div className="space-y-4 w-full">
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-800">
                              Cafe Staff Needed
                            </h3>
                            <p className="text-sm text-gray-600">
                              Phnom Penh • $250/mo
                            </p>
                          </div>
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            New
                          </span>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-800">
                              Tutor for Math
                            </h3>
                            <p className="text-sm text-gray-600">
                              Siem Reap • $15/hr
                            </p>
                          </div>
                          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            Flexible
                          </span>
                        </div>
                      </div>
                      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-bold text-gray-800">
                              Shop Assistant
                            </h3>
                            <p className="text-sm text-gray-600">
                              Battambang • Part-time
                            </p>
                          </div>
                          <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                            Urgent
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Navigation */}
                    <div className="mt-8 w-full flex justify-around">
                      {["Home", "Search", "Jobs", "Chat", "Profile"].map(
                        (item, index) => (
                          <div key={index} className="text-center">
                            <div className="w-6 h-6 mx-auto mb-1 bg-gray-200 rounded-full"></div>
                            <span className="text-xs text-gray-600">
                              {item}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Home Button */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-16 h-1 bg-gray-800 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Floating Notification */}
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 z-20">
              <div className="bg-white rounded-xl p-3 shadow-lg border border-gray-200 animate-bounce">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-linear-to-r from-green-500 to-green-400 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-800">
                      Job Matched!
                    </p>
                    <p className="text-xs text-gray-500">5 new opportunities</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Message */}
            <div className="absolute bottom-0 left-0 transform -translate-x-4 translate-y-4 z-20">
              <div className="bg-white rounded-xl p-3 shadow-lg border border-gray-200 animate-bounce delay-500">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-linear-to-r from-blue-500 to-blue-400 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-800">
                      New Message
                    </p>
                    <p className="text-xs text-gray-500">From employer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
