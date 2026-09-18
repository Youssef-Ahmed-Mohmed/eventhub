"use client";

import dynamic from "next/dynamic";

// Browser extensions such as Dark Reader mutate SVG attributes before React hydrates.
// Loading decorative sections after hydration keeps the server HTML stable.
const Navbar = dynamic(() => import("./components/Navbar"), { ssr: false });
const Hero = dynamic(() => import("./components/Hero"), { ssr: false });
const EventTimeline = dynamic(() => import("./components/EventTimeline"), { ssr: false });
const FeaturesSection = dynamic(() => import("./components/FeaturesSection"), { ssr: false });

export default function Home() {
  return <main className="min-h-screen bg-[#070812]"><Navbar /><Hero /><EventTimeline /><FeaturesSection /></main>;
}
