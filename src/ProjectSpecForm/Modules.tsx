import React from 'react';
import { ModuleType } from 'Entity';
import { makeStyles } from '@material-ui/styles';
import { Theme, FormControlLabel, Checkbox, Button, Chip } from '@material-ui/core';

interface Props {
  modules: boolean;
  modulesList: ModuleType[];
  onRemoveModule: (entityName: string) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  checkboxRoot: {
    marginRight: theme.spacing(1),
  },
  chipRoot: {
    cursor: 'pointer',
    margin: theme.spacing(0.5),
  },
  chipsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingBottom: theme.spacing(1),
  },
  firstRow: {
    display: 'flex',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default function Modules(props: Props) {
  const { modules, modulesList, onRemoveModule } = props;
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <div className={classes.firstRow}>
        <FormControlLabel
          label="Modules"
          control={
            <Checkbox
            name="controllers"
            value={modules}
            checked={modules}
            />
          }
          />
        <Button color="secondary">Adicionar módulo extra</Button>
      </div>
      <div className={classes.chipsContainer}>
        {modulesList.map(mod => (
          <Chip
            color="secondary"
            key={mod.entityName}
            label={mod.entityName}
            className={classes.chipRoot}
            onDelete={() => onRemoveModule(mod.entityName)}
          />
        ))}
      </div>
    </div>
  );
}
