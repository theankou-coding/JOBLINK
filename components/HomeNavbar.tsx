"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth, rtdb } from "@/firebase/clientApp";
import { onAuthStateChanged } from "firebase/auth";
import { ref, onValue } from "firebase/database";
import { User, Menu, X } from "lucide-react";

export default function HomeNavbar() {
  const router = useRouter();
  const [userName, setUserName] = useState("User");
  const [userPhoto, setUserPhoto] = useState("");
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true); // Signal that we are now on the client

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Look at your log: the data is at users/uid
        const userRef = ref(rtdb, `users/${user.uid}`);

        const unsubscribeDb = onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            // Check: if displayName is missing in DB, fallback to email or 'User'
            setUserName(data.displayName || data.email?.split('@')[0] || "User");
            setUserPhoto(data.photoURL || "");
          }
        });

        return () => unsubscribeDb();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Don't render the profile section until mounted to avoid hydration error
  if (!mounted) return null;

  const navItems = [
    { label: "Home", color: "text-blue-600", route: "/home" },
    { label: "For you", color: "text-slate-700", route: "/user_dashboard" },
    { label: "Saved", color: "text-slate-700", route: "/user_dashboard" },
    { label: "My Dashboard", color: "text-slate-700", route: "/user_dashboard" },
  ];

  return (
    <header className="w-full h-[82px] bg-white shadow-md z-20 relative">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4">
        {/* Logo */}
        <img className="w-20 sm:w-24 md:w-28 lg:w-[100px] object-cover h-[50px]" src="/images/logo.png" alt="Logo" />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-center items-center gap-6 lg:gap-[25px]">
          {navItems.map((item) => (
            <span
              key={item.label}
              className={`font-bold text-sm lg:text-[20px] ${item.color} hover:text-blue-600 cursor-pointer transition-colors`}
              onClick={() => router.push(item.route)}
            >
              {item.label}
            </span>
          ))}
        </nav>

        {/* Right Section: Profile + Mobile Menu Button */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Profile */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
              {userPhoto ? (
                <img
                  src={userPhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" />
              )}
            </div>
            <span className="hidden sm:inline font-semibold text-gray-700 text-sm lg:text-base">{userName}</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-50 border-t border-gray-200 px-4 py-4 flex flex-col gap-3">
          {navItems.map((item) => (
            <span
              key={item.label}
              className={`font-bold text-base ${item.color} hover:text-blue-600 cursor-pointer transition-colors py-2`}
              onClick={() => {
                router.push(item.route);
                setMenuOpen(false);
              }}
            >
              {item.label}
            </span>
          ))}
        </nav>
      )}
    </header>
  );
}