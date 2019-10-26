import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Theme, Typography, AppBar } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
  },
}));

export default function ApplicationBar() {
  const classes = useStyles();

  return (
    <AppBar>
      <Typography variant="h6" className={classes.title}>
        Create Backend App
      </Typography>
    </AppBar>
  );
}
