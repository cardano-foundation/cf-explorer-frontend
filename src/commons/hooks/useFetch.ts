import axios, { AxiosInstance } from "axios";
import { useCallback, useEffect, useState } from "react";
import { defaultAxios, authAxios } from "../utils/axios";

interface FetchReturnType<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  refesh: () => void;
}

const useFetch = <T>(url: string, initial?: T, isAuth?: boolean): FetchReturnType<T> => {
  const [data, setData] = useState<T | null>(initial || null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!url) return;
    let service: AxiosInstance = isAuth ? authAxios : defaultAxios;
    if (url.search("http://") === 0 || url.search("https://") === 0) {
      service = axios;
    }
    setLoading(true);
    try {
      const res = await service.get(url);
      setData(res.data as T);
      setError(null);
      setInitialized(true);
    } catch (error: any) {
      setData(null);
      setError(error?.response?.data?.message || error?.message);
    }
    setLoading(false);
  }, [url, isAuth]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, initialized, refesh: fetch };
};

export default useFetch;
