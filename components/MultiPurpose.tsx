// components/MultiPurpose.jsx
export default function MultiPurpose() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600">
              Multi - Purpose
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Applications Are Endless
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From staffing your small shop to finding a weekend tutor — every job
            in your community has a place here.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Business Card */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="absolute top-6 right-6">
              <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Businesses: Hire for Any Role
              </h3>
              <div className="w-16 h-1 bg-linear-to-r from-blue-500 to-blue-400 rounded-full"></div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              Quickly find full-time employees, part-time staff, or temporary
              help for your shop, office, or project. Connect with reliable
              local talent ready to contribute to your tasks.
            </p>

            <div className="flex items-center space-x-2 text-blue-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
              <span>Learn more</span>
              <svg
                className="w-4 h-4"
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
            </div>

            {/* Background Pattern */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-linear-to-r from-blue-500 via-blue-400 to-blue-300 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Job Seekers Card */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="absolute top-6 right-6">
              <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Job Seekers: Find Work That Fits
              </h3>
              <div className="w-16 h-1 bg-linear-to-r from-green-500 to-green-400 rounded-full"></div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              Whether you&apos;re looking for a career, a side gig, or same-day
              work, discover opportunities posted by real employers in your
              neighborhood. Filter by role, schedule, and pay to find your
              perfect match.
            </p>

            <div className="flex items-center space-x-2 text-green-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
              <span>Find opportunities</span>
              <svg
                className="w-4 h-4"
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
            </div>

            {/* Background Pattern */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-linear-to-r from-green-500 via-green-400 to-green-300 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Households Card */}
          <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
            <div className="absolute top-6 right-6">
              <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Households: Get Trusted Help Fast
              </h3>
              <div className="w-16 h-1 bg-linear-to-r from-purple-500 to-purple-400 rounded-full"></div>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              Easily hire individuals for childcare, home cleaning, repairs,
              tutoring, and personal assistance. Clear job posts and direct
              messaging make hiring safe and straightforward.
            </p>

            <div className="flex items-center space-x-2 text-purple-600 font-medium group-hover:translate-x-2 transition-transform duration-300">
              <span>Get help now</span>
              <svg
                className="w-4 h-4"
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
            </div>

            {/* Background Pattern */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-linear-to-r from-purple-500 via-purple-400 to-purple-300 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-linear-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                10K+
              </div>
              <p className="text-gray-700 font-medium">Active Job Listings</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                95%
              </div>
              <p className="text-gray-700 font-medium">Success Rate</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <p className="text-gray-700 font-medium">Platform Availability</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <button className="group relative px-8 py-4 bg-linear-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Join Our Community Today</span>
              <div className="absolute inset-0 bg-linear-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <p className="text-gray-500 mt-4 text-sm">
              No sign-up fees • Verified professionals • Secure platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
