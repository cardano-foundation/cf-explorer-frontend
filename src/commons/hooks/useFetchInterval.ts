/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

import { defaultAxios } from "../utils/axios";

interface FetchReturnType<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  refresh: () => void;
  lastUpdated?: number;
}

const useFetchInterval = <T>(
  url: string,
  urlAlt?: string,
  intervalTime = 120000
  // 2 minutes
): FetchReturnType<T> => {
  const [data, setData] = useState<T | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const lastFetch = useRef<number>();
  const intervalRef = useRef<any>();

  const fetch = useCallback(
    async (needLoading?: boolean, abortSignal?: AbortController) => {
      if (!url) return;
      if (needLoading) setLoading(true);
      try {
        const res = await defaultAxios.get(url, {
          signal: abortSignal?.signal
        });
        setData(res?.data as T);
        setError(null);
        setInitialized(true);
      } catch (error) {
        if (urlAlt) {
          defaultAxios
            .get(urlAlt, {
              signal: abortSignal?.signal
            })
            .then((res) => {
              setData(res?.data as T);
            })
            .catch(() => {
              setData(null);
            });
        }

        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setInitialized(true);
        // setData(null);
        if (error instanceof AxiosError) setError(error?.response?.data?.message || error?.message);
        else if (typeof error === "string") setError(error);
      }
      lastFetch.current = Date.now();
      if (needLoading) setLoading(false);
    },
    [url]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetch(true, controller);

    return () => {
      controller.abort();
    };
  }, [fetch]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      fetch();
    }, intervalTime);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [fetch, intervalTime]);

  return { data, loading, error, initialized, refresh: fetch, lastUpdated: lastFetch.current };
};

export default useFetchInterval;
