import { Typography, TextField, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import firebase from "../../firebase";
import "firebase/auth";
import { useContextDispatch } from "../context";
export default function Profile() {
  const [profile, setProfile] = useState({ phoneNumber: "", displayName: "" });
  const dispatch = useContextDispatch();
  useEffect(() => {
    const user = firebase.auth().currentUser;
    setProfile({
      phoneNumber: user.phoneNumber,
      displayName: user.displayName,
    });
    console.log(user);
  }, []);

  function handleSave() {
    const user = firebase.auth().currentUser;
    user
      .updateProfile(profile)
      .then(() => {
        console.log("Save!");
        dispatch({
          type: "showSnackbar",
          successMessage: "Successfully Saved!",
        });
        dispatch({ type: "updateProfile", displayName: profile.displayName });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <Typography>User Profile</Typography>
      <TextField
        label="Phone No"
        style={{ margin: 8 }}
        placeholder="Phone No"
        helperText=""
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e) =>
          setProfile({ ...profile, phoneNumber: e.target.value })
        }
        value={profile.phoneNumber}
      />
      <TextField
        label="Display Name"
        style={{ margin: 8 }}
        placeholder="Display Name"
        helperText=""
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        value={profile.displayName}
        onChange={(e) =>
          setProfile({ ...profile, displayName: e.target.value })
        }
      />
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
}
