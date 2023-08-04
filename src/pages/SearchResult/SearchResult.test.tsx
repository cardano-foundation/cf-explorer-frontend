import { useState } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";

import SearchResult from "./index";

jest.mock("src/commons/utils/axios", () => ({
  get: jest.fn().mockResolvedValue({ data: {} })
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn()
}));

describe("SearchResult", () => {
  const history = createMemoryHistory();
  const route = "/search?search=test_value";

  beforeEach(() => {
    history.push(route);
  });

  it("renders loading state", async () => {
    const mockState = true;
    const setMockState = jest.fn();
    (useState as jest.Mock).mockReturnValue([mockState, setMockState]);

    render(
      <Router history={history}>
        <SearchResult />
      </Router>
    );
    await waitFor(() => {
      const loadingElement = screen.getByTestId("search-page");
      expect(loadingElement).toBeInTheDocument();
    });
  });

  it("renders NoRecord component when no results are found", async () => {
    const mockState = false;
    const setMockState = jest.fn();
    (useState as jest.Mock).mockReturnValue([mockState, setMockState]);

    render(
      <Router history={history}>
        <SearchResult />
      </Router>
    );

    const noRecordElement = screen.getByAltText(/empty icon/i);
    expect(noRecordElement).toBeInTheDocument();
  });
});
