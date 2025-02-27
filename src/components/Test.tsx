import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { resetPicks, resetUserPicks, setUserPick } from "../features/PickSlice";

const gridSchema = [
  { picks: "desto", inputGrid: "col-start-3" },
  { picks: "finger", inputGrid: "col-start-6" },
  { picks: "caw", inputGrid: "col-start-9 " },
  { picks: "cawter", inputGrid: "col-start-4 " },
  { picks: "oli", inputGrid: "col-start-8 " },
];

function PlayerSelction() {
  const [playerFinger, setPlayerFinger] = useState<number>(0);

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

  function handleCheckbox(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) {
      const newValue = e.target.value;
      let updatedPicks: string[];
      let removedItem: string | null = null;

      if (userPicks.length >= 2) {
        removedItem = userPicks[0];
        updatedPicks = userPicks.slice(1).concat(newValue);
      } else {
        updatedPicks = [...userPicks, newValue];
      }
      dispatch(setUserPick({ updatedPicks, removedItem }));
    }
  }
  console.log(userPicks)
  console.log(picksVariable)
  return (
    <div className="border border-teal-500 col-span-6 font-2P">
      <section className="border border-teal-500 grid grid-cols-12 gap-x-5 gap-y-5">
        <section className="border border-amber-800 col-span-12 py-5 flex justify-center">
          <h1 className="text-xl">Player 1 </h1>
        </section>
        <section className="border border-amber-800 py-7 col-span-12 flex justify-center">
          <h1 className="text-xl">Game Variable </h1>
        </section>
        {gridSchema.map((pick) => (
          <section
            key={pick.picks}
            className={`border border-amber-800 ${pick.inputGrid} col-span-2 flex justify-center`}
          >
            <input
              type="checkbox"
              id={pick.picks}
              value={pick.picks}
              disabled={!picksVariable.includes(pick.picks)}
              onChange={handleCheckbox}
              checked={userPicks.includes(pick.picks)}
              className="peer hidden"
            />
            <label
              htmlFor={pick.picks}
              className={`select-none py-10 cursor-pointer transition-colors duration-200 ease-in-out w-full
               peer-checked:bg-red-300 peer-checked:text-gray-900 peer-checked:border-black-200 flex items-center justify-center ${!picksVariable.includes(pick.picks) ? "bg-amber-400" : ""}`}
            >
              {pick.picks}
            </label>
          </section>
        ))}

        <button
          className="border border-amber-700 col-start-3 col-span-3 py-2 mt-10"
          onClick={() => dispatch(resetUserPicks())}
        >
          Reset Picks
        </button>
      </section>
    </div>
  );
}

export default PlayerSelction;
