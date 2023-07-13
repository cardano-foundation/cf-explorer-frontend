import { useCallback, useEffect, useRef, useState } from "react";
import axios, { AxiosError, AxiosInstance } from "axios";
import qs from "qs";

import { authAxios, defaultAxios } from "../utils/axios";

interface Params {
  page?: number;
  size?: number;
  [key: string]: string | number | Date | string[] | undefined;
}

export interface FetchReturnType<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
  total: number;
  totalPage: number;
  currentPage: number;
  refresh: () => void;
  update: (callback: (data: T[]) => T[]) => void;
  lastUpdated: number;
  setLoading: (value: boolean) => void;
}

const useFetchList = <T>(url: string, params: Params = {}, isAuth?: boolean, timeout?: number): FetchReturnType<T> => {
  const [data, setData] = useState<T[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(params.page ?? 0);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const lastFetch = useRef<number>(Date.now());

  const getList = useCallback(
    async (needLoading?: boolean) => {
      if (!url) return;
      let service: AxiosInstance = isAuth ? authAxios : defaultAxios;
      if (url.search("http://") === 0 || url.search("https://") === 0) {
        service = axios;
      }
      if (needLoading) setLoading(true);
      else setRefreshLoading(true);
      try {
        const baseURL = url.split("?")[0];
        const lastURL = url.split("?")[1];
        const res = await service.get(`${baseURL}?${lastURL ? `${lastURL}&` : ""}${qs.stringify(params)}`);
        setData((res?.data?.data || []) as T[]);
        setError(null);
        setCurrentPage(res.data.currentPage);
        setTotalPage(res.data.totalPages);
        setTotal(res.data.totalItems);
        setInitialized(true);
      } catch (error) {
        setData([]);
        setInitialized(true);
        if (error instanceof AxiosError) setError(error?.response?.data?.message || error?.message);
        else if (typeof error === "string") setError(error);
      }
      lastFetch.current = Date.now();
      if (needLoading) setLoading(false);
      else setRefreshLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url, isAuth, ...Object.values(params || {})]
  );

  useEffect(() => {
    if (timeout && !loading && !refreshLoading) {
      const onFocus = async () => {
        if (lastFetch.current + timeout * 1000 <= Date.now()) getList();
      };

      window.addEventListener("focus", onFocus);

      const timeoutId = setTimeout(() => {
        if (!document.hidden) getList();
      }, timeout * 1000);

      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("focus", onFocus);
      };
    }
  }, [getList, timeout, loading, refreshLoading]);

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
    setLoading
  };
};

export default useFetchList;
