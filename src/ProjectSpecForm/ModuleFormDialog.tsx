import React from 'react';
import { Dialog } from '@material-ui/core';

interface Props {
  open?: boolean;
  onClose: () => void;
}

export function ModuleFormDialog(props: Props) {
  const { open = false } = props;

  return (
    <Dialog open={open}>

    </Dialog>
  );
}
