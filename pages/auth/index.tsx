import * as React from "react";
import { AuthToken } from "../../utility/cookies";
import axios from "axios";
import { NextPageContext } from "next";
import Router from "next/router";
const Page = props => {
  return (
    <React.Fragment>
      <h1>Test page</h1>
    </React.Fragment>
  );
};

Page.getInitialProps = async (ctx: NextPageContext) => {
  let token = null;

  if (ctx.req) {
    // ugly way to get cookie value from a string of values
    // good enough for demostration

    token = AuthToken.getCookie(ctx, "token");
    try {
      const response = await axios.get("/tasks", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status == 200) {
        // console.log(response.data);
        return { token, loggedIn: true };
      }
    } catch (error) {
      //   console.log(error);
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
  return { token, loggedIn: true };
};

export default Page;
