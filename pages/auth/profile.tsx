import * as React from "react";
import { AuthToken } from "../../utility/cookies";
import axios from "axios";
import { NextPageContext } from "next";
import Router from "next/router";
const Profile = props => {
  return (
    <React.Fragment>
      <h1>{props.a}</h1>
    </React.Fragment>
  );
};

Profile.getInitialProps = async appContext => {
  return { a: "a" };
};
export default Profile;
