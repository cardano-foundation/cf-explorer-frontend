import axios, { AxiosError, AxiosInstance } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

import { defaultAxios, authAxios } from "../utils/axios";

interface FetchReturnType<T> {
  data: T | null;
  update: (data: T | null) => void;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  refresh: () => void;
  lastUpdated?: number;
  statusError?: number | undefined;
}

const useFetch = <T>(url: string, initial?: T, isAuth?: boolean, key?: number | string): FetchReturnType<T> => {
  const [data, setData] = useState<T | null>(initial || null);
  const [initialized, setInitialized] = useState<boolean>(!!initial || false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [statusError, setStatusError] = useState<number | undefined>(undefined);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const lastFetch = useRef<number>();
  const lastKey = useRef<number | string | undefined>(key);

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
        setStatusError(undefined);
        setInitialized(true);
      } catch (error) {
        setInitialized(true);
        setData(null);
        if (error instanceof AxiosError) {
          setError(error?.response?.data?.message || error?.message);
          setStatusError(error.response?.status);
        } else if (typeof error === "string") setError(error);
      }
      lastFetch.current = Date.now();
      if (needLoading) setLoading(false);
      else setRefreshLoading(false);
    },
    [url, isAuth]
  );

  useEffect(() => {
    // Refresh without "loading" every time the "key" is updated
    if (key && !loading && !refreshLoading) {
      const onFocus = async () => {
        if (lastKey.current !== key) {
          fetch();
          lastKey.current = key;
        }
      };

      window.addEventListener("focus", onFocus);

      if (!document.hidden) {
        fetch();
        lastKey.current = key;
      }

      return () => window.removeEventListener("focus", onFocus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    fetch(true);
  }, [fetch]);

  return {
    data,
    loading,
    error,
    initialized,
    refresh: fetch,
    lastUpdated: lastFetch.current,
    statusError,
    update: setData
  };
};

export default useFetch;
