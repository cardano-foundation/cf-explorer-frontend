import axios, { AxiosInstance } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { defaultAxios, authAxios } from "../utils/axios";

interface FetchReturnType<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  refresh: () => void;
  lastUpdated: number;
}

const useFetch = <T>(url: string, initial?: T, isAuth?: boolean, timeout?: number): FetchReturnType<T> => {
  const [data, setData] = useState<T | null>(initial || null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const lastFetch = useRef<number>(Date.now());

  const fetch = useCallback(
    async (needLoading?: boolean) => {
      if (!url) return;
      let service: AxiosInstance = isAuth ? authAxios : defaultAxios;
      if (url.search("http://") === 0 || url.search("https://") === 0) {
        service = axios;
      }
      needLoading && setLoading(true);
      try {
        const res = await service.get(url);
        setData(res.data as T);
        setError(null);
        setInitialized(true);
      } catch (error: any) {
        setData(null);
        setError(error?.response?.data?.message || error?.message);
      }
      needLoading && setLoading(false);
    },
    [url, isAuth]
  );

  useEffect(() => {
    if (timeout) {
      const interval = setInterval(async () => {
        if (!document.hidden) {
          await fetch();
          lastFetch.current = Date.now();
        }
      }, timeout * 1000);

      const onFocus = async () => {
        if (lastFetch.current + timeout * 1000 <= Date.now()) {
          await fetch();
          lastFetch.current = Date.now();
        }
      };

      window.addEventListener("focus", onFocus);

      return () => {
        clearInterval(interval);
        window.removeEventListener("focus", onFocus);
      };
    }
  }, [fetch, timeout]);

  useEffect(() => {
    fetch(true);
  }, [fetch]);

  return { data, loading, error, initialized, refresh: fetch, lastUpdated: lastFetch.current };
};

export default useFetch;
