import { Carousel } from "./carosusel";

function HowToPlay() {
  const slides = [
    {
      title: "Choosing Variable",
      text: "To begin, you must select exactly two phrases from the set: Desto, Finger, Caw, Cawter, Oli.  The computer will also randomly pick two phrases, setting up the match.",
      src: "./images/learn-more.png",
    },
    {
      title: "Finger Throw",
      text: "Once you have selected your phrases and toggled your fingers, the computer will randomly select its phrases and throw fingers",
      src: "./images/learn-more.png",
    },
    {
      title: "Counting the Phrases",
      text: "The players then count from Desto through Oli, matching the number of fingers shown. The count always follows the order: Desto, Finger, Caw, Cawter, Oli",
      src: "./images/learn-more.png",
    },
    {
      title: "Winning the Round",
      text: "If the final count matches one of the chosen phrases, the player who selected that phrase wins. For example, if the count stops at Cawter and Player 2 had chosen Cawter, they win the round.",
      src: "./images/learn-more.png",
    },
  ];
  return (
    <div className="col-span-9 text-xl grid grid-cols-8 items-start py-20">
      <section className="col-start-3 col-end-7 font-gluten text-5xl font-semibold text-center leading-14">
        <h1>How to Play </h1>
        <h1 className="">Desto Finger Game</h1>
      </section>
      <section className="col-start-2 col-end-8 overflow-hidden">
        <div className="flex justify-center items-center min-h-screen overflow-x-hidden">
          <Carousel slides={slides} />
        </div>
      </section>
    </div>
  );
}

export default HowToPlay;
