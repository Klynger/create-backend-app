import { SubmittedEntity, ModuleType } from 'Entity';

export const MODULES_LIST: ModuleType[] = [
  {
    entityName: 'App',
    modules: ['User', 'Post'],
  },
];

export const ENTITIES: SubmittedEntity[] = [
  {
    apiActions: {
      DELETE: true,
      GET: true,
      POST: true,
      PUT: true,
    },
    attributes: {
      id: {
        required: true,
        type: 'string',
      },
      name: {
        required: true,
        type: 'string',
      },
    },
    name: 'User',
  },
  {
    apiActions: {
      DELETE: true,
      GET: true,
      POST: true,
      PUT: true,
    },
    attributes: {
      content: {
        required: true,
        type: 'string',
      },
      id: {
        required: true,
        type: 'string',
      },
      title: {
        required: true,
        type: 'string',
      },
    },
    name: 'Post',
  },
];
