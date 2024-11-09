export interface ApiReturnType<T> {
  data: T | null;
  error: string | null;
  total?: number;
  totalPage?: number;
  currentPage?: number;
  lastUpdated?: number;
}
