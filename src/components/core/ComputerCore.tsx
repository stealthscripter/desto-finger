import React, { useImperativeHandle, useState, ForwardedRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const allFingers = [
  "lc-finger-1",
  "lc-finger-2",
  "lc-finger-3",
  "lc-finger-4",
  "lc-finger-thumb",
  "rc-finger-1",
  "rc-finger-2",
  "rc-finger-3",
  "rc-finger-4",
  "rc-finger-thumb",
];
const leftFingers = [
  {
    id: "lc-finger-1",
    styles: "md:mt-28 mt-48",
  },
  {
    id: "lc-finger-2",
    styles: "md:mt-10 mt-40",
  },
  {
    id: "lc-finger-3",
    styles: "mt-32 md:mt-0",
  },
  {
    id: "lc-finger-4",
    styles: "md:mt-10 mt-40",
  },
  {
    id: "lc-finger-thumb",
    styles:
      "md:mt-52 md:-mb-16 -mb-14  md:rotate-[0.5rad] rotate-[0.5rad] mt-60 -ms-3",
  },
];

const rightFingers = [
  {
    id: "rc-finger-1",
    styles: "md:mt-28 mt-48",
  },
  {
    id: "rc-finger-2",
    styles: "md:mt-10 mt-40",
  },
  {
    id: "rc-finger-3",
    styles: "mt-32 md:mt-0",
  },
  {
    id: "rc-finger-4",
    styles: "md:mt-10 mt-40",
  },
  {
    id: "rc-finger-thumb",
    styles:
      "md:mt-52 md:-mb-16 -mb-14  md:rotate-[0.5rad] rotate-[0.5rad] mt-60 -ms-3",
  },
];
interface PlayerCoreProps {
  selectedFingers: string[];
  setSelectedFingers: React.Dispatch<React.SetStateAction<string[]>>;
}

const ComputerCore = React.forwardRef(
  (
    { selectedFingers, setSelectedFingers }: PlayerCoreProps,
    ref: ForwardedRef<any>
  ) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [tempFinger, setTempFinger] = useState<string | null>(null);
    const computerPick = useSelector(
      (state: RootState) => state.picksVariable.computerPicks
    );
    const handleComputerStart = () => {
      setSelectedFingers([]); // Reset the selected fingers
      setIsAnimating(true);
      let animationCount = 0;
      const animationDuration = 2000; // 2 seconds
      const intervalTime = 200; // 200ms interval

      const animationInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * allFingers.length);
        setTempFinger(allFingers[randomIndex]); // Highlight a random finger
        animationCount += intervalTime;

        if (animationCount >= animationDuration) {
          clearInterval(animationInterval);
          setIsAnimating(false);
          setTempFinger(null);

          // Randomly decide how many fingers to select (1 to all fingers)
          const numberOfFingersToSelect =
            Math.floor(Math.random() * allFingers.length) + 1;

          // Randomly select the fingers
          const shuffledFingers = [...allFingers].sort(
            () => 0.5 - Math.random()
          );
          const finalSelection = shuffledFingers.slice(
            0,
            numberOfFingersToSelect
          );

          setSelectedFingers(finalSelection); // Set the final selection
        }
      }, intervalTime);
    };

    useImperativeHandle(ref, () => ({
      handleComputerStart,
    }));

    return (
      <section className="grid grid-cols-12 gap-x-5 gap-y-5">
        <section className="py-5 col-span-12 flex justify-center">
          <h1 className="md:text-sm text-xs md:leading-0 leading-6 text-center">
            Computer Throw Automatically Using (Flux Model 2.0){" "}
          </h1>
        </section>
        <section className="py-5 h-96 col-span-12 grid grid-cols-2 gap-x-12 md:px-16">
          <section className="px-5">
            {/* Left Hand */}
            <div className="w-full h-full grid grid-cols-5 grid-rows-5 gap-x-2">
              {/* Finger 1 */}
              {leftFingers.map((finger) => (
                <div
                  key={finger.id}
                  className={`row-span-4 rounded-t-4xl w-full relative transition-colors duration-300 ${
                    selectedFingers.includes(finger.id) ||
                    tempFinger === finger.id
                      ? "bg-blue-800"
                      : "bg-yellow-100"
                  } ${finger.styles}`}
                >
                  <input
                    type="checkbox"
                    id={finger.id}
                    value={finger.id}
                    className="peer hidden"
                    disabled={isAnimating}
                  />
                  <label
                    htmlFor={finger.id}
                    className="h-full w-full block cursor-pointer"
                  ></label>
                </div>
              ))}
              <div className="bg-yellow-100 col-span-5 z-20 md:me-10 me-7 md:rounded-none rounded-b-4xl"></div>
            </div>
          </section>

          <section className="px-5">
            {/* Right Hand */}
            <div className="w-full h-full grid grid-cols-5 grid-rows-5 gap-x-2 scale-x-[-1]">
              {rightFingers.map((finger) => (
                <div
                  key={finger.id}
                  className={`row-span-4 rounded-t-4xl w-full relative transition-colors duration-300 ${
                    selectedFingers.includes(finger.id) ||
                    tempFinger === finger.id
                      ? "bg-blue-800"
                      : "bg-yellow-100"
                  } ${finger.styles}`}
                >
                  <input
                    type="checkbox"
                    id={finger.id}
                    value={finger.id}
                    className="peer hidden"
                    disabled={isAnimating}
                  />
                  <label
                    htmlFor={finger.id}
                    className="h-full w-full block cursor-pointer"
                  ></label>
                </div>
              ))}
              <div className="bg-yellow-100 col-span-5 z-20 md:me-10 me-7 md:rounded-none rounded-b-4xl"></div>
            </div>
          </section>
        </section>
        <section className="col-span-12 flex justify-center flex-col items-center space-y-1">
          <div className="flex space-x-10">
            {computerPick.map((pick, index) => (
              <span key={index} className="md:text-xl text-xs">
                {pick} {index < computerPick.length - 1 ? "and" : ""}
              </span>
            ))}
          </div>

          <div className="text-xs md:hidden mt-4">
            computer throw {selectedFingers.length} fingers
          </div>
          {/* <h1 className="text-xs tracking-widest">Choosed Variable</h1> */}
        </section>
      </section>
    );
  }
);

export default ComputerCore;
