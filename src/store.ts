import { configureStore } from "@reduxjs/toolkit";
import picksVariableReducer from "./features/PickSlice";
import gameStateReducer from "./features/GameSlice";

const store = configureStore({
  reducer: {
    picksVariable: picksVariableReducer,
    gameState: gameStateReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;