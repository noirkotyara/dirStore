import { RESPONSE_CODES } from "message-catcher";

import { FormedError } from "../types/error/formed-error";

export const errorCatcher = (formedError: FormedError): FormedError => {
  const responseCode =
    formedError.responseCode ? formedError.responseCode : RESPONSE_CODES.S_ERROR_INTERNAL;
  throw { responseCode, ...formedError };
};
