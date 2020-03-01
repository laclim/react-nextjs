import * as React from "react";
import { Typography } from "@material-ui/core";
import AppBar from "../containers/AppBar/AppBar.component";
import PrivateRoute from "../components/PrivateRoute";
import Link from "next/link";
import axios from "axios";
import { AppContext } from "next/app";

const Task = ({ welcome }) => {
  console.log(welcome);
  return (
    <React.Fragment>
      <Link href="/">
        <a>Index</a>
      </Link>
      <Link href="/task/name" shallow>
        <a>Name</a>
      </Link>
      <br />
      <Link href="/task/[name]" as="/task/berry-firmness" shallow>
        <a>berry-firmness</a>
      </Link>
      <br />
      <Typography>{welcome || ""}</Typography>
    </React.Fragment>
  );
};

Task.getInitialProps = async ({ query, pathname }) => {
  // const appProps = await Test.getInitialProps(ctx);
  //   const q = ;
  //   berry-firmness
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/${query.q}`);
    if (res.data) return { welcome: res.data.count };
  } catch (error) {
    return { welcome: "" };
  }
};

export default Task;
