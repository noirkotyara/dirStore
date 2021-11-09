import { FormedResponse } from "../types/error/formed-response";

export const responseCatcher = <DataType>(
  formedResponse: FormedResponse<DataType>
): FormedResponse<DataType> => {
  return formedResponse;
};
