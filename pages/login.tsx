import TextField from "@material-ui/core/TextField";
import { Container, Button, Grid, makeStyles, Box } from "@material-ui/core";
import { useState, useEffect } from "react";
import "firebase/auth";
import "firebase/firestore";
import firebase from "../firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import LoginForm from "../src/component/loginForm";
import Head from "next/head";
import { useContextState } from "../src/context";
import Router from "next/router";

export default function Login() {
  const { loggedIn } = useContextState();

  if (loggedIn) {
    Router.push("/");
    return <div></div>;
  } else {
    return (
      <div>
        <Head>
          <title>Login</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <LoginForm />
      </div>
    );
  }
}
