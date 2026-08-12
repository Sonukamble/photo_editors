import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { StyleSelector } from "@/components/landing/StyleSelector";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StyleSelector />
      </main>
      <Footer />
    </>
  );
}
