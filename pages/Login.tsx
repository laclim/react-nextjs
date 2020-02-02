import * as React from "react";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import {
  makeStyles,
  Theme,
  createStyles,
  Card,
  Grid,
  Container,
  Typography
} from "@material-ui/core";

import { useEffect, useContext, useState } from "react";
import Link from "next/link";

import LoginButton from "../components/LoginButton";
import { StateContext, DispatchContext } from "../context/contextStore";
import { useForm } from "../utility/useForm";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1)
      }
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    submit: { margin: theme.spacing(3, 0, 2) }
  })
);

const Login = () => {
  const classes = useStyles({});

  const state = useContext(StateContext);
  const { userStore, taskStore } = state;

  const [value, handleChange, setValue] = useForm({
    email: "",
    password: ""
  });
  const dispatch = useContext(DispatchContext);
  useEffect(() => {
    if (taskStore.email) setValue({ ...value, email: taskStore.email });
    else setValue({ email: "", password: "" });
  }, []);

  useEffect(() => {
    dispatch({ type: "SET_EMAIL", payload: { email: value.email } });
    console.log(value.email);
  }, [value.email]);

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <TextField
          name="email"
          value={value.email}
          label="Email"
          fullWidth
          onChange={handleChange}
        />

        <TextField
          name="password"
          value={value.password}
          label="Password"
          fullWidth
          onChange={handleChange}
        />

        <LoginButton
          variant="contained"
          color="primary"
          fullWidth
          className={classes.submit}
          email={value.email}
          password={value.password}
        >
          Log in
        </LoginButton>

        <Grid container>
          <Grid item xs>
            <Link href="#">
              <Typography variant="body2" color="secondary">
                {"Forgot password?"}
              </Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link href="/signup">
              <Typography variant="body2" color="secondary">
                {"Don't have an account? Sign Up"}
              </Typography>
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Login;
