import Head from "next/head";
import React, { useEffect, useState } from "react";
import firebase from "../firebase.js";
import "firebase/auth";
import "firebase/firestore";
import Button from "@material-ui/core/Button";
import App, { Container } from "next/app";
import { useContextState, useContextDispatch } from "../src/context";
import { Typography } from "@material-ui/core";

function Home() {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Index />
    </div>
  );
}

function Index() {
  const dispatch = useContextDispatch();
  const { loggedIn } = useContextState();
  const { count } = useContextState();
  const addRecord = () => {
    const db = firebase.firestore();
    db.collection("users")
      .add({
        first: "Alan",
        middle: "Mathison",
        last: "Turing",
        born: 1912,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <Container>
      {loggedIn && <Button onClick={() => addRecord()}>Add Record</Button>}
      <Button variant="contained" color="primary">
        Hello World
      </Button>
      <Button onClick={() => dispatch({ type: "increment" })}>++</Button>
      <Typography>{count}</Typography>
    </Container>
  );
}

Home.getInitialProps = async (appContext) => {
  // const appProps = await App.getInitialProps(appContext);

  return { asd: "sadas" };
};

export default Home;
