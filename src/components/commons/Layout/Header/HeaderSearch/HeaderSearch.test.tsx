import { fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useSelector } from "react-redux";

import { render } from "src/test-utils";

import HeaderSearch, { OptionsSearch } from ".";

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

  it("should function search by blocks has been called", async () => {
    const mockHandleSearch = jest.fn();
    render(<OptionsSearch show={true} home={true} error="" value={"6789"} handleSearch={mockHandleSearch} />);
    const buttonSearch = screen.getByTestId("option-search-block");
    expect(buttonSearch).toBeInTheDocument();
    await userEvent.click(buttonSearch);
    expect(mockHandleSearch).toHaveBeenCalledWith(undefined, "blocks");
  });

  it("should function search by epochs has been called", async () => {
    const mockUseSelector = useSelector as jest.Mock;
    mockUseSelector.mockReturnValue(mockData);

    const mockHandleSearch = jest.fn();

    render(<OptionsSearch show={true} home={true} error="" value={"10"} handleSearch={mockHandleSearch} />);
    const buttonSearch = screen.getByTestId("option-search-epoch");
    expect(buttonSearch).toBeInTheDocument();
    await userEvent.click(buttonSearch);
    expect(mockHandleSearch).toHaveBeenCalledWith(undefined, "epochs");
  });
});
