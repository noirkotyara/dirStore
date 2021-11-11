export type AxiosError<DataType> = {
  isAxiosError: boolean;
  response: {
    data: {
      timestamp: number;
      errorCode: string | null;
      status: number;
      message: string;
      data: DataType
    }
  }
}

// error type check
export const isAxiosError = <DataType>(error: unknown | AxiosError<DataType>): error is AxiosError<DataType> => {
  return (error as AxiosError<DataType>).isAxiosError;
};