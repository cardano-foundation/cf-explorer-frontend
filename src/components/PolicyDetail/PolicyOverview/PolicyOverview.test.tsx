import React from "react";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { useScreen } from "src/commons/hooks/useScreen";

import { render } from "../../../test-utils";

import PolicyOverview from "./index";

jest.mock("src/commons/hooks/useScreen", () => {
  return {
    __esModule: true,
    ...jest.requireActual("src/commons/hooks/useScreen"),
    useScreen: jest.fn()
  };
});

const mockData = {
  policyId: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235"
} as PolicyDetail;
describe("PolicyOverview", () => {
  const mockUseScreen = useScreen as jest.Mock;

  it("testing on mobile and tablet devices", async () => {
    mockUseScreen.mockReturnValue({ isMobile: true, isTablet: true });
    render(<PolicyOverview data={mockData} loading={false} />);
    const policyIdElement = screen.getByText(/a002/, { exact: false });
    expect(policyIdElement).toBeInTheDocument();
  });

  it("testing rendering policy details", () => {
    mockUseScreen.mockReturnValue({ isMobile: false, isTablet: false });
    render(<PolicyOverview data={mockData} loading={false} />);
    expect(screen.getByText(/Policy Details/)).toBeInTheDocument();
    expect(screen.getByText(/Script Hash/)).toBeInTheDocument();
    expect(screen.getByText(/a002/)).toBeInTheDocument();
  });

  it("testing loadidng state", () => {
    mockUseScreen.mockReturnValue({ isMobile: false, isTablet: false });
    render(<PolicyOverview data={mockData} loading={true} />);

    const loadingElement = screen.getByTestId("loading-element");
    expect(loadingElement).toBeInTheDocument();
  });

  it("testing opening modal", async () => {
    mockUseScreen.mockReturnValue({ isMobile: false, isTablet: false });
    render(<PolicyOverview data={mockData} loading={false} />);
    const button = screen.getByRole("button", {
      name: /policy script/i
    });

    userEvent.click(button);
    const modalEl = await screen.findByTestId("modal-testid");
    expect(modalEl).toBeInTheDocument();
  });
});
