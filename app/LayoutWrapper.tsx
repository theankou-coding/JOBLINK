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

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> db4d4868c86063b8d18f4058f7e8d68a22bcc418
  // No navbar/footer for admin or auth routes
  if (isAdminRoute || isAuthRoute) return <>{children}</>;

  // Home page uses HomeNavbar
  if (pathname === "/home" || pathname === "/user_dashboard" || pathname === "/") {
    return (
      <div className="flex flex-col h-screen">
        <HomeNavbar />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    );
<<<<<<< HEAD
  }

  // Default navbar/footer
=======
  }

  // Default navbar/footer
=======
  console.log("✅ Is auth route?", isAuthRoute);
  console.log("✅ Is admin route?", isAdminRoute);

  // For admin or auth routes, just render the children without navbar and footer
  if (isAdminRoute || isAuthRoute) {
    console.log("🚫 Rendering WITHOUT navbar and footer");
    return <>{children}</>;
  }

  console.log("✅ Rendering WITH navbar and footer");
>>>>>>> 440f778734d4a8a67b276a97fda4b4e76efdc029
>>>>>>> db4d4868c86063b8d18f4058f7e8d68a22bcc418
  return (
    <>
      <main>{children}</main>
    </>
  );
}
