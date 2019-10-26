import React from 'react';
import JsonForm from './JsonForm';
import NormalFormFields from './NormalFormFields';

interface Props {
  showNormalForm: boolean;
}

export default function FormContentSwitcher({ showNormalForm }: Props) {
  return showNormalForm ? (
    <NormalFormFields />
  ) : (
      <JsonForm />
    );
}
