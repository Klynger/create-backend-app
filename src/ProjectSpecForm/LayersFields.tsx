import React from 'react';
import Modules from './Modules';
import { ModuleType } from 'Entity';
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
  models: boolean;
  modules: boolean;
  services: boolean;
  controllers: boolean;
  repositories: boolean;
  modulesList: ModuleType[];
  onAddModule: (mod: ModuleType) => void;
  onRemoveModule: (entityName: string) => void;
  onChangeModule: (mod: ModuleType, i: number) => void;
  onChange: (eventOrPath: string | React.ChangeEvent<any>) =>
    void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void);
}

export default function LayersFields(props: Props) {
  const {
    models,
    modules,
    onChange,
    services,
    controllers,
    modulesList,
    onAddModule,
    repositories,
    onChangeModule,
    onRemoveModule,
  } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h6">Camadas</Typography>
      <Modules
        modules={modules}
        modulesList={modulesList}
        onAddModule={onAddModule}
        onEditModule={onChangeModule}
        onRemoveModule={onRemoveModule}
        onModuleCheckboxChange={onChange}
      />
      <div className={classes.checkboxesContainer}>
        <FormControlLabel
          label="Controllers"
          control={
            <Checkbox
              name="controllers"
              onChange={onChange}
              value={controllers}
              checked={controllers}
            />
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
