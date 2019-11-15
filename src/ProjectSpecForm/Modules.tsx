import React, { useState, useEffect } from 'react';
import { ModuleType } from 'Entity';
import { makeStyles } from '@material-ui/styles';
import ModuleFormDialog from './ModuleFormDialog';
import {
  Chip,
  Theme,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

interface Props {
  modules: boolean;
  modulesList: ModuleType[];
  onAddModule: (mod: ModuleType) => void;
  onRemoveModule: (entityName: string) => void;
  onEditModule: (mod: ModuleType, i: number) => void;
  onModuleCheckboxChange:
    (eventOrPath: string | React.ChangeEvent<any>) =>
    void | ((eventOrTextValue: string | React.ChangeEvent<any>) => void);
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
  const {
    modules,
    modulesList,
    onAddModule,
    onEditModule,
    onRemoveModule,
    onModuleCheckboxChange,
  } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState<ModuleType | undefined>();
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number>(-1);
  const classes = useStyles({});

  const handleChipClick = (mod: ModuleType, index: number) => {
    setSelectedModule(mod);
    setSelectedModuleIndex(index);
    setDialogOpen(true);
  };

  const handleStartNewForm = () => {
    setSelectedModule(undefined);
    setSelectedModuleIndex(-1);
    setDialogOpen(true);
  };

  useEffect(() => {
    if (!dialogOpen) {
      setSelectedModuleIndex(-1);
      setSelectedModule(undefined);
    }
  }, [dialogOpen]);

  return (
    <div className={classes.root}>
      <div className={classes.firstRow}>
        <FormControlLabel
          label="Modules"
          control={
            <Checkbox
              name="modules"
              value={modules}
              checked={modules}
              onChange={onModuleCheckboxChange}
            />
          }
          />
        <Button
          color="secondary"
          onClick={handleStartNewForm}
        >
          Adicionar módulo extra
        </Button>
      </div>
      <div className={classes.chipsContainer}>
        {modulesList.map((mod: ModuleType, i: number) => (
          <Chip
            color="secondary"
            disabled={!modules}
            key={mod.entityName}
            label={mod.entityName}
            onClick={() => handleChipClick(mod, i)}
            className={classes.chipRoot}
            onDelete={() => onRemoveModule(mod.entityName)}
          />
        ))}
      </div>
      <ModuleFormDialog
        open={dialogOpen}
        onAddModule={onAddModule}
        onEditModule={onEditModule}
        initialValues={selectedModule}
        onClose={() => setDialogOpen(false)}
        selectedModuleIndex={selectedModuleIndex}
      />
    </div>
  );
}
