"use client";

import React, { useEffect, useState } from "react";
import { auth, rtdb } from "@/firebase/clientApp";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, onValue, query, orderByChild, equalTo } from "firebase/database";
import {
  Bell,
  Users,
  Phone,
  Edit,
  LogOut,
  Briefcase,
  Loader2,
  Menu,
  X,
  Search,
  MapPin,
  PlusCircle
} from "lucide-react";

const UserDashboard = () => {
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading");
  const [myJobs, setMyJobs] = useState<any[]>([]);

  const [profile, setProfile] = useState({
    name: "User",
    phone: "No phone",
    photoURL: ""
  });

  useEffect(() => {
    setMounted(true);
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setStatus("unauthenticated");
        return;
      }
      setStatus("authenticated");
      
      const userRef = ref(rtdb, `users/${user.uid}`);
      const unsubscribeProfile = onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setProfile({
            name: data.displayName || data.username || data.email?.split("@")[0] || "User",
            phone: data.phoneNumber || data.phone || "No phone",
            photoURL: data.photoURL || data.profileImage || "" 
          });
        }
      });

      const jobsRef = ref(rtdb, "jobs");
      const jobsQuery = query(jobsRef, orderByChild("userId"), equalTo(user.uid));
      const unsubscribeJobs = onValue(jobsQuery, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const jobsList = Object.entries(data).map(([id, value]: any) => ({
            id,
            ...value
          }));
          setMyJobs(jobsList);
        } else {
          setMyJobs([]);
        }
      });

      return () => {
        unsubscribeProfile();
        unsubscribeJobs();
      };
    });
    return () => unsubscribeAuth();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  if (!mounted) return null;

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-[#4640de]" size={40} />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-gray-50 overflow-hidden relative">
      
      {/* --- MOBILE HEADER --- */}
      <div className="lg:hidden flex items-center justify-between bg-white px-6 py-4 border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#D3F500] rounded-xl flex items-center justify-center font-black text-sm uppercase">
            {profile.name.slice(0, 2)}
          </div>
          <span className="font-bold text-slate-800">Dashboard</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* --- SIDEBAR --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-[300px] bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 transform
        lg:relative lg:translate-x-0 lg:w-[300px] lg:z-0 mr-[50px]
        ${isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
      `}>
        <div className="px-8 py-9 flex flex-col h-full gap-[30px]">
          
          {/* PROFILE SECTION */}
          <div className="flex gap-5 self-stretch items-center">
             {profile.photoURL ? (
                <img src={profile.photoURL} alt="Profile" className="w-16 h-16 rounded-2xl object-cover" />
              ) : (
                <div className="w-16 h-16 bg-[#D3F500] rounded-2xl flex items-center justify-center font-black text-xl uppercase">
                  {profile.name.slice(0, 2)}
                </div>
              )}
            <div className="flex flex-col justify-center gap-2.5">
              <span className="font-normal text-[20px] text-slate-700 uppercase leading-none">
                {profile.name}
              </span>
              <span className="font-normal text-[15px] text-slate-700 opacity-[0.80] leading-none">
                {profile.phone}
              </span>
              <div className="w-6 h-6 flex items-center justify-center cursor-pointer hover:bg-slate-100 rounded-full transition-colors">
                <Edit size={16} className="text-slate-400" />
              </div>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <div className="flex justify-center items-center gap-2.5 self-stretch h-[58px] bg-[#4640de] rounded-[10px] cursor-pointer">
               <span className="font-normal text-[15px] text-center text-white">My Post</span>
            </div>
            <SidebarLink icon={<Bell size={20}/>} label="Notification" />
            <SidebarLink icon={<Users size={20}/>} label="Candidate" />
          </nav>

          <button onClick={handleSignOut} className="mt-auto flex items-center gap-3 text-slate-400 hover:text-red-500 p-3 rounded-xl transition-colors font-bold group">
            <LogOut className="group-hover:-translate-x-1 transition-transform" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex flex-col gap-[50px] grow p-4 lg:p-0 lg:pr-[50px] overflow-y-auto">
        
        {/* Header Bar with Shadow Style */}
        <div className="flex justify-between items-center self-stretch h-20 bg-white px-[30px] py-4 rounded-[20px] mt-4 lg:mt-9" 
             style={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)" }}>
          <div className="flex items-center gap-2">
            <div className="w-[91px] h-[55px] bg-indigo-50 flex items-center justify-center rounded-lg">
                <Briefcase className="text-[#4640de]" />
            </div>
            <span className="font-bold text-[20px] text-center text-black">Job Statistics</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400">
               <Search size={24} className="cursor-pointer hover:text-slate-600 transition-colors" />
               <Bell size={24} className="cursor-pointer hover:text-slate-600 transition-colors" />
            </div>
            <button className="bg-[#4640de] hover:bg-[#3b36bc] transition-colors text-white px-4 py-2 rounded-[10px] flex items-center gap-2 font-bold text-sm">
               <PlusCircle size={18} /> Create Job
            </button>
          </div>
        </div>

        {/* Job Feed Container */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-[50px] self-stretch min-h-[704px] bg-white p-6 rounded-[20px] mb-10">
          {myJobs.length > 0 ? (
            myJobs.map((job) => (
              <div key={job.id} className="flex flex-col gap-2.5 bg-[#d3f500] p-4 rounded-[20px] w-full lg:w-[450px] h-fit shadow-sm">
                <div className="flex justify-between items-center self-stretch">
                  <div className="flex items-center gap-[5px]">
                    <MapPin size={14} className="text-white" />
                    <span className="font-normal text-[10px] text-center text-white uppercase">{job.location}</span>
                  </div>
                  <span className="font-normal text-[10px] text-center text-white">{job.postDate || "Recently"}</span>
                </div>

                <span className="font-bold text-[20px] text-white leading-tight">{job.postName}</span>
                <span className="font-normal text-[10px] text-white line-clamp-3">
                  {job.description}
                </span>

                <div className="flex justify-between items-center self-stretch mt-2">
                  <div className="flex items-center gap-[5px]">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <span className="font-normal text-[10px] text-center text-white">{job.experience}</span>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <span className="font-normal text-[10px] text-center text-white">{job.jobType}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center self-stretch">
                  <div className="flex items-center gap-[5px]">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <span className="font-normal text-[10px] text-center text-white">{job.workSetting}</span>
                  </div>
                  <div className="flex items-center gap-[5px]">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    <span className="font-normal text-[10px] text-center text-white">{job.salary}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center self-stretch p-2.5 bg-white/20 rounded-xl mt-2">
                  <div className="flex items-center gap-[5px]">
                    {profile.photoURL ? (
                        <img src={profile.photoURL} className="w-[33px] h-[33px] object-cover rounded-full border border-white" />
                    ) : (
                        <div className="w-[33px] h-[33px] bg-white rounded-full flex items-center justify-center font-bold text-[10px] text-slate-700 uppercase">
                            {profile.name.slice(0, 2)}
                        </div>
                    )}
                    <div className="flex flex-col justify-center">
                      <span className="font-bold text-[14px] text-slate-700 leading-none">{profile.name}</span>
                      <span className="font-normal text-[10px] text-slate-600">{job.companyName || "Employer"}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 text-slate-700">
                    <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                      <Search size={14} />
                      <span className="text-[12px]">Share</span>
                    </div>
                    <div className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors">
                      <Bell size={14} />
                      <span className="text-[12px]">Save</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex flex-col items-center justify-center text-slate-300 py-20">
              <Briefcase size={60} className="opacity-20 mb-4" />
              <p className="font-bold text-lg">No active posts yet</p>
            </div>
          )}
        </div>
      </main>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/20 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
      )}
    </div>
  );
};

const SidebarLink = ({ icon, label }: any) => (
  <div className="flex items-center gap-4 px-6 h-14 rounded-2xl font-bold transition-all cursor-pointer text-slate-500 hover:bg-slate-50">
    {icon}
    <span className="text-[18px]">{label}</span>
  </div>
);

export default UserDashboard;