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

  // Define routes where navbar and footer should be hidden
  const hideLayoutRoutes = [
    "/login",
    "/signup",
    "/register",
    "/forgot-password",
    "/reset-password",
    "/verify-email",
  ];

  const shouldHideLayout = hideLayoutRoutes.some((route) =>
    pathname?.startsWith(route)
  );

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
