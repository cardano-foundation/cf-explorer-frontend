import { AxiosError, AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import defaultAxios, { authAxios } from "../utils/axios";

type TMethod = "get" | "put" | "post" | "delete";

type TMutation<T> = {
  isAuth?: boolean;
  url: string;
  method?: TMethod;
  data?: T;
};

const useMutation = <T>({ isAuth, url, method = "post", ...rest }: TMutation<T>, cb?: () => void) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [respData, setRespData] = useState<T>();
  const [error, setError] = useState<unknown>();

  const service: AxiosInstance = isAuth ? authAxios : defaultAxios;

  useEffect(() => {
    setError(null);
  }, [rest.data]);

  const reset = () => {
    setLoading(false);
    setRespData(undefined);
    setError(null);
  };

  const mutate = async (data?: T) => {
    setError(null);
    try {
      setLoading(true);
      const res = await service.request({ url, method, data: data ? data : rest.data });
      setRespData(data);
      cb?.();
      const resp = res.data;
      return resp;
    } catch (error) {
      if (error instanceof AxiosError && error.response && "errorMessage" in error.response.data) {
        setError(error.response.data.errorMessage);
      } else {
        setError(t("common.unknownServerError"));
      }
    } finally {
      setLoading(false);
    }
  };
  return { error, mutate, loading, data: respData, reset };
};

export default useMutation;
