import * as React from "react";

import { Typography } from "@material-ui/core";

import { useEffect } from "react";

interface HomeProps {
  title: string;
  updateTitle: any;
}

const Home = (props: HomeProps, titleList: string[]) => {
  return (
    <React.Fragment>
      <Typography>{"title"}</Typography>
    </React.Fragment>
  );
};

export default Home;
