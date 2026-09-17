import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import EventsSection from "./components/EventsSection";
import EventTimeline from "./components/EventTimeline";
import FeaturesSection from "./components/FeaturesSection";
import SeatMap from "./components/SeatMap";
import LiveAttendance from "./components/LiveAttendance";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505]">
      <Navbar />
      <Hero />
      <EventsSection />
      <EventTimeline />
      <FeaturesSection />
      <SeatMap />
      <LiveAttendance />
    </main>
  );
}