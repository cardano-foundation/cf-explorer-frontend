import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import useFetch from "./useFetch";

interface FetchReturnType<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  refresh: () => void;
  lastUpdated?: number;
}

describe("useFetch", () => {
  let mockAxios: MockAdapter;
  const mockApi = "https://myapi.com";

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it("should return initial state", () => {
    const { result } = renderHook(() => useFetch(mockApi, null));

    const expected: FetchReturnType<null> = {
      data: null,
      error: null,
      initialized: false,
      loading: true,
      refresh: expect.any(Function),
      lastUpdated: undefined
    };

    expect(result.current).toEqual(expected);
  });

  it("should fetch data successfully", async () => {
    const data = { id: 1, name: "Adam" };
    mockAxios.onGet(mockApi).reply(200, data);

    const { result } = renderHook(() => useFetch(mockApi, null));

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
      expect(result.current.data).toBe(null);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(data);
      expect(result.current.lastUpdated).not.toBe(undefined);
    });
  });

  it("should handle errors", async () => {
    const error = { message: "Something went wrong" };
    mockAxios.onGet(mockApi).reply(400, error);

    const { result } = renderHook(() => useFetch(mockApi, null));

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
      expect(result.current.data).toBe(null);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBe(null);
      expect(result.current.error).toEqual(error.message);
      expect(result.current.lastUpdated).not.toBe(undefined);
    });
  });

  it("should handle refresh", async () => {
    const data = { id: 1, name: "Adam" };
    mockAxios.onGet(mockApi).reply(200, data);

    const { result } = renderHook(() => useFetch(mockApi, null));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.lastUpdated).not.toBe(undefined);
    });

    const lastUpdated = result.current.lastUpdated;

    result.current.refresh();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(data);
      expect(result.current.lastUpdated).not.toBe(lastUpdated);
    });
  });

  it("should handle update key", async () => {
    const data = { id: 1, name: "Adam" };
    let key = 1;
    mockAxios.onGet(mockApi).reply(200, data);

    const { result, rerender } = renderHook(() => useFetch(mockApi, null, false, key));

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
      expect(result.current.data).toBe(null);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(data);
      expect(result.current.lastUpdated).not.toBe(undefined);
    });

    const lastUpdated = result.current.lastUpdated;

    key = 2;

    rerender();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(data);
      expect(result.current.lastUpdated).not.toBe(lastUpdated);
    });
  });
});
