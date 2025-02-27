import { ChangeEvent, useState } from "react";
import { addWinner } from "../features/GameSlice";
import { resetUserPicks, setUserPick } from "../features/PickSlice";
import calculateFinger, { calculateWinner } from "../utils/GameEngine";
import PlayerSelction from "./selection/PlayerSelction";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";

const variables = ["desto", "finger", "caw", "cawter", "oli"];

function Variable() {
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

  const variables = ["desto", "finger", "caw", "cawter", "oli"];

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

  function handleWinner() {
    const x: number = calculateFinger(playerFinger, 5);
    console.log(x);
    const winner = calculateWinner(x, userPick, computerPick);
    dispatch(addWinner(winner));
  }

  return (
    <div className="col-span-9 text-xl grid grid-cols-9 border border-teal-700 p-4">
      <section className="col-start-1 col-end-5 space-y-8  border border-red-800">
        <div className="">
          {variables.map((pick: string) => (
            <div key={pick} className="border-4 border-amber-700">
              <input
                type="checkbox"
                id={pick}
                value={pick}
                className="peer hidden"
                disabled={!picksVariable.includes(pick)}
                onChange={handleCheckbox}
                checked={userPicks.includes(pick)}
              />
              <label
                htmlFor={pick}
                className="select-none cursor-pointer border border-amber-900 py-3 px-6 font-bold transition-colors duration-200 ease-in-out 
               peer-checked:bg-red-300 peer-checked:text-gray-900 peer-checked:border-black-200"
              >
                {pick}
              </label>
            </div>
          ))}

          <button
            className="border border-amber-200 py-2 px-2 cursor-pointer bg-red-500 text-white"
            onClick={() => dispatch(resetUserPicks())}
          >
            Reset All Picks
          </button>
        </div>
      </section>
    </div>
  );
}

export default Variable;
