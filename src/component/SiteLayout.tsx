import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { useContextDispatch, useContextState } from "../context";

import Link from "next/link";
import { Box, Container, Avatar, Fab, Menu, MenuItem } from "@material-ui/core";

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
   
  }, []);

  const { mounted } = useContextState();

  return <div>{mounted && <MenuBar children={children} />}</div>;
};

const MenuBar = ({ children }) => {
  const handleLogout = () => {
  
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
