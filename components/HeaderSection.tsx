"use client";

import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className=" mt-30 w-full bg-white pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center px-4 sm:px-6 lg:px-8 gap-12 lg:gap-24">
        {/* Left Text Content */}
        <div className="flex flex-col justify-center order-2 lg:order-1">
          {/* Tagline Badge */}
          <div className="inline-flex items-center justify-start mb-6">
            <div className="bg-linear-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm md:text-base font-semibold shadow-md">
              Discover Jobs. Connect Faster. Work Smarter.
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="block text-blue-600 mb-2">JobLink:</span>
            <span className="block text-gray-800 text-2xl sm:text-3xl md:text-4xl font-semibold">
              community&apos;s gateway to jobs, hiring, and growth.
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-8 leading-relaxed max-w-2xl">
            Discover Job Opportunities That Match Your Skills And Goals. All
            From People And Businesses In Your Community.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10">
            <Link
              href="#"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl text-center text-lg min-w-[180px]"
            >
              Get Started
            </Link>

            <Link
              href="#"
              className="flex items-center gap-3 group min-w-[200px]"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white border-2 border-gray-300 group-hover:border-blue-500 transition-all duration-300 shadow-sm group-hover:shadow-md">
                <span className="text-blue-600 text-lg ml-1">▶</span>
              </div>
              <span className="text-gray-700 font-semibold text-lg group-hover:text-blue-600 transition-colors">
                See How it works
              </span>
            </Link>
          </div>

          {/* Features Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-6">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
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
              <span className="text-gray-700 font-medium">
                No download needed
              </span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
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
              <span className="text-gray-700 font-medium">
                Affordable job platform
              </span>
            </div>
          </div>
        </div>

        {/* Right Image - Phone Display */}
        <div className="relative flex justify-center items-center order-1 lg:order-2 mb-8 lg:mb-0">
          <div className="relative w-full max-w-md lg:max-w-lg">
            {/* Floating phone with shadow */}
            <Image
              src="/images/phone-mockup.png"
              alt="JobLink mobile app interface showing job opportunities"
              width={400}
              height={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
