import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { resetPicks, resetUserPicks, setUserPick } from "../../features/PickSlice";

// Grid schema for the player selection options
const gridSchema = [
  { picks: "desto" },
  { picks: "finger" },
  { picks: "caw" },
  { picks: "cawter" },
  { picks: "oli" },
];

interface PlayerSelectionProps {
  isProcessing: boolean;
}

const PlayerSelection: React.FC<PlayerSelectionProps> = ({ isProcessing }) => {
  const [playerFinger, setPlayerFinger] = useState<number>(0);

  // Redux state and dispatch
  const userPick = useSelector(
    (state: RootState) => state.picksVariable.userPicks
  );
  const computerPick = useSelector(
    (state: RootState) => state.picksVariable.computerPicks
  );
  const dispatch = useDispatch();

  const { picksVariable, userPicks } = useSelector(
    (state: RootState) => state.picksVariable
  );

  // Handle checkbox changes
  function handleCheckbox(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      const newValue = e.target.value;
      let updatedPicks: string[];
      let removedItem: string | null = null;

      // Limit user picks to 2
      if (userPicks.length >= 2) {
        removedItem = userPicks[0];
        updatedPicks = userPicks.slice(1).concat(newValue);
      } else {
        updatedPicks = [...userPicks, newValue];
      }

      dispatch(setUserPick({ updatedPicks, removedItem }));
    }
  }

  return (
    <section className="grid grid-cols-12 gap-x-5 gap-y-5">
      {/* Player Title */}
      <section className="col-span-12 md:py-5 pt-10 flex justify-center">
        <h1 className="md:text-xl text-sm">Player 1 | You</h1>
      </section>

      {/* Game Variable Header */}
      <section className="mb-6 col-span-12 flex flex-col space-y-2 text-center">
        <h1 className="md:text-xl text-xs">Game Variable</h1>
      </section>

      {/* Grid of Selection Options */}
      <section className="col-start-2 col-span-10 gap-x-10 grid grid-cols-3 gap-y-7">
        {gridSchema.map((pick) => (
          <div key={pick.picks} className="border border-amber-700">
            <input
              type="checkbox"
              id={pick.picks}
              value={pick.picks}
              disabled={!picksVariable.includes(pick.picks) || isProcessing}
              onChange={handleCheckbox}
              checked={userPicks.includes(pick.picks)}
              className="peer hidden"
            />
            <label
              htmlFor={pick.picks}
              className={`select-none py-10 cursor-pointer transition-colors duration-200 ease-in-out w-full md:text-sm text-[0.6rem] tracking-widest peer-checked:bg-red-800 peer-checked:text-white flex items-center justify-center ${
                !picksVariable.includes(pick.picks) ? "bg-blue-800 text-white" : ""
              }`}
            >
              {pick.picks}
            </label>
          </div>
        ))}

        {/* Reset Picks Button */}
        {userPick.length >= 1 && (
          <button
            className="border-1 cursor-pointer py-2 md:text-base text-[0.6rem] md:px-10 md:leading-8 leading-5"
            onClick={() => dispatch(resetUserPicks())}
            disabled={isProcessing}
          >
            Reset Picks
          </button>
        )}
      </section>

      {/* Instruction Text */}
      <section className={`col-start-2 col-span-12 md:text-sm md:leading-8 leading-6 text-[0.5rem]`}>
        <h1 className="">!You Have to choose at most 2 variable to start game</h1>
      </section>
    </section>
  );
};

// Correct export statement
export default PlayerSelection;