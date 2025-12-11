"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HelpCircle,
  User,
  Building,
  CreditCard,
  Shield,
  Globe,
  Smartphone,
  MessageSquare,
  Download,
  Users,
  Briefcase,
  FileText,
  Clock,
  Award,
  Zap,
  CheckCircle,
  XCircle,
} from "lucide-react";

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = [
    {
      id: "all",
      label: "All Questions",
      icon: <HelpCircle className="w-5 h-5" />,
    },
    {
      id: "job-seekers",
      label: "For Job Seekers",
      icon: <User className="w-5 h-5" />,
    },
    {
      id: "employers",
      label: "For Employers",
      icon: <Building className="w-5 h-5" />,
    },
    {
      id: "account",
      label: "Account & Pricing",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: "safety",
      label: "Safety & Trust",
      icon: <Shield className="w-5 h-5" />,
    },
  ];

  const faqs = [
    {
      id: 1,
      question: "How does JobLink work for job seekers?",
      answer:
        "JobLink connects you with local job opportunities in three simple steps: 1) Create your free profile with skills and experience, 2) Browse verified job listings from Cambodian businesses, 3) Apply directly with one-click applications. Our AI matching system recommends the best opportunities based on your profile.",
      category: "job-seekers",
      popular: true,
      icon: <User className="w-5 h-5" />,
    },
    {
      id: 2,
      question:
        "What makes JobLink different from other job platforms in Cambodia?",
      answer:
        "JobLink focuses specifically on the Cambodian market with: 1) Local language support (Khmer & English), 2) Verification of all businesses, 3) Community-based job matching, 4) Mobile-first design for smartphone users, 5) Affordable pricing in both USD and KHR, and 6) Dedicated customer support in Cambodia.",
      category: "all",
      popular: true,
      icon: <Globe className="w-5 h-5" />,
    },
    {
      id: 3,
      question: "Is JobLink free to use for job seekers?",
      answer:
        "Yes! Job seekers can: 1) Create a profile for free, 2) Browse all job listings, 3) Apply to 10 jobs per month, 4) Access basic career resources, 5) Join community forums. For unlimited applications and premium features, we offer affordable Pro and Business plans.",
      category: "account",
      popular: true,
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: 4,
      question: "How do I verify my business on JobLink?",
      answer:
        "Business verification is simple: 1) Provide your business registration number, 2) Upload business documents, 3) Verify your phone number, 4) Complete your company profile. Verification usually takes 24-48 hours and gives you a verified badge, increasing trust from job seekers.",
      category: "employers",
      popular: false,
      icon: <Building className="w-5 h-5" />,
    },
    {
      id: 5,
      question: "What safety measures are in place on JobLink?",
      answer:
        "We prioritize safety with: 1) Business verification for all employers, 2) Profile verification for job seekers, 3) Secure messaging system, 4) Report and block features, 5) Data encryption, 6) Privacy controls, 7) 24/7 moderation team based in Cambodia.",
      category: "safety",
      popular: false,
      icon: <Shield className="w-5 h-5" />,
    },
    {
      id: 6,
      question: "Can I use JobLink on my mobile phone?",
      answer:
        "Absolutely! JobLink is fully mobile-optimized with: 1) Responsive web design for all devices, 2) Fast loading on 3G/4G networks, 3) Mobile-friendly application process, 4) Push notifications for job alerts, 5) Camera upload for documents. No app download required - just visit joblink.com.kh in your browser.",
      category: "all",
      popular: false,
      icon: <Smartphone className="w-5 h-5" />,
    },
    {
      id: 7,
      question: "How do I contact employers or job seekers?",
      answer:
        "Communication is secure and easy: 1) Use our in-platform messaging system, 2) Schedule video interviews directly, 3) Share files and documents safely, 4) Set availability for calls, 5) Receive notifications for new messages. Never share personal contact information until you're comfortable.",
      category: "all",
      popular: false,
      icon: <MessageSquare className="w-5 h-5" />,
    },
    {
      id: 8,
      question: "What payment methods do you accept?",
      answer:
        "We accept multiple payment methods for Cambodian users: 1) Credit/Debit Cards (Visa, MasterCard), 2) ABA Bank transfers, 3) Wing money, 4) Pi Pay, 5) Bakong, 6) PayPal, 7) Cash at our Phnom Penh office. All payments are secure and encrypted.",
      category: "account",
      popular: false,
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      id: 9,
      question: "How long does it take to find a job through JobLink?",
      answer:
        "Most job seekers find opportunities within 2-4 weeks. Factors include: 1) Completeness of your profile, 2) Industry demand, 3) Location preferences, 4) Skill level. Pro members typically find jobs 40% faster with priority listing and AI matching.",
      category: "job-seekers",
      popular: true,
      icon: <Clock className="w-5 h-5" />,
    },
    {
      id: 10,
      question: "Can I hire freelancers or part-time workers?",
      answer:
        "Yes! JobLink supports all employment types: 1) Full-time positions, 2) Part-time jobs, 3) Freelance projects, 4) Internships, 5) Remote work, 6) Temporary contracts. Use our filters to specify employment type and hours required.",
      category: "employers",
      popular: false,
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 11,
      question: "Do I need to upload my resume/CV?",
      answer:
        "While not required, we recommend it: 1) Increases visibility to employers by 70%, 2) Enables one-click applications, 3) Our AI can suggest improvements, 4) You can create multiple versions for different jobs. We also offer a free resume builder tool.",
      category: "job-seekers",
      popular: false,
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: 12,
      question: "What happens if I'm not satisfied with the service?",
      answer:
        "We offer: 1) 14-day free trial for all paid plans, 2) 30-day money-back guarantee for annual subscriptions, 3) Free downgrade to basic plan anytime, 4) Priority support for troubleshooting, 5) Regular feedback sessions to improve our service.",
      category: "account",
      popular: false,
      icon: <Award className="w-5 h-5" />,
    },
    {
      id: 13,
      question: "Are there any hidden fees?",
      answer:
        "No hidden fees. Our pricing is completely transparent: 1) All features clearly listed, 2) No setup or cancellation fees, 3) No charge for basic job applications, 4) Clear renewal reminders, 5) Prorated refunds for unused time. What you see is what you pay.",
      category: "account",
      popular: true,
      icon: <Zap className="w-5 h-5" />,
    },
    {
      id: 14,
      question: "How do I report suspicious activity?",
      answer:
        "Report any concerns immediately: 1) Click 'Report' on any profile or message, 2) Email safety@joblink.com.kh, 3) Call our support line (+855 23 123 456), 4) Visit our Phnom Penh office. All reports are investigated within 24 hours.",
      category: "safety",
      popular: false,
      icon: <Shield className="w-5 h-5" />,
    },
    {
      id: 15,
      question: "Can I use JobLink in Khmer language?",
      answer:
        "Yes! JobLink fully supports Khmer: 1) Language toggle in top navigation, 2) All interface elements translated, 3) Khmer keyboard support, 4) Khmer-speaking support team, 5) Localized job descriptions. We're committed to serving all Cambodians in their preferred language.",
      category: "all",
      popular: false,
      icon: <Globe className="w-5 h-5" />,
    },
  ];

  const filteredFAQs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  const popularFAQs = faqs.filter((faq) => faq.popular);

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <HelpCircle className="w-4 h-4" />
            FREQUENTLY ASKED QUESTIONS
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Answers to Common Questions
            <span className="block text-3xl md:text-4xl text-blue-600 mt-2">
              Everything You Need to Know
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 text-lg"
          >
            Can&apos;t find what you&apos;re looking for? Contact our support
            team for personalized assistance.
          </motion.p>
        </div>

        {/* Popular Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500" />
            Most Popular Questions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {popularFAQs.map((faq) => (
              <button
                key={faq.id}
                onClick={() => toggleItem(faq.id)}
                className="text-left bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                      <div className="text-blue-600">{faq.icon}</div>
                    </div>
                    <span className="font-semibold text-gray-900">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`transform transition-transform duration-300 ${
                      openItems.includes(faq.id) ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
                <AnimatePresence>
                  {openItems.includes(faq.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-md"
              }`}
            >
              {category.icon}
              {category.label}
              <span className="text-sm px-2 py-1 rounded-full bg-white/20">
                {category.id === "all"
                  ? faqs.length
                  : faqs.filter((f) => f.category === category.id).length}
              </span>
            </button>
          ))}
        </motion.div>

        {/* FAQ Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {filteredFAQs.map((faq) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full p-6 text-left"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <div className="text-blue-600">{faq.icon}</div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg mb-2">
                        {faq.question}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            faq.category === "job-seekers"
                              ? "bg-blue-100 text-blue-700"
                              : faq.category === "employers"
                              ? "bg-green-100 text-green-700"
                              : faq.category === "account"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {categories.find((c) => c.id === faq.category)?.label}
                        </span>
                        {faq.popular && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                            Popular
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`ml-4 transform transition-transform duration-300 ${
                      openItems.includes(faq.id) ? "rotate-180" : ""
                    }`}
                  >
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                <AnimatePresence>
                  {openItems.includes(faq.id) && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6">
              <MessageSquare className="w-7 h-7 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Live Chat Support
            </h3>
            <p className="text-gray-600 mb-4">
              Chat with our team in real-time for instant answers
            </p>
            <button className="text-blue-600 font-semibold hover:text-blue-700">
              Start Chat →
            </button>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6">
              <Download className="w-7 h-7 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Help Center
            </h3>
            <p className="text-gray-600 mb-4">
              Browse our comprehensive guides and tutorials
            </p>
            <button className="text-purple-600 font-semibold hover:text-purple-700">
              Visit Help Center →
            </button>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
            <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6">
              <Users className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Community Forum
            </h3>
            <p className="text-gray-600 mb-4">
              Connect with other users and share experiences
            </p>
            <button className="text-green-600 font-semibold hover:text-green-700">
              Join Community →
            </button>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-6">Still Have Questions?</h3>
            <p className="text-blue-100 text-lg mb-8">
              Our Cambodian support team is here to help you 7 days a week.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-2xl transition-all duration-300">
                Contact Support
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
                Schedule a Call
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-5 h-5" />
                <span className="text-blue-100">Mon-Sun: 7am-10pm</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Globe className="w-5 h-5" />
                <span className="text-blue-100">English & Khmer Support</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <CheckCircle className="w-5 h-5" />
                <span className="text-blue-100">Average response: 15min</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
