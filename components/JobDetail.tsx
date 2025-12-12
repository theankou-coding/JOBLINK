// JobDetail.tsx
import React from 'react';

export interface JobDetailProps {
  job: {
    id: number;
    postName: string;
    cardBackgroundImage: string;
    description: string;
    skills: string[];
    benefits: string[];
    schedule: string[];
    location: string;
  };
}

const JobDetail: React.FC<JobDetailProps> = ({ job }) => {
  return (
    <div className="bg-white w-full shadow p-6 rounded-xl">
      <img
        src={job.cardBackgroundImage} // Use dynamic image
        className="w-full h-64 object-cover rounded-xl"
        alt={job.postName}
      />

      <h1 className="mt-6 text-2xl font-bold">{job.postName}</h1> {/* Use dynamic postName */}

      <p className="text-gray-600 mt-2">
        {job.description} {/* Use dynamic description */}
      </p>

      {/* --- Skill Requirement --- */}
      <section className="mt-6">
        <h2 className="font-semibold text-lg">Skill Requirement</h2>
        <ul className="list-disc ml-6 mt-2 text-gray-700">
          {job.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </section>

      {/* --- Benefits --- */}
      <section className="mt-6">
        <h2 className="font-semibold text-lg">Benefits</h2>
        <ul className="list-disc ml-6 mt-2 text-gray-700">
          {job.benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </section>

      {/* --- Work Schedule --- */}
      <section className="mt-6">
        <h2 className="font-semibold text-lg">Work Schedule</h2>
        <ul className="list-disc ml-6 mt-2 text-gray-700">
          {job.schedule.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      {/* --- Location Map Placeholder --- */}
      <section className="mt-6">
        <h2 className="font-semibold text-lg">Where you’ll work</h2>
        <p className="text-gray-700 mt-2">{job.location}</p>
        <div className="bg-gray-400 w-full h-72 rounded-xl mt-3"></div>
      </section>
    </div>
  );
};

export default JobDetail;