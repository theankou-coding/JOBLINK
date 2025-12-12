import React from 'react';
import { MapPin, Share2, Heart, Briefcase, Clock, DollarSign, Send } from 'lucide-react';

// JobCard.tsx
export interface JobCardProps {
  id: number;
  postName: string;
  location?: string;
  postDate?: string;
  description?: string;
  profileName: string;
  companyName?: string;
  experience?: string;
  timeCommitment?: 'Full time' | 'Part time' | string;
  salaryRange?: string;
  siteType?: 'On site' | 'Remote' | string;
  profileImage?: string;
  cardBackgroundImage: string;
  cardColor?: string;
  onClick: (id: number) => void;
  isSelected: boolean;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  postName,
  location = "Tram Kak, Takeo",
  postDate = "Post date",
  description = "Looking for a friendly and responsible waitress to join our small family-run restaurant in Phnom Penh. We value teamwork, good communication, and a positive attitude toward customers. If you enjoy working in a lively local ...",
  profileName,
  companyName = "Femboy Eatery",
  experience = "1 years experience+",
  timeCommitment = "Full time",
  salaryRange = "$500 - $600",
  siteType = "On site",
  profileImage = "https://i.pinimg.com/736x/2e/37/3a/2e373a70862cc9419df4b146cd984bae.jpg",
  cardBackgroundImage,
  cardColor = "#FFFFFF", // Default to white (unclicked)
  onClick,
  isSelected,
}) => {
  return (
    <div 
      className={`flex flex-col gap-2.5 p-2.5 rounded-[20px] cursor-pointer transition-all duration-200 ${
        isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
      }`}
      style={{ backgroundColor: cardColor }}
      onClick={() => onClick(id)}
    >
      {/* Card Header with Background Image */}
      <div 
        className="w-full flex flex-col gap-[19px] px-[50px] py-5 rounded-[20px] relative"
        style={{
          backgroundImage: `url(${cardBackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30 rounded-[20px]"></div>
        
        <div className="flex justify-between items-center self-stretch relative z-10">
          <div className="flex items-center gap-[5px]">
            <MapPin className="w-4 h-4 text-white" />
            <span className="font-normal text-[10px] text-center text-white">{location}</span>
          </div>
          <span className="font-normal text-[10px] text-center text-white">{postDate}</span>
        </div>
        
        <span className="font-bold text-[20px] text-white relative z-10">{postName}</span>
        
        <span className="font-normal text-[10px] text-white relative z-10 line-clamp-3">
          {description}
        </span>
        
        <div className="flex justify-between items-center self-stretch relative z-10">
          <div className="flex items-center gap-[5px]">
            <Briefcase className="w-4 h-4 text-white" />
            <span className="font-normal text-[10px] text-center text-white">{experience}</span>
          </div>
          <div className="flex items-center gap-[5px]">
            <Clock className="w-4 h-4 text-white" />
            <span className="font-normal text-[10px] text-center text-white">{timeCommitment}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center self-stretch relative z-10">
          <div className="flex items-center gap-[5px]">
            <Send className="w-4 h-4 text-white" />
            <span className="font-normal text-[10px] text-center text-white">{siteType}</span>
          </div>
          <div className="flex items-center gap-[5px]">
            <DollarSign className="w-4 h-4 text-white" />
            <span className="font-normal text-[10px] text-center text-white">{salaryRange}</span>
          </div>
        </div>
      </div>
      
      {/* Card Footer with Profile and Actions */}
      <div className="flex justify-between items-center self-stretch p-2.5">
        <div className="flex items-center gap-[5px]">
          <img 
            src={profileImage} 
            alt={profileName}
            className="w-[33px] h-[33px] object-cover rounded-[29px]"
          />
          <div className="flex flex-col justify-center gap-[5px]">
            <span className="font-bold text-[20px] text-center text-slate-700">{profileName}</span>
            <span className="font-normal text-[10px] text-center text-slate-700">{companyName}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-[5px] cursor-pointer hover:opacity-80">
            <Share2 className="w-5 h-5 text-slate-700" />
            <span className="font-normal text-[15px] text-center text-slate-700">Share</span>
          </div>
          <div className="flex items-center gap-[5px] cursor-pointer hover:opacity-80">
            <Heart className="w-5 h-5 text-slate-700" />
            <span className="font-normal text-[15px] text-center text-slate-700">Save</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;