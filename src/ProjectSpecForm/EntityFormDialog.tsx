import { useFormik } from 'formik';
import AttributeField from './AttributeField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles, Theme, FormHelperText } from '@material-ui/core';
import React, { useState, useCallback, useEffect, ChangeEvent } from 'react';
import { ApiActions, EntityForm, SubmittedEntity, AttributeForm } from 'Entity';

interface AttributeFieldsNames {
  fieldName: string;
  fieldRequired: string;
  fieldType: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  selectedEntityIndex: number;
  selectedEntity?: SubmittedEntity;
  onAddEntity: (entity: SubmittedEntity) => void;
  onEditEntity: (entity: SubmittedEntity, index: number) => void;
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
  attributeFieldWrapper: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
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
  helperText: {
    maxWidth: '21.875rem',
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

function fromSubmittedToEntityForm(entity: SubmittedEntity): EntityForm {
  const { apiActions, name, attributes: attrObj } = entity;

  const attributes = Object.keys(attrObj)
    .map(attrName => ({
      name: attrName,
      required: attrObj[attrName].required,
      type: attrObj[attrName].type,
    }))
    .reduce((acc, cur) => ({ ...acc, [`fieldName${fieldIndex++}`]: cur }), {});

  return {
    apiActions,
    attributes,
    name,
  };
}

const EMPTY_ENTITY = {
  apiActions: getDefaultApiActions(),
  attributes: {},
  name: '',
};

export default function EntityFormDialog(props: Props) {
  const {
    open,
    onClose,
    onAddEntity,
    onEditEntity,
    selectedEntity,
    selectedEntityIndex,
  } = props;
  const isEditing = selectedEntityIndex !== -1;
  const [attributesNames, setAttributesNames] = useState<string[]>([]);
  const classes = useStyles();
  const {
    values,
    resetForm,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik<EntityForm>({
    initialValues: selectedEntity ? fromSubmittedToEntityForm(selectedEntity) : EMPTY_ENTITY,
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

      if (!isEditing) {
        onAddEntity(entity);
      } else {
        onEditEntity(entity, selectedEntityIndex);
      }

      onClose();
    },
  });
  const newAttributeFieldNames = useNames(fieldIndex);

  useEffect(() => {
    if (selectedEntity) {
      const entity = fromSubmittedToEntityForm(selectedEntity);
      resetForm({
        values: entity,
      });
      setAttributesNames(Object.keys(entity.attributes));
    } else {
      resetForm({ values: EMPTY_ENTITY });
      setAttributesNames(Object.keys(EMPTY_ENTITY.attributes));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

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

  const helperText = Boolean(values.name) ?
    'Nomes de entidades devem estar em PascalCase e nomes de atributos em camelCase'
    : '';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="entity-form-dialog-title"
    >
      <DialogTitle id="entity-form-dialog-title">
        {isEditing ? 'Editar Entidade' : 'Nova Entidade'}
      </DialogTitle>
      <form className={classes.form} onSubmit={handleSubmit}>
        <DialogContent className={classes.dialogContent} dividers>
          <TextField
            name="name"
            value={values.name}
            className={classes.row}
            onChange={handleChange}
            helperText={helperText}
            label="Nome da entidade"
            FormHelperTextProps={{
              className: classes.helperText,
            }}
          />
          {attributesNames.map((name: string, i: number) => {
            const helperTextAttr = i === 0 && Boolean(values.attributes[name].name) ?
              'Lembre-se que você deve delcarar um atributo id para toda entidade'
              : '';

            return (
              <div className={classes.attributeFieldWrapper} key={name}>
                <AttributeField
                  attributeFieldName={name}
                  onRemove={handleRemoveAttribute}
                  onChange={handleAttributeChange}
                  values={values.attributes[name]}
                />
                {Boolean(helperTextAttr) && (
                  <FormHelperText className={classes.helperText}>
                    {helperTextAttr}
                  </FormHelperText>
                )}
              </div>
            );
          })}
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
            {isEditing ? 'Salvar' : 'Adicionar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
