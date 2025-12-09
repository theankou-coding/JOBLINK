// components/CommunityLoved.jsx
export default function CommunityLayout() {
  const testimonials = [
    {
      quote:
        "Found reliable staff for my cafe in just two days! The chat feature made interviewing so much easier than phone calls or emails.",
      author: "SM",
      name: "Sokha M.",
      role: "Café Owner, Phnom Penh",
    },
    {
      quote:
        "JobLink helped me find tutoring jobs near my university. Finally a platform that understands what local students need for flexible work!",
      author: "RC",
      name: "Ratha C.",
      role: "Student & Tutor",
    },
    {
      quote:
        "Simple, effective, and truly built for our community. Hiring has never been this straightforward. We've filled 5 positions in 2 months!",
      author: "VK",
      name: "Vannak K.",
      role: "Shop Owner, Siem Reap",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-blue-50 py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Loved By Our Community
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            JobLink is helping hundreds across Cambodia connect for work
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-5xl md:text-6xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              1,200+
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Jobs successfully filled
            </h3>
            <p className="text-gray-500 mt-2">And counting every day</p>
            <div className="mt-6 w-full bg-gray-100 rounded-full h-2">
              <div className="bg-linear-to-r from-blue-500 to-blue-600 h-2 rounded-full w-4/5"></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-baseline mb-4">
              <div className="text-5xl md:text-6xl font-bold bg-linear-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                4.7
              </div>
              <div className="text-2xl text-gray-400 ml-1">/5</div>
            </div>
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-6 h-6 ${
                    i < 4 ? "text-yellow-400" : "text-yellow-200"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Community rating
            </h3>
            <p className="text-gray-500 mt-2">Based on 300+ reviews</p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-xl transition-shadow duration-300">
            <div className="text-5xl md:text-6xl font-bold bg-linear-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
              850+
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Businesses registered
            </h3>
            <p className="text-gray-500 mt-2">Growing community of employers</p>
            <div className="mt-6 flex items-center">
              <div className="flex -space-x-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white"
                    style={{
                      background: `linear-gradient(45deg, ${
                        ["#10b981", "#3b82f6", "#8b5cf6", "#f59e0b", "#ef4444"][
                          i
                        ]
                      })`,
                    }}
                  ></div>
                ))}
              </div>
              <span className="ml-3 text-sm text-gray-500">and many more</span>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 opacity-10">
                <svg
                  className="w-16 h-16 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Quote */}
              <div className="relative z-10 mb-8">
                <p className="text-gray-600 text-lg italic leading-relaxed">
                  &quot;{testimonial.quote}&quot;
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center">
                <div className="w-14 h-14 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl mr-4">
                  {testimonial.author}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>

              {/* Accent Bar */}
              <div
                className={`absolute bottom-0 left-0 right-0 h-2 rounded-b-2xl ${
                  index === 0
                    ? "bg-linear-to-r from-blue-500 to-blue-400"
                    : index === 1
                    ? "bg-linear-to-r from-green-500 to-green-400"
                    : "bg-linear-to-r from-purple-500 to-purple-400"
                } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              ></div>
            </div>
          ))}
        </div>

        {/* Map/Community Section */}
        <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white overflow-hidden relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-2/3 mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Join Cambodia&apos;s Fastest Growing Job Platform
                </h2>
                <p className="text-blue-100 text-lg mb-6">
                  Connect with verified professionals and opportunities across
                  Phnom Penh, Siem Reap, and beyond.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>No commission fees</span>
                  </div>
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Verified profiles</span>
                  </div>
                  <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Direct messaging</span>
                  </div>
                </div>
              </div>

              <div className="md:w-1/3 text-center md:text-right">
                <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
                  Join Free Today
                </button>
                <p className="text-blue-100 text-sm mt-4">
                  It takes just 2 minutes to sign up
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cities/Locations */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-8">
            Serving Communities Across Cambodia
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              "Phnom Penh",
              "Siem Reap",
              "Battambang",
              "Sihanoukville",
              "Kampong Cham",
              "Kampot",
            ].map((city) => (
              <div
                key={city}
                className="bg-white rounded-xl px-6 py-3 shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-gray-700 font-medium">{city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
