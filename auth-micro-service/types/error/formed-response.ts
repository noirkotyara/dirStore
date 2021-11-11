export type FormedResponse<DataType> =
  | {
      responseCode: RESPONSE_CODES;
      data: { data: DataType; message: string };
    }
  | {
      responseCode: RESPONSE_CODES;
      message: string;
    };
