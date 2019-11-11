import React from 'react';
import { SubmittedEntity } from 'Entity';
import { makeStyles, Typography, Theme, Chip, Button } from '@material-ui/core';

interface Props {
  entities: SubmittedEntity[];
  onRemoveEntity: (entityName: string) => void;
  onAddEntityClick: () => void;
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
  const { entities, onRemoveEntity, onAddEntityClick } = props;
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <Typography component="h2" variant="h6">Entidades</Typography>
      <div className={classes.chipsContainer}>
        {entities.map(entity => (
          <Chip
            color="secondary"
            key={entity.name}
            label={entity.name}
            className={classes.chipRoot}
            onDelete={() => onRemoveEntity(entity.name)}
          />
        ))}
      </div>
      <Button color="primary" onClick={onAddEntityClick}>
        Adicionar Entidade
      </Button>
    </div>
  );
}
