import { NextPageContext, NextPage } from "next";
import React, { Component, useEffect } from "react";
import { AuthToken } from "../utility/cookies";
import Cookie from "js-cookie";
import axios from "axios";
import Router from "next/router";

export type AuthProps = {
  token: string;
  loggedIn: boolean;
};

export default async (PrivateRoute: NextPage<any>) => {
  let props = {};

  if (PrivateRoute.getInitialProps) {
    props = await PrivateRoute.getInitialProps(null);
  }
  PrivateRoute.getInitialProps = async ctx => {
    let token = null;

    if (ctx.req) {
      token = AuthToken.getCookie(ctx, "token");
      try {
        const response = await axios.get("/tasks", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.status == 200) {
          return { token, loggedIn: true, ...props };
        }
      } catch (error) {
        console.log("redirecting back to main page");

        if (ctx.res) {
          const url = ctx.req.url.replace(/[/](\w+)/gi, "$1");
          console.log(url);
          ctx.res.writeHead(302, {
            Location: `/login?redirectTo=${url}`
          });
          ctx.res.end();
        } else {
          Router.push("/");
        }
      }
    }
    return { token, loggedIn: false, ...props };
  };

  return PrivateRoute;
};
