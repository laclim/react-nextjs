import Cookie from "js-cookie";
import Router from "next/router";
import { NextPageContext } from "next";
const TOKEN_STORAGE_KEY = "token";

export class AuthToken {
  // ...
  static async storeToken(token: string) {
    Cookie.set(TOKEN_STORAGE_KEY, token);
    // await Router.push("/");
  }
  static getCookie(ctx: NextPageContext, key: string) {
    key = key.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
    var regex = new RegExp("(?:^|;)\\s?" + key + "=(.*?)(?:;|$)", "i");
    if (ctx.req.headers.cookie) {
      const match = ctx.req.headers.cookie.match(regex);
      return match && unescape(match[1]);
    }
    return;
  }
}
