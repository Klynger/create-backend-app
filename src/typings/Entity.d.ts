declare module 'Entity' {
  export interface ProjectSpecification {
    projectName: string;
    generator: string;
    controllers: boolean;
    repositories: boolean;
    models: boolean;
    services: boolean;
    entities: EntityForm[];
  }

  export interface ApiActions {
    GET: boolean;
    PUT: boolean;
    POST: boolean;
    DELETE: boolean;
  }

  export interface EntityForm {
    name: string;
    apiActions: ApiActions;
    attributes: Record<string, Attribute>;
  }

  export interface Attribute {
    name: string;
    required: boolean;
    type: string;
  }
}