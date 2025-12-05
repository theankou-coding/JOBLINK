"use client";
import Image from "next/image";

export default function FeaturesSection() {
  const features = [
    {
      img: "/img/feature1.jpg",
      title: "Advanced Job Search & Filters",
      desc: "Quickly find the right opportunity with powerful search tools and smart filtering options.",
    },
    {
      img: "/img/feature2.jpg",
      title: "Post job with Various Categories",
      desc: "Easily create listings for full-time, part-time, remote, or community-based jobs.",
    },
    {
      img: "/img/feature3.jpg",
      title: "AI-Powered Job Recommendations",
      desc: "Get personalized job suggestions based on your skills, experience, and activity.",
    },
    {
      img: "/img/feature4.jpg",
      title: "Real-Time Chat With File Sharing",
      desc: "Connect instantly with employers or candidates, and share resumes, images, or documents.",
    },
    {
      img: "/img/feature5.jpg",
      title: "Smart Notification Center",
      desc: "Stay informed with alerts for new matches, messages, job updates, and application status.",
    },
    {
      img: "/img/feature6.jpg",
      title: "Featured Job Listings & Boosted Visibility",
      desc: "Promote job posts for higher reach and attract more qualified candidates.",
    },
  ];

  return (
    <section className="relative w-full text-white bg-blue-700 py-24">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold mb-16">
          Numerous Feature
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {features.map((f, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-28 h-28 overflow-hidden rounded-full mb-4 shadow-lg">
                <Image
                  src={f.img}
                  alt={f.title}
                  width={200}
                  height={200}
                  className="object-cover w-full h-full"
                />
              </div>

              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm opacity-80 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
