"use client";
import Navigation from "@/components/Navigation";
import HeaderSection from "@/components/HeaderSection";
import Feature from "@/components/Feature";
import HowJobLinkWorks from "@/components/HowJobLinkWorks";
import SupportedDevices from "@/components/SupportedDevices";
import JobLinkHero from "@/components/JoblinkHero";
import MultiPurpose from "@/components/MultiPurpose";
import CommunityLayout from "@/components/CommunityLayout";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Navigation />
      <HeaderSection />
      <Feature />
      <HowJobLinkWorks />
      <SupportedDevices />
      <JobLinkHero />
      <MultiPurpose />
      <CommunityLayout />
      <FAQ />
      <Footer />
    </div>
  );
}
