export type AxiosResponse<DataType> = {
  data: {
    timestamp: number;
    errorCode: string | null;
    status: number;
    message: string;
    data: DataType
  }
}
