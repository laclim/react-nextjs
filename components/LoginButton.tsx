import * as React from "react";
// import axios from "axios";
import * as Button from "@material-ui/core/Button";

import { useContext } from "react";
import { DispatchContext } from "../context/contextStore";

interface ButtonProps extends Button.ButtonProps {
  children: any;
  email: string;
  password: string;
}

const LoginButton = (props: ButtonProps) => {
  const { children, email, password, ...others } = props;

  //   let history = useHistory();
  //   let location = useLocation();
  //   let { from } = (location.state as any) || { from: { pathname: "/" } };
  const dispatch = useContext(DispatchContext);
  //   const handleLogin = async () => {
  //     const response = await axios.post("/api/login", {
  //       email,
  //       password
  //     });
  //     if (response.status == 200) {
  //       localStorage.setItem("at", response.data.token);
  //       localStorage.setItem("rt", response.data.refreshToken);
  //       axios.defaults.headers.common["Authorization"] =
  //         "Bearer " + response.data.token;
  //       dispatch({ type: "SET_AUTH", payload: response.data.userId });
  //       history.replace(from);
  //     }
  //   };

  return (
    <React.Fragment>
      <Button.default {...others}>{children}</Button.default>
    </React.Fragment>
  );
};

export default LoginButton;
