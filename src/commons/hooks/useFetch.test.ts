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
      refresh: expect.any(Function)
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
    });
  });

  it("should handle refresh", async () => {
    const data = { id: 1, name: "Adam" };
    mockAxios.onGet(mockApi).reply(200, data);

    const { result } = renderHook(() => useFetch(mockApi, null));

    waitFor(() => {
      expect(result.current.loading).toBe(true);
      expect(result.current.data).toBe(null);

      expect(result.current.loading).toBe(false);
    });

    result.current.refresh();

    waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(data);
    });
  });

  it("should handle timeout", async () => {
    const data = { id: 1, name: "Adam" };
    mockAxios.onGet(mockApi).reply(200, data);

    const { result } = renderHook(() => useFetch(mockApi, null, false, 1));

    await waitFor(() => {
      expect(result.current.loading).toBe(true);
      expect(result.current.data).toBe(null);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(data);
    });

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(data);
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual(data);
    });
  });
});
