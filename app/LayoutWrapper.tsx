"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navigation";
import Footer from "@/components/Footer";
import HomeNavbar from "@/components/HomeNavbar";

// Typical component structure
export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lastPathname = useRef<string>("");
  const scrollableMainRef = useRef<HTMLDivElement>(null);

  // Reset scroll position when route changes
  useEffect(() => {
    // Only reset scroll if we're changing routes
    if (pathname !== lastPathname.current) {
      // Reset scrollable main container if it exists
      if (scrollableMainRef.current) {
        scrollableMainRef.current.scrollTop = 0;
      }

      // Always reset window scroll as well
      window.scrollTo(0, 0);

      lastPathname.current = pathname;
    }
  }, [pathname]);

  // Admin routes
  const isAdminRoute = pathname?.startsWith("/admin") || false;

  // Auth routes
  const isAuthRoute =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/forgot-password") ||
    pathname?.startsWith("/reset-password") ||
    pathname?.startsWith("/enterprise-login") ||
    pathname?.startsWith("/welcome") ||
    pathname?.startsWith("/verify-email") ||
    false;

  // No navbar/footer for admin or auth routes
  if (isAdminRoute || isAuthRoute) {
    return (
      <div key={pathname} className="min-h-screen">
        {children}
      </div>
    );
  }

  // Home page uses HomeNavbar
  if (
    pathname === "/home" ||
    pathname === "/user_dashboard" ||
    pathname === "/"
  ) {
    return (
      <div className="flex flex-col " key={pathname}>
        <HomeNavbar />
        <main
          ref={scrollableMainRef}
          className="flex-1 h-screen lg:overflow-hidden sm:overflow-y-auto"
          // This ensures scroll is always reset when navigating
          onLoad={() => {
            if (scrollableMainRef.current) {
              scrollableMainRef.current.scrollTop = 0;
            }
          }}
        >
          {children}
        </main>
      </div>
    );
  }

  // no navbar/footer for create post
  if (pathname === "/create_post") {
    return (
      <div key={pathname} className="min-h-screen">
        {children}
      </div>
    );
  }

  // Fixed navbar layout for /for_you and /save_post
  if (pathname === "/for_you" || pathname === "/save_post") {
    return (
      <div className="flex flex-col h-screen" key={pathname}>
        {/* Navbar stays at the top */}
        <HomeNavbar />

        {/* main fills the rest of the space and handles scrolling */}
        <main
          ref={scrollableMainRef}
          className="flex-1 overflow-y-auto"
          onLoad={() => {
            if (scrollableMainRef.current) {
              scrollableMainRef.current.scrollTop = 0;
            }
          }}
        >
          {children}
        </main>
      </div>
    );
  }

  return (
    // Your layout JSX here
    <>{children}</>
  );
}
