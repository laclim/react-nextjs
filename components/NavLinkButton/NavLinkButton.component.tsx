import * as React from "react";
import { withStyles } from "@material-ui/core";
import * as Button from "@material-ui/core/Button";
import Link from "next/link";

import style from "./NavLinkButton.style";

interface NavLinkButtonProps extends Button.ButtonProps {
  classes: any;
  children: any;
  to: string;
}

const NavLinkButton = (props: NavLinkButtonProps) => {
  const { classes, children, to, ...others } = props;

  return (
    <React.Fragment>
      <Link href={to}>
        <Button.default className={classes.button} {...others}>
          {children}
        </Button.default>
      </Link>
    </React.Fragment>
  );
};

export default withStyles(style)(NavLinkButton);
