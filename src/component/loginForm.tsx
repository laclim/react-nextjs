import TextField from "@material-ui/core/TextField";
import { Container, Button, Grid, makeStyles, Box } from "@material-ui/core";
import { useState, useEffect } from "react";
import "firebase/auth";
import "firebase/firestore";
import firebase from "../../firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    justifyContent: "center",
  },

  button: {
    height: theme.spacing(4),
  },
  input: {
    height: theme.spacing(4),
  },
}));
const windowRef = window as any;
export default function LoginForm() {
  const classes = useStyle();
  const [phone_no, setPhone_no] = useState("");
  const [code, setCode] = useState("");
  const [recaptcha, setRecaptcha] = useState(true);

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/signedIn",
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
  };

  useEffect(() => {
    windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container"
    );
    console.log(windowRef.recaptchaVerifier);
    windowRef.recaptchaVerifier.render().then(function (widgetId) {
      windowRef.recaptchaWidgetId = widgetId;
    });
  }, []);

  const handleSubmit = () => {
    onSignInSubmit();
  };

  const onSignInSubmit = () => {
    const appVerifier = windowRef.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phone_no, appVerifier)
      .then(function (confirmationResult) {
        setRecaptcha(false);
        windowRef.confirmationResult = confirmationResult;
        console.log("sent");
      })
      .catch(function (error) {
        console.log(error);
        appVerifier.reset(windowRef.recaptchaWidgetId);
      });
  };

  const handleSignIn = () => {
    windowRef.confirmationResult
      .confirm(code)
      .then(function (result) {
        // User signed in successfully.
        var user = result.user;
        console.log(user);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className={classes.root}>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />

      <Box display="flex" p={1} m={1}>
        <Box flexGrow={1}>
          <TextField
            variant="outlined"
            label="Phone No."
            value={phone_no}
            onChange={(e) => setPhone_no(e.target.value)}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => handleSubmit()}
        >
          Send Code
        </Button>
      </Box>
      <Box display="flex" p={1} m={1}>
        <Box flexGrow={1}>
          <TextField
            variant="outlined"
            label="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </Box>

        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          onClick={() => handleSignIn()}
        >
          Sign In
        </Button>
      </Box>
      {recaptcha && (
        <Box display="flex" p={1} m={1}>
          <div id="recaptcha-container"></div>
        </Box>
      )}
    </div>
  );
}
