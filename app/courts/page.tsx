import type { Metadata } from "next";
import { niches } from "@/content/niches";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import MockDemo from "@/components/MockDemo";
import SocialProof from "@/components/SocialProof";
import PricingTable from "@/components/PricingTable";
import WaitlistForm from "@/components/WaitlistForm";
import WhyNow from "@/components/WhyNow";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const niche = niches.courts;

export const metadata: Metadata = {
  title: niche.metaTitle,
  description: niche.metaDescription,
};

export default function CourtsPage() {
  return (
    <main>
      <Navbar name={niche.name} />
      <Hero headline={niche.headline} subheadline={niche.subheadline} badge={niche.badge} />
      <Features benefits={niche.benefits} useCases={niche.useCases} />
      <MockDemo request={niche.mockRequest} response={niche.mockResponse} />
      <SocialProof />
      <PricingTable pricing={niche.pricing} />
      <WhyNow />
      <WaitlistForm niche={niche.slug} nicheName={niche.name} />
      <FAQ />
      <Footer name={niche.name} />
    </main>
  );
}
