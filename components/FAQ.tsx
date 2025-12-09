// components/FAQ.jsx
"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "Is JobLink really free to use?",
      answer:
        "Yes! Job seekers can browse and apply for free. Employers can post their jobs at no cost.",
    },
    {
      question: "What types of jobs can I post?",
      answer:
        "Anything from full-time positions to same-day gigs and freelance tasks for your home or business.",
    },
    {
      question: "How do you verify users?",
      answer:
        "We manually check business profiles to ensure legitimacy and build a trusted community.",
    },
    {
      question: "Can I use it on my phone?",
      answer:
        "Absolutely! Our web app works perfectly on any smartphone browser — no download needed.",
    },
    {
      question: "How does the AI job matching work?",
      answer:
        "Our system learns from your profile and activity to suggest the most relevant local opportunities.",
    },
    {
      question: "Is there customer support?",
      answer:
        "Yes! We offer email support for all users and priority support for verified businesses. Most queries are answered within 24 hours.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Need support? Find answers to common questions
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full px-6 py-4 pl-14 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-lg"
              />
              <svg
                className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
              </svg>
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-shadow duration-300">
                Search
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-3 text-center">
              Can&#39;t find your answer?{" "}
              <a href="#" className="text-blue-600 font-medium hover:underline">
                Contact our support team
              </a>
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl border transition-all duration-300 ${
                openIndex === index
                  ? "border-blue-200 shadow-lg"
                  : "border-gray-200 hover:border-blue-100 hover:shadow-md"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left focus:outline-none"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {/* Number Badge */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center mr-4 ${
                        openIndex === index
                          ? "bg-linear-to-r from-blue-500 to-blue-600 text-white"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    >
                      <span className="font-bold">0{index + 1}</span>
                    </div>

                    {/* Question */}
                    <h3 className="text-xl font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                  </div>

                  {/* Chevron Icon */}
                  <svg
                    className={`w-6 h-6 text-blue-600 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Answer */}
              <div
                className={`px-8 pb-6 transition-all duration-300 overflow-hidden ${
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex">
                  {/* Vertical Line */}
                  <div className="w-1 ml-5 mr-8 bg-linear-to-b from-blue-500 to-blue-300 rounded-full"></div>

                  {/* Answer Content */}
                  <div className="flex-1">
                    <p className="text-gray-600 text-lg leading-relaxed mb-4">
                      {faq.answer}
                    </p>

                    {/* Additional Info for specific FAQs */}
                    {index === 0 && (
                      <div className="bg-blue-50 rounded-xl p-4 mt-4">
                        <div className="flex items-center mb-2">
                          <svg
                            className="w-5 h-5 text-blue-600 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium text-blue-700">
                            No hidden fees
                          </span>
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-5 h-5 text-blue-600 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="font-medium text-blue-700">
                            No commission charges
                          </span>
                        </div>
                      </div>
                    )}

                    {index === 2 && (
                      <div className="bg-green-50 rounded-xl p-4 mt-4">
                        <h4 className="font-medium text-green-800 mb-2">
                          Our verification process includes:
                        </h4>
                        <ul className="space-y-1 text-green-700">
                          <li className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Business registration checks
                          </li>
                          <li className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Phone number verification
                          </li>
                          <li className="flex items-center">
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Email confirmation
                          </li>
                        </ul>
                      </div>
                    )}

                    {index === 4 && (
                      <div className="bg-purple-50 rounded-xl p-4 mt-4">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                            <svg
                              className="w-4 h-4 text-white"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div>
                            <span className="font-medium text-purple-800">
                              AI-powered matching
                            </span>
                            <p className="text-sm text-purple-600">
                              Getting smarter with every interaction
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {index === 5 && (
                      <div className="mt-4">
                        <a
                          href="#"
                          className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800"
                        >
                          <span>Visit our support center</span>
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            More Help Categories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "For Employers", icon: "💼", color: "blue" },
              { name: "For Job Seekers", icon: "🔍", color: "green" },
              { name: "Account & Profile", icon: "👤", color: "purple" },
              { name: "Safety & Security", icon: "🛡️", color: "red" },
            ].map((category, index) => (
              <a
                key={index}
                href="#"
                className={`group bg-white rounded-2xl p-6 text-center border border-gray-200 hover:border-${category.color}-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div
                  className={`text-3xl mb-3 group-hover:scale-110 transition-transform duration-300`}
                >
                  {category.icon}
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  {category.name}
                </h4>
                <div
                  className={`text-sm text-gray-500 group-hover:text-${category.color}-600`}
                >
                  Browse articles →
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full"></div>
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-white rounded-full"></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Still have questions?
            </h3>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
              Our support team is here to help you 7 days a week. We&apos;re
              committed to answering your questions within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email Support
              </button>
              <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                Live Chat
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="flex flex-wrap justify-center gap-8 text-sm">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-300 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>24/7 Help Center</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-300 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Average response: 4 hours</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-300 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Available in English & Khmer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
