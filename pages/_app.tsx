import { AppProps, Container } from "next/app";
import { AllContext } from "../context/initialState";
import * as React from "react";
import AppBar from "../containers/AppBar/AppBar.component";
import theme from "../utility/theme";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import Head from "next/head";
import "normalize.css";
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

export default MyApp;
