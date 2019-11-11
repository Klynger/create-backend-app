import { useFormik } from 'formik';
import AttributeField from './AttributeField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import React, { useState, useCallback, ChangeEvent } from 'react';
import { ApiActions, EntityForm, SubmittedEntity, AttributeForm } from 'Entity';

interface AttributeFieldsNames {
  fieldName: string;
  fieldRequired: string;
  fieldType: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onAddEntity: (entity: SubmittedEntity) => void;
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

function getDefaultAttributeFieldsValues(): AttributeForm {
  return {
    name: '',
    required: false,
    type: '',
  };
}

let fieldIndex = 0;

export default function EntityFormDialog(props: Props) {
  const { open, onClose, onAddEntity } = props;
  const [attributesNames, setAttributesNames] = useState<string[]>([]);
  const classes = useStyles();
  const { values, handleChange, handleSubmit, setFieldValue } = useFormik<EntityForm>({
    initialValues: {
      apiActions: getDefaultApiActions(),
      attributes: {},
      name: '',
    },
    onSubmit: submitValues => {
      const { apiActions, attributes: attributesForm, name } = submitValues;

      const attributes = Object.keys(attributesForm).reduce((acc, cur) => ({
        [attributesForm[cur].name]: {
          required: attributesForm[cur].required,
          type: attributesForm[cur].type,
        },
        ...acc,
      }), {});

      const entity = {
        apiActions,
        attributes,
        name,
      };

      onAddEntity(entity);
      onClose();
    },
  });
  const newAttributeFieldNames = useNames(fieldIndex);

  const handleAddNewAttribute = () => {
    const { attributes } = values;
    const { fieldName } = newAttributeFieldNames;
    fieldIndex++;
    const newAttributes = {
      ...attributes,
      [fieldName]: getDefaultAttributeFieldsValues(),
    };
    setAttributesNames(attributesNames.concat([fieldName]));
    setFieldValue('attributes', newAttributes);
  };

  const handleRemoveAttribute = (attrFieldName: string) => {
    const { attributes } = values;
    const newAttributeNames = attributesNames
      .filter((fieldName: string) => fieldName !== attrFieldName);
    const newAttributes = newAttributeNames
      .reduce((acc, curField) => ({ ...acc, [curField]: attributes[curField] }), {});

    setFieldValue('attributes', newAttributes);
    setAttributesNames(newAttributeNames);
  };

  const handleAttributeChange = (e: ChangeEvent<HTMLInputElement>, name: string, type: keyof AttributeForm) => {
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
            label="Nome da entidade"
          />
          {attributesNames.map((name: string) => (
            <AttributeField
              key={name}
              attributeFieldName={name}
              onRemove={handleRemoveAttribute}
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
