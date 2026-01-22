"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  X,
  Zap,
  Target,
  TrendingUp,
  Star,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import React from "react";

const Pricing = () => {
  const [selectedPackage, setSelectedPackage] = useState<
    "basic" | "pro" | "premium"
  >("pro");

  const featurePackages = [
    {
      id: "basic",
      name: "Basic Boost",
      tagline: "Perfect for testing",
      price: 1,
      featuresCount: 3,
      savings: null,
      icon: <Zap className="w-8 h-8" />,
      color: "from-gray-400 to-gray-600",
      popular: false,
      features: [
        { text: "3 featured posts", included: true },
        { text: "30 days visibility", included: true },
        { text: "Standard placement", included: true },
        { text: "Priority in search", included: false },
        { text: "Top of category", included: false },
        { text: "Analytics dashboard", included: false },
        { text: "Performance insights", included: false },
      ],
      cta: "Buy Now",
      ctaColor: "bg-gray-600 hover:bg-gray-700",
    },
    {
      id: "pro",
      name: "Pro Package",
      tagline: "Most popular choice",
      price: 3,
      featuresCount: 10,
      savings: "Save 23%",
      icon: <Target className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      popular: true,
      features: [
        { text: "10 featured posts", included: true },
        { text: "45 days visibility", included: true },
        { text: "Priority placement", included: true },
        { text: "Top of search results", included: true },
        { text: "Category highlights", included: true },
        { text: "Detailed analytics", included: true },
        { text: "Performance insights", included: true },
      ],
      cta: "Get Pro Package",
      ctaColor:
        "bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
    },
    {
      id: "premium",
      name: "Premium Bundle",
      tagline: "Maximum visibility",
      price: 10,
      featuresCount: 40,
      savings: "Save 33%",
      icon: <TrendingUp className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      popular: false,
      features: [
        { text: "40 featured posts", included: true },
        { text: "60 days visibility", included: true },
        { text: "Premium placement", included: true },
        { text: "Always on top", included: true },
        { text: "Homepage spotlight", included: true },
        { text: "Advanced analytics", included: true },
        { text: "AI insights & recommendations", included: true },
        { text: "Dedicated support", included: true },
      ],
      cta: "Get Premium",
      ctaColor:
        "bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
    },
  ];

  const featureComparison = [
    {
      category: "Visibility Features",
      items: [
        {
          name: "Featured Post Duration",
          basic: "30 days",
          pro: "45 days",
          premium: "60 days",
        },
        {
          name: "Search Result Placement",
          basic: "Standard",
          pro: "Priority (Top 3)",
          premium: "Premium (Always Top)",
        },
        {
          name: "Category Highlight",
          basic: false,
          pro: true,
          premium: "Spotlight Position",
        },
        {
          name: "Homepage Visibility",
          basic: false,
          pro: false,
          premium: true,
        },
        {
          name: "Mobile App Priority",
          basic: false,
          pro: true,
          premium: true,
        },
        {
          name: "Email Newsletter Feature",
          basic: false,
          pro: "Monthly",
          premium: "Weekly",
        },
      ],
    },
    {
      category: "Analytics & Insights",
      items: [
        {
          name: "Basic Analytics",
          basic: true,
          pro: true,
          premium: true,
        },
        {
          name: "Detailed Performance",
          basic: false,
          pro: true,
          premium: true,
        },
        {
          name: "AI Recommendations",
          basic: false,
          pro: "Basic",
          premium: "Advanced",
        },
        {
          name: "Competitor Analysis",
          basic: false,
          pro: false,
          premium: true,
        },
        {
          name: "Real-time Notifications",
          basic: false,
          pro: true,
          premium: true,
        },
        {
          name: "Export Data",
          basic: false,
          pro: "CSV",
          premium: "CSV & PDF",
        },
      ],
    },
    {
      category: "Support & Management",
      items: [
        { name: "Email Support", basic: true, pro: true, premium: true },
        { name: "Priority Support", basic: false, pro: true, premium: true },
        { name: "Dedicated Manager", basic: false, pro: false, premium: true },
        { name: "Batch Management", basic: false, pro: true, premium: true },
        { name: "Schedule Posts", basic: false, pro: true, premium: true },
        { name: "Auto-renewal", basic: true, pro: true, premium: true },
      ],
    },
  ];

  const formatPrice = (price: number) => {
    return `$${price.toFixed(0)}`;
  };

  const calculateValue = (price: number, count: number) => {
    return (count / price).toFixed(1);
  };

  return (
    <section className="py-20 mt-10 md:py-28 bg-linear-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-linear-to-r from-blue-50 to-cyan-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <Sparkles className="w-4 h-4" />
            BOOST YOUR VISIBILITY
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Feature Your Posts & Get Noticed
            <span className="block text-3xl md:text-4xl text-blue-600 mt-2">
              More Visibility, Better Results
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 text-lg"
          >
            Purchase feature posts to increase visibility and engagement.
            Perfect for jobs, listings, or announcements that need to stand out.
          </motion.p>
        </div>

        {/* Package Toggle */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-gray-100 p-1 rounded-xl">
            {featurePackages.map((pkg) => (
              <button
                key={pkg.id}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick={() => setSelectedPackage(pkg.id as any)}
                className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  selectedPackage === pkg.id
                    ? "bg-white text-blue-600 shadow-lg"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {pkg.name}
                {pkg.popular && (
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Pricing Card */}
        <div className="max-w-4xl mx-auto mb-20">
          {featurePackages
            .filter((pkg) => pkg.id === selectedPackage)
            .map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative"
              >
                {/* Most Popular Tag - Positioned above the rectangle */}
                {pkg.popular && (
                  <div className="flex justify-center mb-4">
                    <div className="bg-linear-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg text-sm font-semibold shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div
                  className={`relative rounded-3xl border-2 ${
                    pkg.popular
                      ? "border-blue-500 shadow-2xl"
                      : "border-gray-200 shadow-xl"
                  } bg-white overflow-hidden`}
                >
                  <div className="p-8 md:p-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Left Column - Package Info */}
                      <div className="lg:col-span-2">
                        <div className="flex items-start justify-between mb-8">
                          <div>
                            <div className="flex items-center gap-4 mb-4">
                              <div
                                className={`w-16 h-16 rounded-2xl bg-linear-to-r ${pkg.color} flex items-center justify-center`}
                              >
                                <div className="text-white">{pkg.icon}</div>
                              </div>
                              <div>
                                <h3 className="text-3xl font-bold text-gray-900">
                                  {pkg.name}
                                </h3>
                                <p className="text-gray-600">{pkg.tagline}</p>
                              </div>
                            </div>
                          </div>
                          {pkg.savings && (
                            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-lg font-semibold">
                              {pkg.savings}
                            </div>
                          )}
                        </div>

                        {/* Value Proposition */}
                        <div className="bg-linear-to-r from-blue-50 to-cyan-50 rounded-2xl p-6 mb-8">
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div className="text-center">
                              <div className="text-5xl font-bold text-gray-900">
                                {pkg.featuresCount}
                              </div>
                              <div className="text-gray-600">
                                Featured Posts
                              </div>
                            </div>
                            <div className="text-3xl text-gray-300">×</div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">
                                {calculateValue(pkg.price, pkg.featuresCount)}
                              </div>
                              <div className="text-gray-600">Posts per $1</div>
                            </div>
                            <div className="text-3xl text-gray-300">=</div>
                            <div className="text-center">
                              <div className="text-4xl font-bold text-gray-900">
                                {formatPrice(pkg.price)}
                              </div>
                              <div className="text-gray-600">Total Price</div>
                            </div>
                          </div>
                        </div>

                        {/* Features List */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {pkg.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start">
                              {feature.included ? (
                                <Check className="w-6 h-6 text-green-500 mr-3 shrink-0 mt-0.5" />
                              ) : (
                                <X className="w-6 h-6 text-gray-300 mr-3 shrink-0 mt-0.5" />
                              )}
                              <span
                                className={
                                  feature.included
                                    ? "text-gray-800 font-medium"
                                    : "text-gray-400"
                                }
                              >
                                {feature.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Column - Purchase Box */}
                      <div className="lg:col-span-1">
                        <div className="bg-gray-50 rounded-2xl p-6 sticky top-8">
                          <div className="text-center mb-8">
                            <div className="text-5xl font-bold text-gray-900 mb-2">
                              {formatPrice(pkg.price)}
                            </div>
                            <div className="text-gray-600">
                              for {pkg.featuresCount} featured posts
                            </div>
                          </div>

                          <div className="space-y-4 mb-8">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">
                                Posts included:
                              </span>
                              <span className="font-semibold">
                                {pkg.featuresCount}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">
                                Value per post:
                              </span>
                              <span className="font-semibold">
                                ${(pkg.price / pkg.featuresCount).toFixed(2)}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">
                                Visibility period:
                              </span>
                              <span className="font-semibold">
                                {pkg.features
                                  .find((f) => f.text.includes("days"))
                                  ?.text.match(/\d+/)?.[0] || "30"}{" "}
                                days
                              </span>
                            </div>
                          </div>

                          <button
                            className={`w-full py-4 rounded-xl text-white font-semibold text-lg transition-all duration-300 ${pkg.ctaColor} shadow-lg hover:shadow-xl mb-4`}
                          >
                            {pkg.cta}
                          </button>

                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-2">
                              <Check className="w-4 h-4 text-green-500" />
                              No recurring charges
                            </div>
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                              <Check className="w-4 h-4 text-green-500" />
                              Use anytime within 1 year
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* All Packages Grid */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Compare All Packages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featurePackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Most Popular Tag for grid items */}
                {pkg.popular && (
                  <div className="flex justify-center mb-4">
                    <div className="bg-linear-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
                      POPULAR
                    </div>
                  </div>
                )}

                <div
                  className={`relative rounded-2xl border-2 ${
                    pkg.popular
                      ? "border-blue-500 shadow-xl"
                      : "border-gray-200 shadow-lg"
                  } bg-white p-6`}
                >
                  <div className="text-center mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl bg-linear-to-r ${pkg.color} flex items-center justify-center mx-auto mb-4`}
                    >
                      <div className="text-white">{pkg.icon}</div>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900">
                      {pkg.name}
                    </h4>
                    <p className="text-gray-600 text-sm">{pkg.tagline}</p>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {formatPrice(pkg.price)}
                    </div>
                    <div className="text-gray-600">
                      {pkg.featuresCount} featured posts
                    </div>
                    {pkg.savings && (
                      <div className="text-green-600 text-sm mt-2 font-medium">
                        {pkg.savings}
                      </div>
                    )}
                  </div>

                  <ul className="space-y-3 mb-6">
                    {pkg.features.slice(0, 4).map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        {feature.included ? (
                          <Check className="w-4 h-4 text-green-500 mr-2 shrink-0" />
                        ) : (
                          <X className="w-4 h-4 text-gray-300 mr-2 shrink-0" />
                        )}
                        <span className="text-sm text-gray-700">
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onClick={() => setSelectedPackage(pkg.id as any)}
                    className={`w-full py-3 rounded-lg font-semibold transition-all ${
                      pkg.id === selectedPackage
                        ? pkg.ctaColor + " text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {pkg.id === selectedPackage ? "Selected" : "Select Package"}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Detailed Feature Comparison
          </h3>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-6 px-8 font-semibold text-gray-900 min-w-75">
                      Feature
                    </th>
                    <th className="text-center py-6 px-4 font-semibold text-gray-700 min-w-50">
                      Basic Boost
                    </th>
                    <th className="text-center py-6 px-4 font-semibold text-blue-600 min-w-50 bg-blue-50">
                      Pro Package
                    </th>
                    <th className="text-center py-6 px-4 font-semibold text-purple-600 min-w-50">
                      Premium Bundle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {featureComparison.map((category, catIdx) => (
                    <React.Fragment key={catIdx}>
                      <tr className="border-t border-gray-100">
                        <td colSpan={4} className="py-4 px-8 bg-gray-50">
                          <h4 className="font-semibold text-gray-900 text-lg">
                            {category.category}
                          </h4>
                        </td>
                      </tr>
                      {category.items.map((item, itemIdx) => (
                        <tr
                          key={itemIdx}
                          className="border-t border-gray-100 hover:bg-gray-50"
                        >
                          <td className="py-4 px-8 font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="py-4 px-4 text-center">
                            {typeof item.basic === "boolean" ? (
                              item.basic ? (
                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-gray-300 mx-auto" />
                              )
                            ) : (
                              <span className="text-gray-700">
                                {item.basic}
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-center bg-blue-50">
                            {typeof item.pro === "boolean" ? (
                              item.pro ? (
                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-gray-300 mx-auto" />
                              )
                            ) : (
                              <span className="text-blue-600 font-medium">
                                {item.pro}
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-center">
                            {typeof item.premium === "boolean" ? (
                              item.premium ? (
                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-gray-300 mx-auto" />
                              )
                            ) : (
                              <span className="text-purple-600 font-medium">
                                {item.premium}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: "How long do featured posts stay active?",
                answer:
                  "Featured posts stay active for the duration specified in your package (30-60 days). You can refresh them anytime.",
              },
              {
                question: "Can I use multiple posts at once?",
                answer:
                  "Yes! You can feature multiple posts simultaneously or schedule them for future dates.",
              },
              {
                question: "What happens if I don't use all my featured posts?",
                answer:
                  "Unused featured posts remain in your account for 1 year from purchase date.",
              },
              {
                question: "Can I upgrade my package later?",
                answer:
                  "Absolutely! You can upgrade anytime. We'll prorate the difference based on unused posts.",
              },
              {
                question: "Do featured posts work for all content types?",
                answer:
                  "Yes! Feature posts work for jobs, listings, announcements, and any other content on our platform.",
              },
              {
                question: "Is there a money-back guarantee?",
                answer:
                  "We offer a 7-day satisfaction guarantee on all feature post purchases.",
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-200 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-linear-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-6">Need More Posts?</h3>
            <p className="text-blue-100 text-lg mb-8">
              Contact us for custom enterprise packages with unlimited featured
              posts and premium placement options.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-2xl transition-all duration-300">
                Get Custom Quote
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
                View Examples
              </button>
            </div>
            <p className="text-blue-100 text-sm mt-8">
              ✨ 5,000+ featured posts active • 24/7 support • 99.9% uptime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
