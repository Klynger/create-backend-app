import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { ApiActions, EntityForm, Attribute } from 'Entity';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import React, { useState, useCallback, ChangeEvent } from 'react';
import AttributeField from './AttributeField';

interface AttributeFieldsNames {
  fieldName: string;
  fieldRequired: string;
  fieldType: string;
}

interface Props {
  open: boolean;
  onClose?: () => void;
}

function getDefaultApiActions(): ApiActions {
  return {
    DELETE: true,
    GET: true,
    POST: true,
    PUT: true,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  addAttributeButton: {
    marginTop: theme.spacing(1),
  },
  dialogContent: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: '25rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '25rem',
    width: '100%',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(1),
    width: '100%',
  },
}));

function useNames(indexName: number): AttributeFieldsNames {
  const getNames = useCallback(() => {
  return {
    fieldName: `fieldName${indexName}`,
    fieldRequired: `fieldRequired${indexName}`,
    fieldType: `fieldType${indexName}`,
  };
  }, [indexName]);

  return getNames();
}

function getDefaultAttributeFieldsValues(attributeFieldNames: AttributeFieldsNames): Record<string, string | boolean> {
  const { fieldName, fieldType, fieldRequired } = attributeFieldNames;

  return {
    [fieldName]: '',
    [fieldType]: '',
    [fieldRequired]: false,
  };
}

let fieldIndex = 0;

export default function EntityFormDialog(props: Props) {
  const { open, onClose } = props;
  const [attributesNames, setAttributesNames] = useState<string[]>([]);
  const classes = useStyles();
  const { values, handleChange, handleSubmit, setFieldValue } = useFormik<EntityForm>({
    initialValues: {
      apiActions: getDefaultApiActions(),
      attributes: {},
      name: '',
    },
    onSubmit: submitValues => {
      console.log({ submitValues });
    },
  });
  const newAttributeFieldNames = useNames(fieldIndex);

  const handleAddNewAttribute = () => {
    const { attributes } = values;
    const { fieldName } = newAttributeFieldNames;
    fieldIndex++;
    const newAttributes = {
      ...attributes,
      [fieldName]: getDefaultAttributeFieldsValues(newAttributeFieldNames),
    };
    setAttributesNames(attributesNames.concat([fieldName]));
    setFieldValue('attributes', newAttributes);
  };

  const handleAttributeChange = (e: ChangeEvent<HTMLInputElement>, name: string, type: keyof Attribute) => {
    const { attributes } = values;
    const newAttributes = {
      ...attributes,
      [name]: {
        ...attributes[name],
        [type]: type === 'required' ? e.target.checked : e.target.value,
      },
    };

    setFieldValue('attributes', newAttributes);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="entity-form-dialog-title"
    >
      <DialogTitle id="entity-form-dialog-title">Nova Entidade</DialogTitle>
      <form className={classes.form} onSubmit={handleSubmit}>
        <DialogContent className={classes.dialogContent} dividers>
          <TextField
            name="name"
            value={values.name}
            className={classes.row}
            onChange={handleChange}
          />
          {attributesNames.map((name: string) => (
            <AttributeField
              key={name}
              attributeFieldName={name}
              onChange={handleAttributeChange}
              values={values.attributes[name]}
            />
          ))}
          <Button
            color="secondary"
            onClick={handleAddNewAttribute}
            className={classes.addAttributeButton}
          >
            Novo atributo
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">Cancelar</Button>
          <Button
            role="submit"
            color="primary"
            onClick={e => handleSubmit(e as any)}
          >
            Adicionar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
