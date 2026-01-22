import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LayoutWrapper from "./LayoutWrapper";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JobLink",
  description:
    "The innovative technology supports a wide range of industries, offering tailored solutions to meet the unique needs of each client",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if the current path is an admin route
  // This client component code needs to be in a client component
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <LayoutWrapper>{children}</LayoutWrapper>
        <Footer />
      </body>
    </html>
  );
}
