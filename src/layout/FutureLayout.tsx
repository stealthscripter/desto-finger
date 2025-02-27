import GameHeader from "../components/GameHeader";
import Hero from "../components/Hero";

function FutureLayout() {
  return (
    <div
      className="p-4 md:grid md:grid-cols-9 gap-x-2 md:min-h-screen border h-screen overflow-hidden border-amber-900
    bg-[url(src/assets/backgrounds/stacked-steps-haikei.svg)] bg-slate-900 bg-blend-difference"
      style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
    >
      <GameHeader />
      <Hero />
      {/* <LearnMore /> */}
    </div>
  );
}

export default FutureLayout;
