import * as React from "react";
import axios from "axios";
import * as Button from "@material-ui/core/Button";

import { useContext } from "react";
import { DispatchContext } from "../context/contextStore";

interface ButtonProps extends Button.ButtonProps {
  children: any;
}
const LogoutButon = (props: ButtonProps) => {
  const { children, ...others } = props;

  const dispatch = useContext(DispatchContext);
  const handleLogout = async () => {
    // const response = await axios.post("/api/login", {
    //     email,
    //     password
    // });
    // if (response.status == 200) {
    //     localStorage.setItem("at", response.data.token);
    //     localStorage.setItem("rt", response.data.refreshToken);
    //     axios.defaults.headers.common["Authorization"] =
    //         "Bearer " + response.data.token;
    //     dispatch({ type: "SET_AUTH", payload: response.data.userId });
    //     history.replace(from);
    // }
    localStorage.removeItem("at");
    localStorage.removeItem("rt");
  };

  return (
    <React.Fragment>
      <Button.default {...others} onClick={handleLogout}>
        {children}
      </Button.default>
    </React.Fragment>
  );
};

export default LogoutButon;
