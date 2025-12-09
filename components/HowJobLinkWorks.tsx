"use client";

export default function HowJobLinkWorks() {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-12">How JobLink Works</h2>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Step 1 */}
          <div>
            <h3 className="text-xl font-bold mb-4">1</h3>
            <h4 className="text-lg font-semibold mb-2">Create Your Profile</h4>
            <p className="text-gray-600">
              Sign up in minutes. No downloads needed. Just open and use.
            </p>
          </div>

          {/* Step 2 */}
          <div>
            <h3 className="text-xl font-bold mb-4">2</h3>
            <h4 className="text-lg font-semibold mb-2">Post or Search Jobs</h4>
            <p className="text-gray-600">
              Easily create listings or use smart filters to find the perfect
              match in your community.
            </p>
          </div>

          {/* Step 3 */}
          <div>
            <h3 className="text-xl font-bold mb-4">3</h3>
            <h4 className="text-lg font-semibold mb-2">Connect & Chat</h4>
            <p className="text-gray-600">
              Communicate in real time, share files, and schedule interviews
              directly in the platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
