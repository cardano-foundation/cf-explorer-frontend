import React from "react";
import { screen } from "@testing-library/react";
import { useTheme } from "@mui/material";

import useFetch from "src/commons/hooks/useFetch";
import themes from "src/themes";

import { render } from "../../test-utils";

import ScriptModal from "./index";

const mockData = {
  policyId: "af2e27f580f7f08e93190a81f72462f153026d06450924726645891b",
  totalToken: 1,
  policyScript: `{"type":"all","scripts":[{"type":"before","slot":80888391},{"type":"sig","keyHash":"3e84a2dafe1fb49036f8b8a5cd9073255c2eb568362ce4c59256d828"}]}`
};

jest.mock("src/commons/hooks/useFetch");
jest.mock("@mui/material", () => ({
  __esModule: true,
  ...jest.requireActual("@mui/material"),
  useTheme: jest.fn()
}));

jest.mock("@textea/json-viewer");

describe("PolicyOverview", () => {
  it("renders policy details rendered", async () => {
    const mockUseFetch = useFetch as jest.Mock;
    const mockUseTheme = useTheme as jest.Mock;

    mockUseTheme.mockReturnValue(themes.light);
    mockUseFetch.mockReturnValue({
      data: mockData,
      loading: false
    });

    render(<ScriptModal policy={mockData.policyId} open={true} onClose={jest.fn()} />);

    const policyIdElements = await screen.findByText(mockData.policyId);
    const totalTokenElement = await screen.findByTestId("total-token");

    expect(policyIdElements).toBeInTheDocument();
    expect(totalTokenElement).toBeInTheDocument();
    expect(totalTokenElement).toBeInTheDocument();
  });

  it("component loading", async () => {
    const mockUseFetch = useFetch as jest.Mock;
    const mockUseTheme = useTheme as jest.Mock;
    mockUseTheme.mockReturnValue(themes.light);
    mockUseFetch.mockReturnValue({
      data: mockData,
      loading: true
    });

    render(<ScriptModal policy={mockData.policyId} open={true} onClose={jest.fn()} />);
    const loadingElement = screen.getByTestId("loading-element");
    expect(loadingElement).toBeInTheDocument();
  });

  it("empty script", async () => {
    const mockUseFetch = useFetch as jest.Mock;
    const mockUseTheme = useTheme as jest.Mock;
    mockUseTheme.mockReturnValue(themes.light);
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false
    });
    render(<ScriptModal policy={mockData.policyId} open={true} onClose={jest.fn()} />);

    const emptyScriptElement = screen.getByText("Script not found", { exact: false });
    expect(emptyScriptElement).toBeInTheDocument();
  });
});
