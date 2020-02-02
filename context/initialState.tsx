import { useReducer, useState, useEffect } from "react";
import { taskReducer, userReducer, UserState } from "./reducer";
import { StateContext, DispatchContext } from "./contextStore";
import * as React from "react";
import { combineReducers } from "../utility/combineReducers";

export const taskStore = {
  title: "",
  content: "",
  email: ""
};

export let userStore = {
  auth: false,
  userId: "",
  loading: true
};

export const AllContext = (props: any) => {
  const { children } = props;

  const rootReducer = combineReducers({
    userStore: userReducer,
    taskStore: taskReducer
  });
  const [globalState, globalDispatch] = useReducer(rootReducer, {
    userStore,
    taskStore
  });
  //   const [globalState, globalDispatch] = useReducer(userReducer, initialUser);
  return (
    <DispatchContext.Provider value={globalDispatch}>
      <StateContext.Provider value={globalState as any}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useUser = () => React.useContext(StateContext);
