"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navigation";
import Footer from "@/components/Footer";
import HomeNavbar from "@/components/HomeNavbar";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
  if (isAdminRoute || isAuthRoute) return <>{children}</>;

  // Home page uses HomeNavbar
  if (pathname === "/home" || pathname === "/user_dashboard") {
    return (
      <div className="flex flex-col h-screen">
        <HomeNavbar />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    );
  }

  // Default navbar/footer
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
