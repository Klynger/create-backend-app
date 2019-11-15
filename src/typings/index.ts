export enum GeneratorStatus {
  NORMAL = 'NORMAL',
  BUSY = 'BUSY',
}

export interface CodeGenerator {
  appName: string;
  port: number;
  status: GeneratorStatus;
}
