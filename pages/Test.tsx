import * as React from "react";
import { Typography } from "@material-ui/core";
import AppBar from "../containers/AppBar/AppBar.component";
interface TestProps {}

const Test = (props: TestProps) => {
  return (
    <React.Fragment>
      <Typography>Test page</Typography>
    </React.Fragment>
  );
};

export default Test;
