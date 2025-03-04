import Footer from "../components/Footer";
import GameHeader from "../components/GameHeader";
import Hero from "../components/Hero";
import HowToPlay from "../components/HowToPlay";
import LearnMore from "../components/LearnMore";

function FutureLayout() {
  return (
    <div
      className="md:grid md:grid-cols-9 gap-x-2 md:min-h-screen border border-amber-900
    bg-[url(/backgrounds/stacked-steps-haikei.svg)] bg-slate-900 bg-blend-difference"
      style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
    >
      <GameHeader />
      <Hero />
      <LearnMore />
      <HowToPlay />
      <Footer />
    </div>
  );
}

export default FutureLayout;
