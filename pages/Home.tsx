import React, { useState } from "react";

import { Typography } from "@material-ui/core";

import { useEffect } from "react";
import PrivateRoute from "../components/PrivateRoute";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
interface HomeProps {
  token: string;
  updateTitle: any;
  welcome: string;
}
// export class Home extends React.Component<HomeProps> {
//   static async getInitialProps(ctx) {
//     // const appProps = await Home.getInitialProps(ctx);
//     console.log("home page");
//     return { welcome: "welcome" };
//   }
//   render() {
//     return (
//       <Typography>{this.props.welcome}</Typography>
//       //       <Typography>{props.token}</Typography>
//     );
//   }
// }

const Home = ({ stars, baseUrl, task }) => {
  const router = useRouter();
  // useEffect(() => {
  //   router.push("/home", "/home", { shallow: true });
  // }, []);
  const [state, setstate] = useState({});
  useEffect(() => {
    (async () => {
      const response = await axios.get("tasks");
      setstate(response.data);
    })();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Home</title>
      </Head>
      <Typography>{baseUrl}</Typography>
      <Typography>{JSON.stringify(state)}</Typography>
      <Link href="/test" prefetch={false}>
        <a>To Test</a>
      </Link>
      {/* <Typography>{token}</Typography> */}
    </React.Fragment>
  );
};

Home.getInitialProps = async ctx => {};

export default PrivateRoute(Home);
