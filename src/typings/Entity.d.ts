declare module 'Entity' {
  export interface ProjectSpecification {
    projectName: string;
    generator: string;
    controllers: boolean;
    repositories: boolean;
    modules: boolean;
    modulesList: ModuleType[];
    models: boolean;
    services: boolean;
    entities: SubmittedEntity[];
  }

  export interface ProjectSpecificationJson {
    projectName: string;
    apiConfig: ApiConfig;
    generator: string;
    entities: Record<string, Entity>;
  }

  export interface ApiConfig {
    models?: boolean;
    services?: boolean;
    controllers?: boolean;
    repositories?: boolean;
    modules?: boolean | ModuleType[];
  }

  export interface SubmittedEntity extends Entity {
    name: string;
  }

  export interface Entity {
    apiActions: ApiActions;
    attributes: Record<string, Attribute>
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
    attributes: Record<string, AttributeForm>;
  }

  export interface AttributeForm {
    name: string;
    required: boolean;
    type: string;
  }

  export interface Attribute {
    required: boolean;
    type: string;
  }

  export interface ModuleType {
    entityName: string;
    modules: string[];
  }
}
