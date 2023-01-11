import axios, { AxiosInstance } from "axios";
import qs from "qs";
import { useCallback, useEffect, useState } from "react";
import authAxios, { defaultAxios } from "../utils/axios";

interface Params {
  page?: number;
  size?: number;
  [key: string]: string | number | undefined;
}

interface FetchReturnType<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
  total: number;
  totalPage: number;
  currentPage: number;
  refesh: () => void;
}

const useFetchList = <T>(url: string, params: Params = {}, isAuth?: boolean): FetchReturnType<T> => {
  const [data, setData] = useState<T[]>([]);
  const [initialized, setInitialized] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(params.page ?? 0);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);

  const getList = useCallback(async () => {
    if (!url) return;
    let service: AxiosInstance = defaultAxios;
    // let service: AxiosInstance = isAuth ? defaultAxios : authAxios;
    if (url.search("http://") === 0 || url.search("https://") === 0) {
      service = axios;
    }
    setLoading(true);
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
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, ...Object.values(params || {})]);

  useEffect(() => {
    getList();
  }, [getList]);

  return {
    data,
    loading,
    error,
    initialized,
    total,
    totalPage,
    currentPage,
    refesh: getList,
  };
};

export default useFetchList;
