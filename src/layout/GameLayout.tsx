import { useEffect, useRef, useState } from "react";
import ComputerSelection from "../components/selection/ComputerSelection";
import PlayerSelction from "../components/selection/PlayerSelction";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import GameEngine from "../utils/GameEngine";
import {
  setComputerFinger,
  setComputerScore,
  setPlayerFinger,
  setPlayerScore,
  setStarted,
  setWhoStart,
} from "../features/GameSlice";
import PlayerCore from "../components/core/PlayerCore";
import ComputerCore from "../components/core/ComputerCore";
import { resetPicks } from "../features/PickSlice";

interface ComputerSelectionMethods {
  handleComputerChoice: () => void;
}

interface ComputerCoreMethods {
  handleComputerStart: () => void;
}

function GameLayout() {
  const [selectedPlayerFingers, setSelectedPlayerFingers] = useState<string[]>(
    []
  );
  const [selectedComputerFingers, setSelectedComputerFingers] = useState<
    string[]
  >([]);
  const [isProcessing, setIsProcessing] = useState(false); // New state for loading
  const [isThrowing, setIsThrowing] = useState(false); // New state for loading
  const [history, setHistory] = useState<string[]>([]);
  const [currentWinner, setCurrentWinner] = useState<string>("");
  const [computerScore, setComputerScore] = useState<Number>(0);
  const [playerScore, setPlayerScore] = useState<Number>(0);
  const [winnerFinger, setWinnerFinger] = useState<string | null>("");
  const [errors, setErrors] = useState<string>(""); // State for errors

  // Refs
  const computerSelectionRef = useRef<ComputerSelectionMethods | null>(null);
  const computerCoreRef = useRef<ComputerCoreMethods | null>(null);

  const computerFinger = useSelector(
    (state: RootState) => state.gameState.computerFinger
  );
  const playerFinger = useSelector(
    (state: RootState) => state.gameState.playerFinger
  );
  const userPick = useSelector(
    (state: RootState) => state.picksVariable.userPicks
  );
  const computerPick = useSelector(
    (state: RootState) => state.picksVariable.computerPicks
  );
  const isStarted = useSelector((state: RootState) => state.gameState.started);
  const dispatch = useDispatch();

  const handleReadyToPlay = () => {
    if (userPick.length < 2) {
      setErrors("You Have to choose at most 2 variable to start game");
      // Clear the error after 3 seconds
      setTimeout(() => {
        setErrors("");
      }, 3000);
      return;
    }
    setIsProcessing(true); // Set loading state to true
    if (computerSelectionRef.current) {
      computerSelectionRef.current.handleComputerChoice();
      setTimeout(() => {
        dispatch(setStarted(true));
        setIsProcessing(false); // Set loading state to false after computer choice is made
      }, 3000); // Dispatch after 3 seconds
    }
  };

  const handleStartGame = () => {
    setIsThrowing(true); // Set loading state to true
    if (computerCoreRef.current) {
      computerCoreRef.current.handleComputerStart(); // Call the child function
      setTimeout(() => {
        setIsThrowing(false); // Set loading state to false after computer choice is made
        try {
          const calc = GameEngine.calculateFinger(
            selectedPlayerFingers.length,
            selectedComputerFingers.length
          );
          const winner = GameEngine.calculateWinner(calc, userPick, computerPick);
          setCurrentWinner(winner);
          setHistory((prev) => [...prev, winner]);
          const scores = GameEngine.getScores();
          console.log(
            `Player Score: ${scores.playerScore}, Computer Score: ${scores.computerScore}`
          );
          setComputerScore(scores.computerScore);
          setPlayerScore(scores.playerScore);
          setWinnerFinger(scores.winnerFinger);
        } catch (error) {
          console.error("Error calculating winner:", error);
        }
      }, 3000); // Dispatch after 3 seconds
    } else {
      console.error("ComputerCore ref is null");
    }
  };

  return (
    <div
      className="p-4 md:grid md:grid-cols-7 gap-x-2 min-h-screen items-start 
     font-2P bg-[url(src/assets/backgrounds/stacked-steps-haikei.svg)] bg-slate-900 bg-blend-difference"
      style={{ backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
    >
      {!isStarted ? (
        <>
          <section className="col-span-7 ">
            <h1 className="md:text-sm text-[0.6rem] text-center">
              red box variable you choose and blue box is belong to computer (
              its not matrix )
            </h1>
          </section>
          <section className="col-span-3">
            <PlayerSelction isProcessing={isProcessing} />
          </section>
          <section className="flex justify-center flex-col">
            <button
              className={`border border-amber-700 col-start-3 col-span-3 md:py-3 md:text-base text-[0.7rem] px-6 py-3 cursor-pointer md:mt-10 my-8 md:px-4 ${
                isProcessing ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleReadyToPlay}
              disabled={isProcessing} // Disable button when processing
            >
              {isProcessing ? "Processing..." : "Ready To Play"}{" "}
              {/* Show loading text */}
            </button>
            {/* Conditionally render the error message */}
            {errors && (
              <p className="text-[0.8rem] text-red-800 mt-2">
                {errors}
              </p>
            )}
          </section>
          <section className="col-span-3">
            {/* Pass the ref to the ComputerSelection component */}
            <ComputerSelection ref={computerSelectionRef} />
          </section>
        </>
      ) : (
        // Rest of the code remains unchanged
        <>
          <section className="col-span-7">
            <h1 className="text-sm text-center">
              you can choose the thrown finger number by click fingers and
              toggle it{" "}
            </h1>
            <button
              disabled={isThrowing}
              className="text-sm border border-amber-600 px-4 py-2 cursor-pointer hover:bg-amber-800 hover:text-white duration-500"
              onClick={() => {
                dispatch(setStarted(false));
                dispatch(resetPicks());
                setHistory([]);
                setSelectedComputerFingers([]);
                setSelectedPlayerFingers([]);
                setPlayerScore(0);
                setComputerScore(0);
              }}
            >
              Set Variable Again
            </button>
          </section>
          <section className="col-span-3">
            <PlayerCore
              isThrowing={isThrowing}
              selectedFingers={selectedPlayerFingers}
              setSelectedFingers={setSelectedPlayerFingers}
            />
          </section>
          <section className="flex justify-center items-center flex-col">
            <button
              className={`border border-amber-700 hover:bg-amber-800 hover:text-white duration-500 col-start-3 col-span-3 md:py-3 cursor-pointer md:mt-10 md:px-4 ${
                isThrowing ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleStartGame}
              disabled={isThrowing} // Disable button when throwing
            >
              {isThrowing
                ? "Throwing..."
                : history.length > 0
                ? "Play Again"
                : "Start Game"}
            </button>
            {history.length >= 1 && (
              <div className="mt-10 w-3/4 flex justify-between items-center">
                <span className="text-2xl">{String(playerScore)}</span>
                <span className="text-2xl">-</span>
                <span className="text-2xl">{String(computerScore)}</span>
              </div>
            )}
          </section>
          <section className="col-span-3">
            <ComputerCore
              ref={computerCoreRef}
              selectedFingers={selectedComputerFingers}
              setSelectedFingers={setSelectedComputerFingers}
            />
          </section>
          {history.length >= 1 && (
            <section className="col-span-8 flex justify-evenly mt-10">
              <div className="">
                you throw {selectedPlayerFingers.length} fingers
              </div>
              <div>
                <h1 className="text-center my-2">
                  {isThrowing ? "" : currentWinner}
                </h1>
                <h1 className="text-center text-xl">Round {history.length}</h1>
                <p className="text-sm text-center mt-2">
                  {isThrowing ? "" : winnerFinger}
                </p>
              </div>
              <div className="">
                computer throw {selectedComputerFingers.length} fingers
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default GameLayout;