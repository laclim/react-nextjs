import * as React from "react";
// import axios from "axios";
import * as Button from "@material-ui/core/Button";
import Router from "next/router";
import { useContext } from "react";
import { DispatchContext } from "../context/contextStore";
import axios from "axios";
import { login } from "../context";
interface ButtonProps extends Button.ButtonProps {
  children: any;
  email: string;
  password: string;
}

const LoginButton = (props: ButtonProps, { query }) => {
  const { children, email, password, ...others } = props;
  const dispatch = useContext(DispatchContext);
  // const router = useRouter();

  const handleLogin = async () => {
    const isLogin = await login(email, password);

    if (isLogin == true) {
      if (Router.query.redirectTo) Router.push("/" + Router.query.redirectTo);
      else Router.replace("/home");
    }
  };

  return (
    <React.Fragment>
      <Button.default {...others} onClick={handleLogin}>
        {children}
      </Button.default>
    </React.Fragment>
  );
};
LoginButton.getInitialProps = ({ query }) => {
  return { query };
};
export default LoginButton;
