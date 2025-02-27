import { useSelector } from "react-redux";
import { RootState } from "../store";

function GameHistory() {
  const history = useSelector((state: RootState) => state.gameState.history);
  return (
    <div>
      <h1>GameHistory</h1>
      {history.map(his => 
            <h1>{his}</h1>
      )}
    </div>
  );
}

export default GameHistory;
