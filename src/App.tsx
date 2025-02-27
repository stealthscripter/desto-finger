import { useSelector } from "react-redux";
import { RootState } from "./store";
import FutureLayout from "./layout/FutureLayout";
import GameLayout from "./layout/GameLayout";

function App() {
  const playNow = useSelector((state: RootState) => state.gameState.playNow);

  return (
    <>
      {playNow ? <GameLayout /> : <FutureLayout />}
    </>
  );
}

export default App;
