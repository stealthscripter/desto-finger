import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { resetComputerPicks, setComputerPick } from "../../features/PickSlice";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react"; // Import useEffect and useState

const gridSchema = [
  { picks: "desto", inputGrid: "col-start-3" },
  { picks: "finger", inputGrid: "col-start-6" },
  { picks: "caw", inputGrid: "col-start-9 " },
  { picks: "cawter", inputGrid: "col-start-4 " },
  { picks: "oli", inputGrid: "col-start-8 " },
];

const ComputerSelection = forwardRef((props, ref) => {
  const dispatch = useDispatch<AppDispatch>();
  const userPicks = useSelector(
    (state: RootState) => state.picksVariable.userPicks
  );
  const computerPicks = useSelector(
    (state: RootState) => state.picksVariable.computerPicks
  );
  const availablePicks = useSelector(
    (state: RootState) => state.picksVariable.picksVariable
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [tempPick, setTempPick] = useState<string | null>(null);

  const handleComputerChoice = () => {
    setIsAnimating(true);
    let animationCount = 0;
    const animationDuration = 2000;
    const intervalTime = 200;
    const animationInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * availablePicks.length);
      setTempPick(availablePicks[randomIndex]);
      animationCount += intervalTime;
      if (animationCount >= animationDuration) {
        clearInterval(animationInterval);
        setIsAnimating(false);
        dispatch(setComputerPick()); // Dispatch final pick
        setTempPick(null);
      }
    }, intervalTime);
  };

  // Expose the handleComputerChoice function to the parent via ref
  useImperativeHandle(ref, () => ({
    handleComputerChoice,
  }));

  return (
    <section className="grid grid-cols-12 gap-x-5 gap-y-5">
      <section className="col-span-12 py-5 flex justify-center">
        <h1 className="text-xl">Player 2 | Computer </h1>
      </section>
      <section className="mb-6 col-span-12 flex justify-center">
        <h1 className="text-xl">Game Variable </h1>
      </section>

      <section className="col-start-2 col-span-10 gap-x-10 grid grid-cols-3 gap-y-7">
        {gridSchema.map((pick) => (
          <div key={pick.picks} className="border border-amber-700">
            <input
              type="checkbox"
              id={pick.picks}
              value={pick.picks}
              disabled
              checked={
                computerPicks.includes(pick.picks) ||
                (isAnimating && tempPick === pick.picks)
              }
              className="peer hidden"
            />
            <label
              htmlFor={pick.picks}
              onClick={(e) => e.preventDefault()}
              className={`select-none py-10 cursor-pointer transition-colors duration-200 ease-in-out w-full
               peer-checked:bg-blue-800 peer-checked:text-white flex items-center justify-center ${
                 !availablePicks.includes(pick.picks) ? "border border-red-800 text-red-800" : ""
               }`}
            >
              {pick.picks}
            </label>
          </div>
        ))}
      </section>
    </section>
  );
});

export default ComputerSelection;
