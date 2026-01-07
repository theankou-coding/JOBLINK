"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Check,
  X,
  Zap,
  Users,
  Building,
  Shield,
  Globe,
  Star,
  Award,
  Target,
  TrendingUp,
  Clock,
  MessageSquare,
  FileText,
  Download,
  HelpCircle,
} from "lucide-react";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [currency, setCurrency] = useState<"usd" | "khr">("usd");

  const plans = [
    {
      name: "Free",
      description: "Perfect for job seekers and small businesses starting out",
      price: {
        monthly: { usd: 0, khr: 0 },
        yearly: { usd: 0, khr: 0 },
      },
      icon: <Zap className="w-8 h-8" />,
      color: "from-gray-400 to-gray-600",
      popular: false,
      features: [
        { text: "Create job seeker profile", included: true },
        { text: "Apply to 10 jobs per month", included: true },
        { text: "Basic job search filters", included: true },
        { text: "Community forum access", included: true },
        { text: "Email support", included: true },
        { text: "Advanced analytics", included: false },
        { text: "Priority job applications", included: false },
        { text: "Resume review", included: false },
        { text: "Direct employer messaging", included: false },
      ],
      cta: "Get Started Free",
      ctaColor: "bg-gray-600 hover:bg-gray-700",
    },
    {
      name: "Pro",
      description: "For serious job seekers and growing businesses",
      price: {
        monthly: { usd: 1, khr: 4000 },
        yearly: { usd: 12, khr: 48000 },
      },
      icon: <Target className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      popular: true,
      features: [
        { text: "Unlimited job applications", included: true },
        { text: "Advanced AI job matching", included: true },
        { text: "Priority in search results", included: true },
        { text: "Direct messaging with employers", included: true },
        { text: "Resume/CV builder", included: true },
        { text: "Interview preparation tools", included: true },
        { text: "Skill assessment tests", included: true },
        { text: "Career coaching sessions (2/month)", included: true },
        { text: "Analytics dashboard", included: true },
      ],
      cta: "Start 14-Day Free Trial",
      ctaColor:
        "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700",
    },
    {
      name: "Business",
      description: "For companies serious about hiring local talent",
      price: {
        monthly: { usd: 3, khr: 12000 },
        yearly: { usd: 36, khr: 144000 },
      },
      icon: <Building className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      popular: false,
      features: [
        { text: "Everything in Pro", included: true },
        { text: "Unlimited job postings", included: true },
        { text: "Advanced candidate filtering", included: true },
        { text: "Bulk applicant management", included: true },
        { text: "Custom branded career page", included: true },
        { text: "Team collaboration tools", included: true },
        { text: "API access", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "HRIS integration", included: true },
      ],
      cta: "Contact Sales",
      ctaColor:
        "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
    },
  ];

  const featuresComparison = [
    {
      category: "Job Seeker Features",
      items: [
        {
          name: "Job Applications",
          free: "10/month",
          pro: "Unlimited",
          business: "Unlimited",
        },
        {
          name: "AI Job Matching",
          free: "Basic",
          pro: "Advanced",
          business: "Advanced",
        },
        {
          name: "Priority Applications",
          free: false,
          pro: true,
          business: true,
        },
        { name: "Resume Builder", free: false, pro: true, business: true },
        {
          name: "Interview Prep",
          free: false,
          pro: "Basic",
          business: "Advanced",
        },
        {
          name: "Career Coaching",
          free: false,
          pro: "2 sessions",
          business: "Unlimited",
        },
      ],
    },
    {
      category: "Employer Features",
      items: [
        {
          name: "Job Postings",
          free: false,
          pro: "5/month",
          business: "Unlimited",
        },
        {
          name: "Candidate Messages",
          free: false,
          pro: "50/month",
          business: "Unlimited",
        },
        {
          name: "Applicant Tracking",
          free: false,
          pro: "Basic",
          business: "Advanced",
        },
        {
          name: "Branded Career Page",
          free: false,
          pro: false,
          business: true,
        },
        { name: "Team Members", free: "1", pro: "3", business: "10+" },
        { name: "API Access", free: false, pro: false, business: true },
      ],
    },
    {
      category: "Support & Security",
      items: [
        { name: "Email Support", free: true, pro: true, business: true },
        { name: "Phone Support", free: false, pro: false, business: true },
        { name: "Dedicated Manager", free: false, pro: false, business: true },
        { name: "Data Encryption", free: true, pro: true, business: true },
        { name: "GDPR Compliance", free: true, pro: true, business: true },
        { name: "Uptime SLA", free: "99%", pro: "99.5%", business: "99.9%" },
      ],
    },
  ];

  const savings = billingCycle === "yearly" ? "Save 16%" : "";

  const formatPrice = (price: number, currency: "usd" | "khr") => {
    if (currency === "usd") {
      return `$${price.toFixed(2)}`;
    }
    return `${price.toLocaleString()}៛`;
  };

  const currencySymbol = currency === "usd" ? "$" : "៛";

  return (
    <section className="py-20 mt-10 md:py-28 bg-linear-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <Award className="w-4 h-4" />
            TRANSPARENT PRICING
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Simple, Fair Pricing
            <span className="block text-3xl md:text-4xl text-blue-600 mt-2">
              For Every Cambodian Community
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 text-lg"
          >
            Choose the plan that works for you. All plans include core features
            to connect job seekers with employers in Cambodia.
          </motion.p>
        </div>

        {/* Currency & Billing Toggle */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium">Currency:</span>
            <div className="inline-flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setCurrency("usd")}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  currency === "usd"
                    ? "bg-white text-blue-600 shadow"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency("khr")}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  currency === "khr"
                    ? "bg-white text-blue-600 shadow"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                KHR (៛)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium">Billing:</span>
            <div className="inline-flex bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  billingCycle === "monthly"
                    ? "bg-white text-blue-600 shadow"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-4 py-2 rounded-md font-medium transition-all ${
                  billingCycle === "yearly"
                    ? "bg-white text-blue-600 shadow"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Yearly{" "}
                {savings && (
                  <span className="ml-1 text-sm text-green-600">
                    ({savings})
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl border-2 ${
                plan.popular
                  ? "border-blue-500 shadow-2xl transform md:-translate-y-4"
                  : "border-gray-200 shadow-lg"
              } bg-white overflow-hidden`}
            >
              {plan.popular && (
                <div className="absolute top-0 mt-5 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-linear-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    MOST POPULAR
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-xl bg-linear-to-r ${plan.color} flex items-center justify-center`}
                  >
                    <div className="text-white">{plan.icon}</div>
                  </div>
                  {plan.popular && (
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm font-medium text-gray-600">
                        4.8/5
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-gray-900">
                      {formatPrice(
                        plan.price[billingCycle][currency],
                        currency
                      )}
                    </span>
                    {plan.price.monthly[currency] > 0 && (
                      <span className="text-gray-500 ml-2">
                        /{billingCycle === "monthly" ? "month" : "year"}
                      </span>
                    )}
                  </div>
                  {plan.price.monthly[currency] > 0 &&
                    billingCycle === "yearly" && (
                      <p className="text-green-600 text-sm mt-2">
                        Save {currencySymbol}
                        {(
                          plan.price.monthly[currency] * 12 -
                          plan.price.yearly[currency]
                        ).toLocaleString()}
                        annually
                      </p>
                    )}
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-gray-300 mr-3 flex-shrink-0 mt-0.5" />
                      )}
                      <span
                        className={
                          feature.included ? "text-gray-700" : "text-gray-400"
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`w-full py-3 rounded-xl text-white font-semibold transition-all duration-300 ${plan.ctaColor} shadow-lg hover:shadow-xl`}
                >
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Compare All Features
          </h3>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-6 px-8 font-semibold text-gray-900 min-w-[300px]">
                      Features
                    </th>
                    <th className="text-center py-6 px-4 font-semibold text-gray-700 min-w-[200px]">
                      Free
                    </th>
                    <th className="text-center py-6 px-4 font-semibold text-blue-600 min-w-[200px] bg-blue-50">
                      Pro
                    </th>
                    <th className="text-center py-6 px-4 font-semibold text-purple-600 min-w-[200px]">
                      Business
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {featuresComparison.map((category, catIdx) => (
                    <tr key={catIdx} className="border-t border-gray-100">
                      <td colSpan={4} className="py-4 px-8">
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {category.category}
                        </h4>
                      </td>
                    </tr>
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
                question: "Can I switch plans later?",
                answer:
                  "Yes! You can upgrade, downgrade, or cancel your plan at any time. Changes take effect immediately.",
              },
              {
                question: "Do you offer discounts for NGOs or non-profits?",
                answer:
                  "Yes! We offer special pricing for registered NGOs and non-profit organizations in Cambodia. Contact our sales team.",
              },
              {
                question: "Is there a free trial?",
                answer:
                  "Yes! All paid plans come with a 14-day free trial. No credit card required to start.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept Visa, MasterCard, PayPal, ABA Bank, and other local payment methods in Cambodia.",
              },
              {
                question: "Can I pay in Cambodian Riel?",
                answer:
                  "Yes! You can pay in USD or KHR. All prices are clearly displayed in both currencies.",
              },
              {
                question: "Do you offer refunds?",
                answer:
                  "We offer a 30-day money-back guarantee on annual plans. Monthly plans can be cancelled anytime.",
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
                  <HelpCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" />
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
            <h3 className="text-3xl font-bold mb-6">Still Have Questions?</h3>
            <p className="text-blue-100 text-lg mb-8">
              Our team is here to help you choose the right plan for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-2xl transition-all duration-300">
                Schedule a Demo
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
                Contact Sales
              </button>
            </div>
            <p className="text-blue-100 text-sm mt-8">
              ✨ 1,500+ businesses trust JobLink • 24/7 support • 99.9% uptime
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
