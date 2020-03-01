import * as React from "react";

import AppBar from "../containers/AppBar/AppBar.component";
import { StateContext, DispatchContext } from "../context/contextStore";
import { useContext } from "react";
import { useUser } from "../context/initialState";
import Link from "next/link";
const App = props => {
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
      <h1>{JSON.stringify(props.message)}</h1>
      <Link href="/task" passHref>
        <a>task</a>
      </Link>
    </React.Fragment>
  );
};

App.getInitialProps = async appContext => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  // const appProps = await App.getInitialProps(appContext);
  console.log("index");
  return { message: "Logged in" };
};

export default App;
