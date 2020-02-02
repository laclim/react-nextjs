import * as React from "react";

import AppBar from "../containers/AppBar/AppBar.component";
import { StateContext, DispatchContext } from "../context/contextStore";
import { useContext } from "react";
import { useUser } from "../context/initialState";

const App = () => {
  const { userStore } = useContext(StateContext);
  const { auth, userId } = userStore;
  const dispatch = useContext(DispatchContext);

  const handleIncrease = event => {
    dispatch({ type: "SET_AUTH", payload: { userId: "aaaa" } });
    console.log(auth);
  };
  if (auth == null) {
    return <h1>{"loading"}</h1>;
  }
  return (
    <React.Fragment>
      <button onClick={handleIncrease}>Increase</button>
      <h1>{auth.toString() + "" + userId}</h1>
    </React.Fragment>
  );
};

export default App;
