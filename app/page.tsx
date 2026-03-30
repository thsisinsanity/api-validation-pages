import type { Metadata } from "next";
import { niches } from "@/content/niches";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import InteractiveDemo from "@/components/InteractiveDemo";
import SocialProof from "@/components/SocialProof";
import PricingTable from "@/components/PricingTable";
import WaitlistForm from "@/components/WaitlistForm";
import WhyNow from "@/components/WhyNow";
import Roadmap from "@/components/Roadmap";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const niche = niches.license;

export const metadata: Metadata = {
  title: niche.metaTitle,
  description: niche.metaDescription,
};

export default function HomePage() {
  return (
    <main>
      <Navbar name={niche.name} />
      <Hero headline={niche.headline} subheadline={niche.subheadline} badge={niche.badge} />
      <Features benefits={niche.benefits} useCases={niche.useCases} />
      <InteractiveDemo />
      <SocialProof />
      <PricingTable pricing={niche.pricing} />
      <Roadmap />
      <WhyNow />
      <WaitlistForm niche={niche.slug} nicheName={niche.name} />
      <FAQ />
      <Footer name={niche.name} />
    </main>
  );
}
