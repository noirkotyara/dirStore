import { ErrorCatcherInterface, ErrorDataType } from "../types/ErrorCatcher";

export class ErrorCatcher {
  responseCode: string;
  data: ErrorDataType;

  constructor(error: ErrorCatcherInterface) {
    this.responseCode = error.responseCode;
    this.data = error.data;
  }
}
