// Create a client component wrapper to handle the dynamic layout
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check for admin routes
  const isAdminRoute = pathname?.startsWith("/admin") || false;

  // Check for authentication-related routes
  const isAuthRoute =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/forgot-password") ||
    pathname?.startsWith("/reset-password") ||
    pathname?.startsWith("/enterprise-login") ||
    pathname?.startsWith("/welcome") ||
    pathname?.startsWith("/verify-email") ||
    false;

  // For admin or auth routes, just render the children without navbar and footer
  if (isAdminRoute || isAuthRoute) {
    return <>{children}</>;
  }

  // For regular routes, include the navbar and footer
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
