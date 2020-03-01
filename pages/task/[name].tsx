import * as React from "react";
import { Typography } from "@material-ui/core";

import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import Router from "next/router";
const Name = ({ welcome }) => {
  const router = useRouter();
  return (
    <React.Fragment>
      <Link href="/">
        <a>Task</a>
      </Link>
      <Typography>{welcome}</Typography>
    </React.Fragment>
  );
};

Name.getInitialProps = async ({ query, pathname, params, asPath }) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/${query.name}`);
    console.log(res.data);

    return { welcome: res.data.count };
  } catch (error) {
    return { welcome: "" };
  }
};

export default Name;
