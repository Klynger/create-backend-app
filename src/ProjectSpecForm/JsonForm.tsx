import React from 'react';
import { Typography, makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
  },
}));

export default function JsonForm() {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <Typography variant="h5" component="h1">
        Cole sua definição JSON
      </Typography>
    </section>
  );
}
