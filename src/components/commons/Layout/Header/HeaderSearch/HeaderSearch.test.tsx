import { fireEvent, screen } from "@testing-library/react";
import { useSelector } from "react-redux";

import { render } from "src/test-utils";

import HeaderSearch from ".";

const mockData = {
  currentEpoch: {
    no: 20
  }
};

jest.mock("react-redux", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn()
  };
});

describe("HeaderSearch", () => {
  beforeEach(() => {
    const mockUseSelector = useSelector as jest.Mock;
    mockUseSelector.mockReturnValue({
      sidebar: true,
      ...mockData
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should render header search", () => {
    render(<HeaderSearch home={false} />);
    expect(screen.getByPlaceholderText("Search ...")).toBeInTheDocument();
    expect(screen.getByText("Search for an epoch")).toBeInTheDocument();
  });
  it("should be able input for seaching", () => {
    render(<HeaderSearch home={false} />);
    const dropdown = screen.getByTestId("all-filters-dropdown");
    fireEvent.click(dropdown);
    const input = screen.getByPlaceholderText("Search ...");
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: "testing value" } });
    expect(screen.getByText("testing value")).toBeInTheDocument();
  });
});
