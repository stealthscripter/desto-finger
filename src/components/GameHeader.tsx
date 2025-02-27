import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { setPlayNow } from "../features/GameSlice";

function GameHeader() {

  
  const dispatch = useDispatch<AppDispatch>();
  return (
    <nav className="md:col-span-9 py-10 font-2P text-xl">
      <ul className="md:grid md:grid-cols-9 gap-x-2 items-center flex justify-between">
        {/* Play Now button in the first column */}
        <li className="md:justify-center md:flex md:text-base text-sm">
          <button onClick={() => dispatch(setPlayNow(true))} className="md:border-2 md:bg-transparent bg-black md:border-red-800 md:px-4 md:py-2 px-2 py-2 rounded-3xl md:text-base text-sm cursor-pointer hover:bg-black hover:text-white duration-300 text-white md:text-black">Play Now</button>
        </li>

        {/* The Glimmering centered in the middle */}
        <li className="col-start-4 col-end-7 justify-self-center hidden md:flex">
          <h1>stealthscripter</h1>
        </li>

        {/* Menu button in the last column */}
        <li className="md:col-start-9 flex md:justify-center md:text-base text-sm">
          <button>Menu</button>
        </li>
      </ul>
    </nav>
  );
}

export default GameHeader;
