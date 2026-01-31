import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import MethodologySection from "../components/MethodologySection";

export default function MethodologyPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <MethodologySection />
      <Footer />
    </main>
  );
}
