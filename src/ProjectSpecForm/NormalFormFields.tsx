import React from 'react';
import Entities from './Entities';
import { useFormik } from 'formik';
import LayersFields from './LayersFields';
import { ENTITIES, MODULES_LIST } from './__mocks__';
import { ProjectSpecification, SubmittedEntity, ModuleType, ProjectSpecificationJson, Entity, ApiConfig } from 'Entity';
import { makeStyles, TextField, MenuItem, Theme, Button } from '@material-ui/core';

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
  const { handleSubmit, handleChange, values, setFieldValue } = useFormik<ProjectSpecification>({
    initialValues: {
      controllers: true,
      entities: ENTITIES,
      generator: '',
      models: true,
      modules: true,
      modulesList: MODULES_LIST,
      projectName: '',
      repositories: true,
      services: true,
    },
    onSubmit: submitValues => {
      const {
        projectName,
        generator,
        entities: submittedEntities,
        controllers,
        models,
        modules,
        modulesList,
        repositories,
        services,
      } = submitValues;
      const entities: Record<string, Entity> = submittedEntities.reduce((acc, { name, ...rest }) => ({
        ...acc,
        [name]: {
          ...rest,
        },
      }), {});

      const apiConfig: ApiConfig = {
        controllers,
        models,
        modules: modules && modulesList.length > 0 ? modulesList : modules,
        repositories,
        services,
      };

      const result: ProjectSpecificationJson = {
        apiConfig,
        entities,
        generator,
        projectName,
      };

      console.log(result);
    },
  });

  const handleAddEntity = (entity: SubmittedEntity) => {
    const { entities } = values;
    setFieldValue('entities', entities.concat([entity]));
  };

  const handleEditEntity = (entity: SubmittedEntity, index: number) => {
    const { entities } = values;
    const newEntities = entities.map(
      (ent: SubmittedEntity, i: number) => i === index ? entity : ent,
    );

    setFieldValue('entities', newEntities);
  };

  const handleRemoveEntity = (entityName: string) => {
    const { entities } = values;
    setFieldValue('entities', entities.filter((entity: SubmittedEntity) => entity.name !== entityName));
  };

  const handleAddModule = (mod: ModuleType) => {
    const { modulesList } = values;
    setFieldValue('modulesList', modulesList.concat([mod]));
  };

  const handleChangeModule = (newModule: ModuleType, index: number) => {
    const { modulesList } = values;
    const newModulesList = modulesList.map(
      (mod: ModuleType, i: number) => i === index ? newModule : mod);

    setFieldValue('modulesList', newModulesList);

  };

  const handleRemoveModule = (entityName: string) => {
    const { modulesList } = values;
    setFieldValue('modulesList', modulesList.filter((mod: ModuleType) => mod.entityName !== entityName));
  };

  return (
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
        modules={values.modules}
        services={values.services}
        onAddModule={handleAddModule}
        controllers={values.controllers}
        modulesList={values.modulesList}
        repositories={values.repositories}
        onChangeModule={handleChangeModule}
        onRemoveModule={handleRemoveModule}
      />
      <Entities
        entities={values.entities}
        onAddEntity={handleAddEntity}
        onEditEntity={handleEditEntity}
        onRemoveEntity={handleRemoveEntity}
      />
      <Button
        color="primary"
        variant="contained"
        onClick={e => handleSubmit(e as any)}
      >
        Gerar Projeto
      </Button>
    </form>
  );
}
