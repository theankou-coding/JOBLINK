/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Sparkles,
  Users,
  MessageSquare,
  Zap,
  TrendingUp,
} from "lucide-react";

const JobLinkHero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const features = [
    {
      title: "Smart Job Discovery",
      description:
        "Advanced filters and AI recommendations help you find the perfect match instantly.",
      icon: <Sparkles className="w-6 h-6" />,
    },
    {
      title: "Effortless Job Posting",
      description:
        "Create professional listings for all job types in under 5 minutes.",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      title: "Direct Communication",
      description:
        "Chat instantly, share files, and stay connected with applicants or employers.",
      icon: <MessageSquare className="w-6 h-6" />,
    },
    {
      title: "Stay Informed & Updated",
      description:
        "Personalized notifications ensure you never miss important updates.",
      icon: <CheckCircle className="w-6 h-6" />,
    },
    {
      title: "Boosted Visibility",
      description:
        "Featured listings help businesses reach more qualified candidates.",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      title: "Community Driven",
      description:
        "Connect with verified local professionals and businesses in your area.",
      icon: <Users className="w-6 h-6" />,
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Users" },
    { value: "2K+", label: "Jobs Posted" },
    { value: "95%", label: "Success Rate" },
    { value: "24/7", label: "Support" },
  ];

  const cities = [
    "Phnom Penh",
    "Siem Reap",
    "Battambang",
    "Sihanoukville",
    "Kampong Cham",
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50 p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl shadow-blue-500/10 p-6 md:p-12 relative overflow-hidden border border-gray-100/50">
        {/* Static background decorations */}
        <div className="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-linear-to-bl from-blue-500/10 to-blue-600/10 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-green-500/10 to-blue-500/10 rounded-tr-full"></div>

        {/* Client-only animated elements */}
        <AnimatePresence>
          {isMounted && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 1 }}
                className="absolute top-10 left-10 w-24 h-24 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute bottom-10 right-10 w-32 h-32 bg-linear-to-r from-green-500/20 to-blue-500/20 rounded-full blur-xl"
              />
            </>
          )}
        </AnimatePresence>

        <div className="relative z-10">
          {/* Static Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-linear-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full border border-blue-100 mb-6">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-semibold text-blue-700">
                Trusted by 10,000+ Cambodians
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Community Job Search,{" "}
              <span className="relative">
                <span className="relative z-10 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Simplified.
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-full"></span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              No more confusing websites or unreliable social media posts.
              JobLink brings trustworthy local job listings, quick-applications,
              and real-time messaging into a single, easy-to-use platform.
            </p>
          </div>

          {/* Stats - Static with client-only hover effects */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1 }}
                whileHover={isMounted ? { y: -5 } : {}}
                className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100"
              >
                <div className="text-2xl md:text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Features Grid - Static with client-only animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1 }}
                whileHover={isMounted ? { y: -5 } : {}}
                className="group bg-linear-to-br from-white to-gray-50/50 p-6 rounded-2xl border border-gray-100"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <div className="text-white">{feature.icon}</div>
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-gray-200 to-transparent my-12"></div>

          {/* CTA Section */}
          <div className="relative bg-linear-to-r from-blue-600 via-blue-500 to-purple-600 rounded-3xl p-8 md:p-12 text-center overflow-hidden">
            <AnimatePresence>
              {isMounted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.1 }}
                  className="absolute inset-0"
                >
                  <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Join Cambodia&apos;s Fastest Growing Job Platform
              </h2>

              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Connect with verified professionals and opportunities in your
                community. Whether you&apos;re hiring or looking for work,
                we&apos;ve got you covered.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <motion.button
                  whileHover={isMounted ? { scale: 1.05 } : {}}
                  whileTap={isMounted ? { scale: 0.95 } : {}}
                  className="group px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl flex items-center justify-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  <span>Find a Job</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </motion.button>
                <motion.button
                  whileHover={isMounted ? { scale: 1.05 } : {}}
                  whileTap={isMounted ? { scale: 0.95 } : {}}
                  className="group px-8 py-4 bg-transparent border-2 border-white/40 text-white font-semibold rounded-xl flex items-center justify-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  <span>Post a Job</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </motion.button>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Sign up in 30 seconds</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Free forever plan</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-500 text-sm mb-6">
              Trusted by businesses across Cambodia
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {cities.map((city, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-700 font-medium"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  {city}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobLinkHero;
