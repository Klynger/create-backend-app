import React, { useState } from 'react';
import { ProjectSpecification } from 'Entity';
import { useFormik } from 'formik';
import LayersFields from './LayersFields';
import { makeStyles, TextField, MenuItem, Theme } from '@material-ui/core';
import EntityFormDialog from './EntityFormDialog';

const useStyles = makeStyles((theme: Theme) => ({
  flexRow: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1),
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(1),
    width: '100%',
  },
  halfSizeField: {
    width: '40%',
  },
}));

export default function NormalFormFields() {
  const classes = useStyles();
  const [entityDialogOpen, setEntityDialogOpen] = useState(true);
  const { handleSubmit, handleChange, values } = useFormik<ProjectSpecification>({
    initialValues: {
      controllers: true,
      entities: [],
      generator: '',
      models: true,
      projectName: '',
      repositories: true,
      services: true,
    },
    onSubmit: submitValues => {
      console.log({ submitValues });
    },
  });

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.flexRow}>
          <TextField
            name="projectName"
            className={classes.halfSizeField}
            label="Nome do Projeto"
            onChange={handleChange}
            value={values.projectName}
          />
          <TextField
            select
            onChange={handleChange}
            value={values.generator}
            className={classes.halfSizeField}
            name="generator"
            label="Gerador"
          >
            <MenuItem value="nest-rest-generator">nest-rest-generator</MenuItem>
          </TextField>
        </div>
        <LayersFields
          models={values.models}
          onChange={handleChange}
          services={values.services}
          controllers={values.controllers}
          repositories={values.repositories}
        />
      </form>
      <EntityFormDialog open={entityDialogOpen} onClose={() => setEntityDialogOpen(false)} />
    </>
  );
}
