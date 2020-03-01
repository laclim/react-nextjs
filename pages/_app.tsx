import App, { AppProps, Container, AppContext } from "next/app";
import { AllContext } from "../context/initialState";
import * as React from "react";
import AppBar from "../containers/AppBar/AppBar.component";
import theme from "../utility/theme";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import Head from "next/head";
import "normalize.css";
import axios from "axios";
// import Router from "next/router";
const initialState = {
  auth: false,
  userId: ""
};

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  axios.defaults.baseURL = process.env.BACKEND_URL;

  // axios.interceptors.request.use(
  //   config => {
  //     /** In dev, intercepts request and logs it into console for dev */
  //     console.info("config ", config);
  //     return config;
  //   },
  //   error => {
  //     console.error("error ", error);
  //     return Promise.reject(error);
  //   }
  // );

  // axios.interceptors.response.use(
  //   response => {
  //     // if (response.config.parse) {
  //     //     //perform the manipulation here and change the response object
  //     // }
  //     console.log(response);
  //     return response;
  //   },
  //   error => {
  //     // Router.push("/login");
  //     return Promise.reject(error);
  //   }
  // );
  return (
    <React.Fragment>
      <AllContext>
        <Head>
          <title>My page</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <MuiThemeProvider theme={theme}>
          <AppBar />
          <CssBaseline />
          <Component {...pageProps} />
        </MuiThemeProvider>
      </AllContext>
    </React.Fragment>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`

  const appProps = await App.getInitialProps(appContext);
  if (appContext.ctx.req) {
    appProps.pageProps.baseUrl =
      process.env.NODE_ENV === "production"
        ? `//${appContext.ctx.req.headers.host}`
        : `//${appContext.ctx.req.headers.host}`;
  }
  // console.log(appProps);

  axios.defaults.baseURL = process.env.BACKEND_URL;

  return { ...appProps };
};

export default MyApp;
