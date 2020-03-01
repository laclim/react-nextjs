import * as React from "react";
import { Typography } from "@material-ui/core";
import AppBar from "../containers/AppBar/AppBar.component";
import PrivateRoute from "../components/PrivateRoute";
import Link from "next/link";
interface TestProps {}

const Test = ({ welcome }) => {
  return (
    <React.Fragment>
      <Link href="/home">
        <a>Home</a>
      </Link>
      <Typography>{welcome}</Typography>
    </React.Fragment>
  );
};

Test.getInitialProps = async ctx => {
  // const appProps = await Test.getInitialProps(ctx);
  console.log("Test page");
  return { welcome: "welcome" };
};

export default PrivateRoute(Test);
