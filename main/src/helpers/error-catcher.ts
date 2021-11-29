import { RESPONSE_CODES } from "message-catcher";
import { FormedError } from "@types-internal/error/formed-error";

export const errorCatcher = (formedError: FormedError) => {
  try {
    const responseCode =
      formedError.responseCode ?? RESPONSE_CODES.S_ERROR_INTERNAL;
    throw { responseCode, ...formedError };
  } catch (e) {
    console.log(e);
  }
};
