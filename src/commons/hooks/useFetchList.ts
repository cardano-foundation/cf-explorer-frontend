import { useCallback, useEffect, useRef, useState } from "react";
import axios, { AxiosError, AxiosInstance } from "axios";
import qs from "qs";

import { authAxios, defaultAxios } from "../utils/axios";
import { cleanObject } from "../utils/helper";

interface Params {
  page?: number;
  size?: number;
  [key: string]: string | number | Date | string[] | boolean | undefined;
}

export interface FetchReturnType<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
  total: number;
  totalPage: number;
  currentPage: number;
  isDataOverSize?: boolean | null;
  refresh: () => void;
  update: (callback: (data: T[]) => T[]) => void;
  lastUpdated?: number;
  query: Params;
}

const useFetchList = <T>(
  url: string,
  params: Params = {},
  isAuth?: boolean,
  key?: number | string
): FetchReturnType<T> => {
  const [data, setData] = useState<T[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(params.page ?? 0);
  const [totalPage, setTotalPage] = useState(0);
  const [isDataOverSize, setIsDataOverSize] = useState<boolean | null>(null);
  const [total, setTotal] = useState(0);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [query, setQuery] = useState<Params>(cleanObject(params));
  const lastFetch = useRef<number>();
  const lastKey = useRef<number | string | undefined>(key);

  const getList = useCallback(
    async (needLoading?: boolean) => {
      if (!url) {
        setData([]);
        setInitialized(false);
        setLoading(false);
        setError(null);
        setCurrentPage(0);
        setTotalPage(0);
        setTotal(0);
        setRefreshLoading(false);
        return;
      }
      let service: AxiosInstance = isAuth ? authAxios : defaultAxios;
      if (url.search("http://") === 0 || url.search("https://") === 0) {
        service = axios;
      }
      if (needLoading) setLoading(true);
      else setRefreshLoading(true);
      try {
        const baseURL = url.split("?")[0];
        const lastURL = url.split("?")[1];
        const res = await service.get(
          `${baseURL}?${lastURL ? `${lastURL}&` : ""}${qs.stringify(
            params,
            params.formatArrayComma ? { arrayFormat: "comma", encode: false } : {}
          )}`
        );
        setQuery(cleanObject(params));
        setData(res?.data?.data as T[]);
        setError(null);
        setIsDataOverSize(res?.data?.isDataOverSize ?? null);
        setCurrentPage(res.data.currentPage);
        setTotalPage(res.data.totalPages);
        setTotal(res.data.totalItems);
        setInitialized(true);
      } catch (error) {
        setData([]);
        setTotal(0);
        setInitialized(true);
        if (error instanceof AxiosError) setError(error?.response?.data?.message || error?.message);
        else if (typeof error === "string") setError(error);
      }
      lastFetch.current = Date.now();
      if (needLoading) setLoading(false);
      else setRefreshLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url, isAuth, JSON.stringify(params || {})]
  );

  useEffect(() => {
    // Refresh without "loading" every time the "key" is updated
    if (key && !loading && !refreshLoading) {
      const onFocus = async () => {
        if (lastKey.current !== key) {
          getList();
          lastKey.current = key;
        }
      };

      window.addEventListener("focus", onFocus);

      if (!document.hidden) {
        getList();
        lastKey.current = key;
      }

      return () => window.removeEventListener("focus", onFocus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    getList(true);
  }, [getList]);

  return {
    data,
    loading,
    error,
    initialized,
    total,
    totalPage,
    currentPage,
    refresh: getList,
    update: setData,
    lastUpdated: lastFetch.current,
    query,
    isDataOverSize
  };
};

export default useFetchList;
