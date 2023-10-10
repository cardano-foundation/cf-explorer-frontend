interface AxiosCommonError {
  response?: {
    data?: {
      errorCode: number | string;
    };
  };
}
