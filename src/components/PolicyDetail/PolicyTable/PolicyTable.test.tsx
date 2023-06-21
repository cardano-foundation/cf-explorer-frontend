import React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useTheme } from "@mui/material";

import themes from "src/themes";
import useFetchList from "src/commons/hooks/useFetchList";

import { render } from "../../../test-utils";

import PolicyTable from "./index";
const mockData = {
  data: [],
  loading: false,
  error: null,
  initialized: false,
  total: 100,
  totalPage: 10,
  currentPage: 1,
  refresh: jest.fn(),
  update: jest.fn(),
  lastUpdated: 1686198578731
};
jest.mock("@mui/material", () => ({
  __esModule: true,
  ...jest.requireActual("@mui/material"),
  useTheme: jest.fn()
}));

jest.mock("src/commons/hooks/useFetchList");

describe("PolicyTable", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    const mockUseTheme = useTheme as jest.Mock;
    const mockUseFetch = useFetchList as jest.Mock;

    mockUseTheme.mockReturnValue(themes.light);
    mockUseFetch.mockReturnValue(mockData);
  });
  it("component was rendered right way", () => {
    render(<PolicyTable />);
    const firstTabElement = screen.getByText("Token");
    const secoundTabElement = screen.getByText("Policy Asset Holders");

    expect(firstTabElement).toBeInTheDocument();
    expect(secoundTabElement).toBeInTheDocument();
  });

  it("testing tab changing page in a right way", async () => {
    render(<PolicyTable />);
    const secoundTabElement = screen.getByRole("tab", { name: /policy asset holders/i });
    const firstElement = screen.getByRole("tab", {
      name: /token/i
    });

    await userEvent.click(secoundTabElement);
    await waitFor(() => {
      expect(secoundTabElement.getAttribute("aria-selected")).toBe("true");
      expect(firstElement.getAttribute("aria-selected")).toBe("false");
    });
  });

  it("data was display on table", () => {
    render(<PolicyTable />);
    const tableFooter = screen.getByText(/result/i);

    expect(tableFooter).toBeInTheDocument();
    expect(tableFooter.innerHTML.includes(mockData.total.toString())).toBeTruthy();
  });
});
