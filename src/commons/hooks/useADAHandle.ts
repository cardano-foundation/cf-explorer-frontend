import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

import { API } from "../utils/api";
import { API_ADA_HANDLE_API } from "../utils/constants";

const useADAHandle = (name: string) => {
  const [data, setData] = useState<{ stakeAddress: string; paymentAddress: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError | null>(null);

  const mution = () => {
    setLoading(true);
    axios
      .get(API_ADA_HANDLE_API + API.ADAHandle(name))
      .then((res) => {
        setData(() => res.data);
        setError(null);
      })
      .catch((error: AxiosError) => {
        setError(error);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
        setInitialized(true);
      });
  };
  useEffect(() => {
    mution();
  }, [name]);
  return [{ data, loading, error, initialized }];
};

export default useADAHandle;
