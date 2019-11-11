import React from 'react';
import { AttributeForm } from 'Entity';
import DeleteIcon from '@material-ui/icons/Close';
import {
  Theme,
  Checkbox,
  TextField,
  IconButton,
  makeStyles,
  FormControlLabel,
  withStyles,
} from '@material-ui/core';
import { fade } from '@material-ui/core/styles/colorManipulator';
import red from '@material-ui/core/colors/red';

interface Props {
  onChange: (event: React.ChangeEvent<HTMLInputElement>, name: string, type: keyof AttributeForm) => void;
  onRemove: (attrFieldName: string) => void;
  values: AttributeForm;
  attributeFieldName: string;
}

export enum AttributeFieldType {
  name = 'name',
  required = 'required',
  type = 'type',
}

const DangerIconButton = withStyles((theme: Theme) => ({
  root: {
    '&:hover': {
      backgroundColor: fade(red[500], theme.palette.action.hoverOpacity),
    },
    color: red[500],
  },
}))(IconButton);

const useStyles = makeStyles((theme: Theme) => ({
  closeButtonContainer: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '50%',
    display: 'inline-block',
    opacity: 0,
    position: 'absolute',
    right: theme.spacing(1),
    top: -theme.spacing(2),
    transition: 'opacity 150ms ease-in-out',
  },
  root: {
    '&:hover $closeButtonContainer': {
      opacity: 1,
    },
    border: '1px solid grey',
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(2),
    padding: `0 ${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px`,
    position: 'relative',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(1),
    width: '100%',
  },
  textField: {
    width: '48%',
  },
}));

export default function AttributeField(props: Props) {
  const { onChange, values, attributeFieldName, onRemove } = props;
  const classes = useStyles();

  const getChangeFn = (type: keyof AttributeForm) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(e, attributeFieldName, type);

  return (
    <div className={classes.root}>
      <div className={classes.row}>
      <TextField
        value={values.name}
        label="Nome do atributo"
        className={classes.textField}
        onChange={getChangeFn('name')}
        />
        <TextField
        label="Tipo"
        value={values.type}
        className={classes.textField}
        onChange={getChangeFn('type')}
        />
      </div>
      <div className={classes.row}>
      <FormControlLabel
          label="Obrigatório"
          control={
            <Checkbox
              value={values.required}
              onChange={getChangeFn('required')}
            />
          }
        />
      </div>
      <div className={classes.closeButtonContainer}>
        <DangerIconButton
          size="small"
          onClick={() => onRemove(attributeFieldName)}
        >
          <DeleteIcon />
        </DangerIconButton>
      </div>
    </div>
  );
}
