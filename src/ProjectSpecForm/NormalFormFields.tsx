import React from 'react';
import Entities from './Entities';
import { useFormik } from 'formik';
import axios from '../utils/client';
import LayersFields from './LayersFields';
import { CodeGenerator, GeneratorStatus } from '../typings';
import { makeStyles, TextField, MenuItem, Theme, Button } from '@material-ui/core';
import {
  Entity,
  ApiConfig,
  ModuleType,
  SubmittedEntity,
  ProjectSpecification,
  ProjectSpecificationJson,
} from 'Entity';

interface Props {
  generators: CodeGenerator[];
}

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

function resolveAppModule(modules: boolean, modulesList: ModuleType[], entities: Record<string, Entity>) {
  if (modules) {
    if (!modulesList.some((mod => mod.entityName.toLowerCase() === 'app'))) {
      modulesList = modulesList.concat([{
        entityName: 'App',
        modules: Object.keys(entities),
      }]);
    }
    return modules && modulesList.length > 0 ? modulesList : modules;
  }
}

export default function NormalFormFields(props: Props) {
  const { generators } = props;
  const classes = useStyles();
  const {
    handleSubmit,
    handleChange,
    values,
    setFieldValue,
  } = useFormik<ProjectSpecification>({
    initialValues: {
      controllers: true,
      entities: [],
      generator: '',
      models: true,
      modules: true,
      modulesList: [],
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
        modules: resolveAppModule(modules, modulesList, entities),
        repositories,
        services,
      };

      const specification: ProjectSpecificationJson = {
        apiConfig,
        entities,
        generator,
        projectName,
      };

      axios.post('project', specification).then(res => {
        const { mimeType, data } = res.data;
        const file = `data:${mimeType};base64,${data}`;
        const anchorEl = document.createElement('a');
        anchorEl.setAttribute('download', projectName);
        anchorEl.setAttribute('href', file);
        anchorEl.click();
      });
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

  const generatorHelperText =
    values.generator === 'nest-rest-generator' ?
      'Projetos em NestJS precisam que seus módulos sejam importados em um módulo central App, você deveria criar esse módulo'
      : '';

  const projectNameHelperText =
    Boolean(values.projectName) ?
    'Nome do projeto e os nomes das entidades devem estar em PascalCase' : '';

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.flexRow}>
        <TextField
          name="projectName"
          className={classes.halfSizeField}
          label="Nome do Projeto"
          onChange={handleChange}
          value={values.projectName}
          helperText={projectNameHelperText}
        />
        <TextField
          select
          onChange={handleChange}
          value={values.generator}
          className={classes.halfSizeField}
          name="generator"
          label="Gerador"
          helperText={generatorHelperText}
        >
          {generators.map(({ appName, status }) => (
            <MenuItem
              key={appName}
              value={appName}
              disabled={status !== GeneratorStatus.NORMAL}
            >
              {appName}
            </MenuItem>
          ))}
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
