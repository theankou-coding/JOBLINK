"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  UserPlus,
  Search,
  FileText,
  MessageSquare,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Zap,
  Award,
  Shield,
  Globe,
} from "lucide-react";

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<"job-seekers" | "employers">(
    "job-seekers"
  );

  const jobSeekerSteps = [
    {
      number: "01",
      icon: <UserPlus className="w-8 h-8" />,
      title: "Create Your Profile",
      description:
        "Sign up in 60 seconds. Add your skills, experience, and career goals.",
      details: [
        "Free account creation",
        "Upload resume/CV",
        "Add portfolio links",
        "Set job preferences",
      ],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      number: "02",
      icon: <Search className="w-8 h-8" />,
      title: "Discover Opportunities",
      description:
        "Browse verified jobs from local businesses using smart filters.",
      details: [
        "AI-powered job matching",
        "Location-based search",
        "Salary range filters",
        "Remote/On-site options",
      ],
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
    {
      number: "03",
      icon: <FileText className="w-8 h-8" />,
      title: "Apply in One Click",
      description:
        "Submit applications instantly using your pre-filled profile.",
      details: [
        "One-click applications",
        "Auto-fill forms",
        "Track applications",
        "Save favorite jobs",
      ],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
    },
    {
      number: "04",
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Connect & Interview",
      description: "Chat directly with employers and schedule interviews.",
      details: [
        "In-app messaging",
        "Video call scheduling",
        "Interview preparation",
        "Real-time notifications",
      ],
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
    },
    {
      number: "05",
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Get Hired & Grow",
      description:
        "Accept offers and continue your career journey with support.",
      details: [
        "Offer negotiation tips",
        "Contract review",
        "Career guidance",
        "Skill development",
      ],
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
    },
  ];

  const employerSteps = [
    {
      number: "01",
      icon: <Users className="w-8 h-8" />,
      title: "Create Company Profile",
      description: "Set up your business profile and verify your account.",
      details: [
        "Company verification",
        "Brand page setup",
        "Team member access",
        "Payment setup",
      ],
      color: "from-blue-600 to-blue-800",
      bgColor: "bg-blue-50",
    },
    {
      number: "02",
      icon: <FileText className="w-8 h-8" />,
      title: "Post Job Listing",
      description: "Create compelling job posts in minutes with our templates.",
      details: [
        "Job description templates",
        "Skill requirement tags",
        "Salary benchmarking",
        "Application screening",
      ],
      color: "from-purple-600 to-purple-800",
      bgColor: "bg-purple-50",
    },
    {
      number: "03",
      icon: <Search className="w-8 h-8" />,
      title: "Find Perfect Candidates",
      description: "Access pre-screened talent pool with AI matching.",
      details: [
        "AI candidate matching",
        "Resume screening",
        "Skill assessment",
        "Background check",
      ],
      color: "from-green-600 to-green-800",
      bgColor: "bg-green-50",
    },
    {
      number: "04",
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Manage Applications",
      description: "Streamline hiring with our applicant tracking system.",
      details: [
        "Application dashboard",
        "Candidate communication",
        "Interview scheduling",
        "Collaborative hiring",
      ],
      color: "from-orange-600 to-orange-800",
      bgColor: "bg-orange-50",
    },
    {
      number: "05",
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Hire & Onboard",
      description: "Complete hiring and onboard new team members smoothly.",
      details: [
        "Offer letter templates",
        "Contract management",
        "Onboarding checklist",
        "Integration tools",
      ],
      color: "from-indigo-600 to-indigo-800",
      bgColor: "bg-indigo-50",
    },
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Applications processed in seconds, not days",
      stat: "90% faster",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Verified Profiles",
      description: "All businesses and candidates are verified",
      stat: "100% verified",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Quality Matches",
      description: "AI-powered matching for better connections",
      stat: "85% match rate",
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Local Focus",
      description: "Connecting communities across Cambodia",
      stat: "50+ cities",
    },
  ];

  const testimonials = [
    {
      name: "Sophal Chen",
      role: "Software Developer",
      company: "Phnom Penh Tech",
      content:
        "Found my dream job in 2 weeks! The one-click application saved me hours.",
      avatar: "SC",
    },
    {
      name: "Srey Mom Restaurant",
      role: "Business Owner",
      company: "Siem Reap",
      content:
        "Hired 3 excellent staff members in one week. Game changer for small businesses!",
      avatar: "SR",
    },
    {
      name: "Vicheka Lim",
      role: "Marketing Manager",
      company: "Phnom Penh",
      content:
        "The local community focus means better cultural fit for our team.",
      avatar: "VL",
    },
  ];

  const steps = activeTab === "job-seekers" ? jobSeekerSteps : employerSteps;

  return (
    <section className="relative mt-10 py-20 md:py-28 bg-linear-to-b from-white to-gray-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-30 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <Zap className="w-4 h-4" />
            SIMPLE & EFFECTIVE
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            How JobLink Works
            <span className="block text-3xl md:text-4xl text-blue-600 mt-2">
              Your Path to Success
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg md:text-xl"
          >
            Whether you&apos;re looking for a job or hiring talent, JobLink
            makes the process simple, fast, and effective.
          </motion.p>
        </div>

        {/* Toggle Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab("job-seekers")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "job-seekers"
                  ? "bg-white text-blue-600 shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              For Job Seekers
            </button>
            <button
              onClick={() => setActiveTab("employers")}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "employers"
                  ? "bg-white text-blue-600 shadow-lg"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              For Employers
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="relative mb-20">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2"></div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Step Card */}
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 h-full hover:shadow-2xl transition-shadow duration-300">
                  {/* Step Number */}
                  <div
                    className={`absolute -top-4 -left-4 w-12 h-12 bg-linear-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl`}
                  >
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl ${step.bgColor} flex items-center justify-center mb-6`}
                  >
                    <div
                      className={`bg-linear-to-r ${step.color} bg-clip-text text-transparent`}
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{step.description}</p>

                  {/* Details List */}
                  <ul className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Connecting Arrow (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 bg-white border border-gray-200 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <div className="text-blue-600">{feature.icon}</div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                {feature.description}
              </p>
              <div className="text-2xl font-bold text-blue-600">
                {feature.stat}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Success Stories from Cambodia
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-6">
            Ready to{" "}
            {activeTab === "job-seekers"
              ? "Find Your Dream Job"
              : "Hire Top Talent"}
            ?
          </h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of Cambodians who have found success through JobLink.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-2xl transition-all duration-300">
              {activeTab === "job-seekers" ? "Start Job Search" : "Post a Job"}
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
              Watch Demo Video
            </button>
          </div>
          <p className="text-blue-100 text-sm mt-6">
            No credit card required • Free 30-day trial • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
