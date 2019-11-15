import { identity } from 'ramda';
import JsonForm from './JsonForm';
import axios from '../utils/client';
import { AxiosResponse } from 'axios';
import NormalFormFields from './NormalFormFields';
import React, { useEffect, useState } from 'react';
import { CodeGenerator } from '../typings';

interface Props {
  showNormalForm: boolean;
}

export default function FormContentSwitcher({ showNormalForm }: Props) {
  const [generators, setGenerators] = useState<CodeGenerator[]>([]);

  useEffect(() => {
    axios.get('generator').then((res: AxiosResponse<CodeGenerator>) => {
      if (Array.isArray(res.data)) {
        setGenerators(res.data.filter(identity));
      }
    });
  }, []);

  return showNormalForm ? (
    <NormalFormFields generators={generators} />
  ) : (
      <JsonForm />
    );
}
