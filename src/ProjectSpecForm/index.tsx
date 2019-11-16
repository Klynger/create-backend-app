import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab } from '@material-ui/core';
import FormContentSwitcher from './FormContentSwitcher';

const useStyles = makeStyles({
  paper: {
    flexGrow: 1,
  },
  root: {
    width: '100%',
  },
});

export default function ProjectSpecForm() {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);
  const showNormalForm = tabIndex === 0;

  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Tabs
          value={tabIndex}
          variant="fullWidth"
          onChange={handleTabChange}
        >
          <Tab label="Formulário" />
          {/* <Tab label="Definição JSON" /> */}
        </Tabs>
      </Paper>
      <FormContentSwitcher showNormalForm={showNormalForm} />
    </div>
  );
}
