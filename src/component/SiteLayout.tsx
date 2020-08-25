import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useContextDispatch, useContextState } from "../context";
import firebase from "../../firebase";
import "firebase/auth";
import "firebase/firestore";
import Link from "next/link";
import { Box, Container, Avatar, Fab, Menu, MenuItem } from "@material-ui/core";
import Login from "../../pages/login";
import Profile from "./Profile";
import theme from "../theme";
import { StyledLink } from "./StyledLink";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  content: {
    marginTop: theme.spacing(8),
    justifyContent: "center",
  },
}));

const SiteLayout = ({ children }) => {
  const dispatch = useContextDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          // User is signed in.
          const displayName = user.displayName;
          dispatch({ type: "login", displayName });
        } else {
          // No user is signed in.
          console.log("no user logged in");
        }
        dispatch({ type: "mounted" });
      },
      // Prevent console error
      (error) => console.log(error)
    );
  }, []);

  const { mounted } = useContextState();

  return <div>{mounted && <MenuBar children={children} />}</div>;
};

const MenuBar = ({ children }) => {
  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        console.log("Log out from firebase");
        dispatch({ type: "logout" });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const dispatch = useContextDispatch();
  const { loggedIn, displayName } = useContextState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Box flexGrow={1}>
            <Link href="/">
              <Button
                disableElevation
                style={{ color: "white", textDecoration: "none" }}
              >
                VoteApp
              </Button>
            </Link>
          </Box>
          {!loggedIn ? (
            <Link href="/login">
              <Button
                color="inherit"
                style={{ color: "white", textDecoration: "none" }}
              >
                Login
              </Button>
            </Link>
          ) : (
            <div>
              <Box display="flex" alignItems="center">
                <Link href="/chat">
                  <Button>Chat</Button>
                </Link>

                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <Fab variant="extended">
                    <Avatar
                      src="/static/images/userPic.jpg"
                      style={{ marginRight: theme.spacing(1) }}
                    />
                    {displayName}
                  </Fab>
                </Button>
                <MenuDropdown anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
              </Box>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <div className={classes.content}>{children}</div>
      </Container>
    </div>
  );
};

function MenuDropdown({ anchorEl, setAnchorEl }) {
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>
        <StyledLink href="/profile">Profile</StyledLink>
      </MenuItem>
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem onClick={handleClose}>Logout</MenuItem>
    </Menu>
  );
}
export default SiteLayout;
