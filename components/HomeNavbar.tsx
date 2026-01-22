"use client";

import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userRef = ref(rtdb, `users/${user.uid}`);
        const unsubscribeDb = onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setUserName(data.username || "User");
            setUserPhoto(data.photoURL || "");
          }
        });
        return () => unsubscribeDb();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  if (!mounted) return null;

  const navItems = [
    { label: "Home", color: "text-slate-700", route: "/home" },
    { label: "For you", color: "text-slate-700", route: "/for_you" },
    { label: "Saved", color: "text-slate-700", route: "/save_post" },
    { label: "User Dashboard", color: "text-slate-700", route: "/user_dashboard" },
  ];

  return (
    <header className="w-full h-20.5 bg-white shadow-md z-20 relative">
      <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4">
        {/* Logo */}
        <img
          className="w-20 sm:w-24 md:w-28 lg:w-25 object-cover h-12.5 cursor-pointer"
          src="/images/logo.png"
          alt="Logo"
          onClick={() => router.push("/home")}
        />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex justify-center items-center gap-6 lg:gap-6.25">
          {navItems.map((item) => {
            const isActive = pathname === item.route;

            return (
              <div
                key={item.label}
                className="group flex flex-col items-start cursor-pointer"
                onClick={() => router.push(item.route)}
              >
                <span className={`font-bold text-sm lg:text-[15px] transition-colors 
                  ${isActive ? 'text-blue-600' : 'text-slate-700 '}`}
                >
                  {item.label}
                </span>

                {/* Underline growing from left or stuck if active */}
                <span className={`h-1 bg-blue-600 transition-all duration-300 ease-out 
                  ${isActive ? 'w-[80%]' : 'w-0 group-hover:w-[80%]'}`}
                ></span>
              </div>
            );
          })}
        </nav>

        {/* Right Section: Profile */}
        <div className="flex items-center gap-3 md:gap-4">
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
        <nav className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-3 shadow-inner">
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