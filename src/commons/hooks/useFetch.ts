import axios, { AxiosError, AxiosInstance } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

import { defaultAxios, authAxios } from "../utils/axios";

interface FetchReturnType<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  refresh: () => void;
  lastUpdated?: number;
}

const useFetch = <T>(url: string, initial?: T, isAuth?: boolean, key?: number): FetchReturnType<T> => {
  const [data, setData] = useState<T | null>(initial || null);
  const [initialized, setInitialized] = useState<boolean>(!!initial || false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const lastFetch = useRef<number>();

  const fetch = useCallback(
    async (needLoading?: boolean) => {
      if (!url) return;
      let service: AxiosInstance = isAuth ? authAxios : defaultAxios;
      if (url.search("http://") === 0 || url.search("https://") === 0) {
        service = axios;
      }
      if (needLoading) setLoading(true);
      else setRefreshLoading(true);
      try {
        const res = await service.get(url);
        setData(res?.data as T);
        setError(null);
        setInitialized(true);
      } catch (error) {
        setInitialized(true);
        setData(null);
        if (error instanceof AxiosError) setError(error?.response?.data?.message || error?.message);
        else if (typeof error === "string") setError(error);
      }
      lastFetch.current = Date.now();
      if (needLoading) setLoading(false);
      else setRefreshLoading(false);
    },
    [url, isAuth]
  );

  useEffect(() => {
    // Refresh without "loading" every time the "key" is updated
    if (initialized && !loading && !refreshLoading) fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    fetch(true);
  }, [fetch]);

  return { data, loading, error, initialized, refresh: fetch, lastUpdated: lastFetch.current };
};

export default useFetch;
