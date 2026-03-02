import Hero from "@/components/Hero";
import About from "@/components/About";
import ServicesGrid from "@/components/home/ServicesGrid";
import RestaurantPreview from "@/components/home/RestaurantPreview";
import BoutiquePreview from "@/components/home/BoutiquePreview";
import EventsPreview from "@/components/home/EventsPreview";
import BookingCTA from "@/components/home/BookingCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <ServicesGrid />
      <RestaurantPreview />
      <BoutiquePreview />
      <EventsPreview />
      <BookingCTA />
    </>
  );
}
