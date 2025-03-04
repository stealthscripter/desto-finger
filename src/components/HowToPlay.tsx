import { Carousel } from "./carosusel";

function HowToPlay() {
  const slides = [
    {
      title: "Slide 1",
      button: "Learn More",
      src: "https://via.placeholder.com/800x600",
    },
    {
      title: "Slide 2",
      button: "Explore",
      src: "./images/learn-more.png",
    },
    {
      title: "Slide 3",
      button: "Get Started",
      src: "https://via.placeholder.com/800x600",
    },
  ];
  return (
    <div className="col-span-9 text-xl grid grid-cols-8 border border-green-500 items-start bg-red-200 py-20">
      <section className="border-3 border-yellow-900 col-start-3 col-end-7 font-gluten text-5xl font-semibold text-center leading-14">
        <h1>How to Play </h1>
        <h1 className="">Desto Finger Game</h1>
      </section>
      <section className="border border-amber-600 col-start-2 col-end-8 overflow-hidden">
        <div className="flex justify-center items-center min-h-screen overflow-x-hidden">
          <Carousel slides={slides} />
        </div>
      </section>
    </div>
  );
}

export default HowToPlay;
