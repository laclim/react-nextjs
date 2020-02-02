import { createContext } from "react";
import { userStore, taskStore } from "./initialState";
import { Action } from "./reducer";
// import { initialState } from "./initialState";

type IState = {
  userStore?: typeof userStore;
  taskStore?: typeof taskStore;
};
export const StateContext = createContext<IState>({
  userStore: { auth: false, userId: "", loading: true }
});
export const DispatchContext = createContext<React.Dispatch<Action>>(null);
