// @ts-ignore
import { RESPONSE_CODES } from "message-catcher";

import { ErrorDataType } from "../types/ErrorCatcher";

export class ErrorMessageCatcher {
  responseCode: string;
  data: ErrorDataType;

  constructor(errorMessage: string) {
    this.responseCode = RESPONSE_CODES.S_ERROR_INTERNAL;
    this.data = errorMessage;
  }
}
