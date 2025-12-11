"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  Star,
  Award,
  TrendingUp,
  Users,
  Briefcase,
  MapPin,
  Calendar,
  Heart,
  CheckCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Testimonials = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Sophal Chen",
      role: "Software Developer",
      company: "Phnom Penh Tech Solutions",
      location: "Phnom Penh",
      avatar: "SC",
      rating: 5,
      content:
        "After 3 months of searching, I found my dream job through JobLink in just 2 weeks! The one-click applications saved me hours of time. The local focus meant I was applying to companies I actually wanted to work for.",
      date: "2 months ago",
      category: "job-seeker",
      badge: "Recently Hired",
      icon: <Sparkles className="w-4 h-4" />,
      image: "/testimonials/developer.jpg",
    },
    {
      id: 2,
      name: "Srey Mom Restaurant",
      role: "Business Owner",
      company: "Srey Mom Restaurant",
      location: "Siem Reap",
      avatar: "SR",
      rating: 5,
      content:
        "As a small restaurant owner, hiring used to be my biggest challenge. With JobLink, I hired 3 excellent staff members in one week! The local talent pool is amazing. Game changer for Cambodian businesses!",
      date: "1 month ago",
      category: "employer",
      badge: "Business Success",
      icon: <Briefcase className="w-4 h-4" />,
      image: "/testimonials/restaurant.jpg",
    },
    {
      id: 3,
      name: "Vicheka Lim",
      role: "Marketing Manager",
      company: "Golden Tower Agency",
      location: "Phnom Penh",
      avatar: "VL",
      rating: 5,
      content:
        "The community focus makes all the difference. We found candidates who not only had the skills but also understood our local market. Cultural fit is everything, and JobLink delivers that perfectly.",
      date: "3 months ago",
      category: "employer",
      badge: "Team Builder",
      icon: <Users className="w-4 h-4" />,
      image: "/testimonials/marketing.jpg",
    },
    {
      id: 4,
      name: "Chantrea Sok",
      role: "Recent Graduate",
      company: "Royal University of Phnom Penh",
      location: "Phnom Penh",
      avatar: "CS",
      rating: 5,
      content:
        "As a fresh graduate, I was nervous about finding my first job. JobLink's career guidance and entry-level filters helped me land a perfect role at a local startup. The platform is so easy to use!",
      date: "2 weeks ago",
      category: "job-seeker",
      badge: "First Job",
      icon: <Award className="w-4 h-4" />,
      image: "/testimonials/graduate.jpg",
    },
    {
      id: 5,
      name: "Borey Construction",
      role: "HR Manager",
      company: "Borey Development Group",
      location: "Sihanoukville",
      avatar: "BC",
      rating: 4,
      content:
        "We needed skilled workers for our construction projects. JobLink connected us with verified professionals in our area. The bulk hiring features saved us so much time and effort.",
      date: "2 months ago",
      category: "employer",
      badge: "Large Scale Hiring",
      icon: <TrendingUp className="w-4 h-4" />,
      image: "/testimonials/construction.jpg",
    },
    {
      id: 6,
      name: "Mony Rath",
      role: "Freelance Designer",
      company: "Freelance",
      location: "Battambang",
      avatar: "MR",
      rating: 5,
      content:
        "Finding freelance work locally was nearly impossible until JobLink. Now I'm consistently booked with projects from Cambodian businesses. The platform understands our unique market needs.",
      date: "1 month ago",
      category: "job-seeker",
      badge: "Freelance Success",
      icon: <Heart className="w-4 h-4" />,
      image: "/testimonials/designer.jpg",
    },
  ];

  const stats = [
    {
      number: "10K+",
      label: "Jobs Found",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      number: "5K+",
      label: "Businesses Hiring",
      icon: <Users className="w-5 h-5" />,
    },
    {
      number: "4.9",
      label: "Average Rating",
      icon: <Star className="w-5 h-5" />,
    },
    {
      number: "95%",
      label: "Success Rate",
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];

  const categories = [
    { id: "all", label: "All Stories", count: testimonials.length },
    {
      id: "job-seeker",
      label: "Job Seekers",
      count: testimonials.filter((t) => t.category === "job-seeker").length,
    },
    {
      id: "employer",
      label: "Employers",
      count: testimonials.filter((t) => t.category === "employer").length,
    },
  ];

  const filteredTestimonials =
    activeCategory === "all"
      ? testimonials
      : testimonials.filter((t) => t.category === activeCategory);

  // Auto-play carousel
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, filteredTestimonials.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + filteredTestimonials.length) % filteredTestimonials.length
    );
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 10000);
  };

  const getStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 mt-10 md:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-100 rounded-full translate-x-1/3 translate-y-1/3 opacity-20 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-96 bg-gradient-to-r from-blue-50/30 to-purple-50/30 blur-3xl"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-6"
          >
            <Quote className="w-4 h-4" />
            SUCCESS STORIES FROM CAMBODIA
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Real Stories, Real Success
            <span className="block text-3xl md:text-4xl text-blue-600 mt-2">
              Join Thousands of Happy Users
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-gray-600 text-lg"
          >
            Hear from job seekers and employers across Cambodia who found
            success through JobLink.
          </motion.p>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <div className="text-blue-600">{stat.icon}</div>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {stat.number}
                </div>
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
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
              onClick={() => {
                setActiveCategory(category.id);
                setCurrentIndex(0);
              }}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:shadow-md"
              }`}
            >
              {category.label}
              <span
                className={`text-sm px-2 py-1 rounded-full ${
                  activeCategory === category.id ? "bg-white/20" : "bg-gray-100"
                }`}
              >
                {category.count}
              </span>
            </button>
          ))}
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative mb-16">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Carousel Container */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center"
              >
                <div className="w-full max-w-4xl">
                  <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {/* Left: Testimonial Content */}
                      <div className="p-8 md:p-12">
                        <div className="flex items-center gap-2 mb-6">
                          <div className="flex">
                            {getStars(
                              filteredTestimonials[currentIndex].rating
                            )}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">
                            {filteredTestimonials[currentIndex].rating}/5
                          </span>
                        </div>

                        <Quote className="w-12 h-12 text-blue-100 mb-6" />

                        <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
                          &quot;{filteredTestimonials[currentIndex].content}
                          &quot;
                        </p>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                {filteredTestimonials[currentIndex].avatar}
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 text-lg">
                                  {filteredTestimonials[currentIndex].name}
                                </h4>
                                <p className="text-gray-600">
                                  {filteredTestimonials[currentIndex].role}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-3">
                              <div className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4" />
                                {filteredTestimonials[currentIndex].company}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                {filteredTestimonials[currentIndex].location}
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                {filteredTestimonials[currentIndex].date}
                              </div>
                            </div>
                          </div>

                          <div className="hidden lg:block">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                              {filteredTestimonials[currentIndex].icon}
                              {filteredTestimonials[currentIndex].badge}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Image/Placeholder */}
                      <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-full"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-100 rounded-tr-full"></div>

                        <div className="relative z-10 text-center">
                          <div className="w-48 h-48 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6">
                            <div className="text-white text-6xl font-bold">
                              {filteredTestimonials[currentIndex].avatar}
                            </div>
                          </div>
                          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-lg">
                            {filteredTestimonials[currentIndex].icon}
                            <span className="font-semibold text-gray-900">
                              {filteredTestimonials[currentIndex].category ===
                              "job-seeker"
                                ? "Job Seeker"
                                : "Employer"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {filteredTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setAutoPlay(false);
                  setTimeout(() => setAutoPlay(true), 10000);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {filteredTestimonials.slice(0, 6).map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex">{getStars(testimonial.rating)}</div>
              </div>

              <p className="text-gray-700 mb-6 line-clamp-4">
                &quot;{testimonial.content}&quot;
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {testimonial.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {testimonial.date}
                </div>
              </div>

              <div className="mt-4">
                <div className="inline-flex items-center gap-2 bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-sm">
                  {testimonial.icon}
                  {testimonial.badge}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-6">
            Ready to Write Your Success Story?
          </h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of Cambodians who found their perfect job or ideal
            candidate through JobLink.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-2xl transition-all duration-300">
              Find Jobs Now
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
              Post a Job Free
            </button>
          </div>
          <p className="text-blue-100 text-sm mt-8">
            ⭐ Rated 4.9/5 by 2,500+ Cambodian users • Trusted by 500+
            businesses
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
