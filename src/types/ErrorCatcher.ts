export interface ErrorCatcherInterface {
  responseCode: string;
  data: ErrorDataType;
}

export type ErrorDataType = string | { data: any; message: string };
