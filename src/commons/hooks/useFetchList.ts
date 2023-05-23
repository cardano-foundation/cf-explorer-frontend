import axios, { AxiosInstance } from "axios";
import qs from "qs";
import { useCallback, useEffect, useRef, useState } from "react";
import { authAxios, defaultAxios } from "../utils/axios";

interface Params {
  page?: number;
  size?: number;
  [key: string]: string | number | Date | string[] | undefined;
}

interface FetchReturnType<T> {
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
}

const useFetchList = <T>(url: string, params: Params = {}, isAuth?: boolean, timeout?: number): FetchReturnType<T> => {
  const [data, setData] = useState<T[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(params.page ?? 0);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const lastFetch = useRef<number>(Date.now());

  const getList = useCallback(
    async (needLoading?: boolean) => {
      if (!url) return;
      let service: AxiosInstance = isAuth ? authAxios : defaultAxios;
      if (url.search("http://") === 0 || url.search("https://") === 0) {
        service = axios;
      }
      needLoading && setLoading(true);
      try {
        const baseURL = url.split("?")[0];
        const lastURL = url.split("?")[1];
        const res = await service.get(`${baseURL}?${lastURL ? `${lastURL}&` : ""}${qs.stringify(params)}`);
        setData(res.data.data as T[]);
        setError(null);
        setCurrentPage(res.data.currentPage);
        setTotalPage(res.data.totalPages);
        setTotal(res.data.totalItems);
        setInitialized(true);
      } catch (error: any) {
        setData([]);
        setError(error?.response?.data?.message || error?.message);
      }
      needLoading && setLoading(false);

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [url, ...Object.values(params || {})]
  );

  useEffect(() => {
    if (timeout) {
      const interval = setInterval(async () => {
        if (!document.hidden) {
          await getList();
          lastFetch.current = Date.now();
        }
      }, timeout * 1000);

      const onFocus = async () => {
        if (lastFetch.current + timeout * 1000 <= Date.now()) {
          await getList();
          lastFetch.current = Date.now();
        }
      };

      window.addEventListener("focus", onFocus);

      return () => {
        clearInterval(interval);
        window.removeEventListener("focus", onFocus);
      };
    }
  }, [getList, timeout]);

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
  };
};

export default useFetchList;
