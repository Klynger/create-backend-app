import React from 'react';
import { makeStyles, FormControlLabel, Checkbox, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  checkboxesContainer: {
    display: 'flex',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
});

interface Props {
  // modules: boolean;
  controllers: boolean;
  services: boolean;
  repositories: boolean;
  models: boolean;
  onChange: (eventOrPath: string | React.ChangeEvent<any>) =>
    void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void);
}

export default function LayersFields(props: Props) {
  const {
    models,
    onChange,
    // modules,
    services,
    controllers,
    repositories,
  } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h6">Camadas</Typography>
      <div className={classes.checkboxesContainer}>
        <FormControlLabel
          label="Controllers"
          control={
            <Checkbox checked={controllers} value={controllers} name="controllers" onChange={onChange} />
          }
        />
        <FormControlLabel
          label="Repositories"
          control={
            <Checkbox checked={repositories} value={repositories} name="repositories" onChange={onChange} />
          }
        />
        <FormControlLabel
          label="Services"
          control={
            <Checkbox checked={services} value={services} name="services" onChange={onChange} />
          }
        />
        <FormControlLabel
          label="Models"
          control={
            <Checkbox checked={models} value={models} name="models" onChange={onChange} />
          }
        />
      </div>
    </div>
  );
}
