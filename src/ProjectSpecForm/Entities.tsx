import React, { useState, useEffect } from 'react';
import { SubmittedEntity } from 'Entity';
import EntityFormDialog from './EntityFormDialog';
import { makeStyles, Typography, Theme, Chip, Button } from '@material-ui/core';

interface Props {
  entities: SubmittedEntity[];
  onRemoveEntity: (entityName: string) => void;
  onAddEntity: (entity: SubmittedEntity) => void;
  onEditEntity: (entity: SubmittedEntity, index: number) => void;
}

const useStyles = makeStyles((theme: Theme) => {
  return ({
    chipRoot: {
      cursor: 'pointer',
      margin: theme.spacing(0.5),
    },
    chipsContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      paddingBottom: theme.spacing(1),
    },
    root: {
      alignItems: 'flex-start',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  });
});

export default function Entities(props: Props) {
  const {
    entities,
    onAddEntity,
    onEditEntity,
    onRemoveEntity,
  } = props;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<SubmittedEntity | undefined>();
  const [selectedEntityIndex, setSelectedEntityIndex] = useState<number>(-1);
  const classes = useStyles({});

  const handleChipClick = (entity: SubmittedEntity, index: number) => {
    setSelectedEntity(entity);
    setSelectedEntityIndex(index);
    setDialogOpen(true);
  };

  const handleAddNewEntityClick = () => {
    setSelectedEntityIndex(-1);
    setSelectedEntity(undefined);
    setDialogOpen(true);
  };

  useEffect(() => {
    if (!dialogOpen) {
      setSelectedEntityIndex(-1);
      setSelectedEntity(undefined);
    }
  }, [dialogOpen]);

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h6">Entidades</Typography>
      <div className={classes.chipsContainer}>
        {entities.map((entity: SubmittedEntity, i: number) => (
          <Chip
            color="secondary"
            key={entity.name}
            label={entity.name}
            className={classes.chipRoot}
            onClick={() => handleChipClick(entity, i)}
            onDelete={() => onRemoveEntity(entity.name)}
          />
        ))}
      </div>
      <Button color="primary" onClick={handleAddNewEntityClick}>
        Adicionar Entidade
      </Button>
      <EntityFormDialog
        open={dialogOpen}
        onAddEntity={onAddEntity}
        onEditEntity={onEditEntity}
        selectedEntity={selectedEntity}
        onClose={() => setDialogOpen(false)}
        selectedEntityIndex={selectedEntityIndex}
      />
    </div>
  );
}
