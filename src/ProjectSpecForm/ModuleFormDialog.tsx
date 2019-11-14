import React from 'react';
import { useFormik } from 'formik';
import { ModuleType } from 'Entity';
import {
  Theme,
  Button,
  Dialog,
  TextField,
  IconButton,
  makeStyles,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme: Theme) => ({
  closeButton: {
    bottom: -theme.spacing(2),
    marginLeft: theme.spacing(2),
    position: 'relative',
  },
  dialogContent: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    minWidth:  300,
    padding: theme.spacing(2),
  },
  entityNameTextField: {
    paddingBottom: theme.spacing(2),
    width: '100%',
  },
  form: {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  modRoot: {
    display: 'flex',
    paddingBottom: theme.spacing(2),
    width: '100%',
  },
  textFieldMod: {
    flexGrow: 1,
  },
}));

interface Props {
  open?: boolean;
  onClose: () => void;
  onAddModule: (mod: ModuleType) => void;
}

export default function ModuleFormDialog(props: Props) {
  const { open = true, onClose, onAddModule } = props;
  const classes = useStyles();

  const {
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik<ModuleType>({
    initialValues: {
      entityName: 'App',
      modules: ['User', 'Products'],
    },
    onSubmit: (mod: ModuleType) => {
      onAddModule(mod);
      onClose();
    },
  });

  const handleAddNewImportValue = () => {
    setFieldValue('modules', values.modules.concat(['']));
  };

  const handleChangeImportValue = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newModules = values.modules.map((mod: string, i: number) =>
    i === index ? e.target.value : mod);
    setFieldValue('modules', newModules);
  };

  const handleRemoveImportValue = (index: number) => {
    setFieldValue('modules', values.modules.filter((_: string, i: number) => i !== index));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="module-form-dialog-title"
    >
      <DialogTitle id="module-form-dialog-title">
        Novo Módulo
      </DialogTitle>
      <form className={classes.form} onSubmit={handleSubmit}>
        <DialogContent className={classes.dialogContent}>
          <TextField
            name="entityName"
            label="Nome do módulo"
            onChange={handleChange}
            value={values.entityName}
            className={classes.entityNameTextField}
          />
          {values.modules.map((mod: string, i: number) => (
            <div key={i} className={classes.modRoot}>
              <TextField
                value={mod}
                className={classes.textFieldMod}
                label="Nome do módulo importado"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeImportValue(e, i)}
              />
              <IconButton
                color="secondary"
                onClick={() => handleRemoveImportValue(i)}
                className={classes.closeButton}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          ))}
          <Button color="secondary" onClick={handleAddNewImportValue}>
            Novo Import
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Cancelar</Button>
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
