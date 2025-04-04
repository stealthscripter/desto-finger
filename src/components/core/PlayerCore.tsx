import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ChangeEvent } from "react";

const leftFingers = [
  {
    id: "l-finger-1",
    styles: "md:mt-28 mt-48",
  },
  {
    id: "l-finger-2",
    styles: "md:mt-10 mt-40",
  },
  {
    id: "l-finger-3",
    styles: "mt-32 md:mt-0",
  },
  {
    id: "l-finger-4",
    styles: "md:mt-10 mt-40",
  },
  {
    id: "l-finger-thumb",
    styles:
      "md:mt-52 md:-mb-16 -mb-14  md:rotate-[0.5rad] rotate-[0.5rad] mt-60 -ms-3",
  },
];

const rightFingers = [
  {
    id: "r-finger-1",
    styles: "md:mt-28 mt-48",
  },
  {
    id: "r-finger-2",
    styles: "md:mt-10 mt-40",
  },
  {
    id: "r-finger-3",
    styles: "mt-32 md:mt-0",
  },
  {
    id: "r-finger-4",
    styles: "md:mt-10 mt-40",
  },
  {
    id: "r-finger-thumb",
    styles:
      "md:mt-52 md:-mb-16 -mb-14  md:rotate-[0.5rad] rotate-[0.5rad] mt-60 -ms-3",
  },
];

interface PlayerCoreProps {
  selectedFingers: string[];
  setSelectedFingers: React.Dispatch<React.SetStateAction<string[]>>;
  isThrowing: boolean;
}

function PlayerCore({
  selectedFingers,
  setSelectedFingers,
  isThrowing,
}: PlayerCoreProps) {
  const userPick = useSelector(
    (state: RootState) => state.picksVariable.userPicks
  );
  function handleCheckbox(e: ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;
    setSelectedFingers((prev) =>
      checked ? [...prev, value] : prev.filter((finger) => finger !== value)
    );
  }

  return (
    <section className="md:grid md:grid-cols-12 gap-x-5 gap-y-5">
      <section className="py-5 md:col-span-12 flex justify-center flex-col items-center space-y-2">
        <h1 className="text-xs text-center leading-6 md:text-base md:leading-0">
          How Many Fingers do you want to throw?{" "}
        </h1>
      </section>
      <section className="py-5 h-96 col-span-12 grid grid-cols-2 gap-x-12 md:px-16">
        <section className="px-5 ">
          {/* Left Hand */}
          <div className="w-full h-full grid grid-cols-5 grid-rows-5 gap-x-2">
            {/* Finger 1 */}
            {leftFingers.map((finger) => (
              <div
                key={finger.id}
                className={`row-span-4 rounded-t-4xl ${
                  finger.styles
                } w-full relative transition-colors duration-300 ${
                  selectedFingers.includes(finger.id)
                    ? "bg-red-800"
                    : "bg-yellow-100"
                }`}
              >
                <input
                  type="checkbox"
                  id={finger.id}
                  value={finger.id}
                  className="peer hidden"
                  onChange={handleCheckbox}
                  disabled={isThrowing}
                />
                <label
                  htmlFor={finger.id}
                  className="h-full w-full block cursor-pointer"
                ></label>
              </div>
            ))}

            {/* Palm */}
            <div className="bg-yellow-100 col-span-5 z-20 md:me-10 me-7 md:rounded-none rounded-b-4xl"></div>
          </div>
        </section>

        <section className="px-5">
          {/* Right Hand */}
          <div className="w-full h-full grid grid-cols-5 grid-rows-5 gap-x-2 scale-x-[-1]">
            {rightFingers.map((finger) => (
              <div
                key={finger.id}
                className={`row-span-4 rounded-t-4xl ${
                  finger.styles
                } w-full relative transition-colors duration-300 ${
                  selectedFingers.includes(finger.id)
                    ? "bg-red-800"
                    : "bg-yellow-100"
                }`}
              >
                <input
                  type="checkbox"
                  id={finger.id}
                  value={finger.id}
                  className="peer hidden"
                  onChange={handleCheckbox}
                  disabled={isThrowing}
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
      <section className="col-span-12 flex justify-center flex-col items-center">
        <div className="flex space-x-10">
          {userPick.map((pick, index) => (
            <span key={index} className="md:text-xl text-xs md:mb-0 mb-10">
              {pick} {index < userPick.length - 1 ? "and" : ""}
            </span>
          ))}
        </div>
        <div className="text-xs md:hidden">you throw {selectedFingers.length} fingers</div>
        {/* <h1 className="text-xs tracking-widest">Choosed Variable</h1> */}
      </section>
    </section>
  );
}

export default PlayerCore;
