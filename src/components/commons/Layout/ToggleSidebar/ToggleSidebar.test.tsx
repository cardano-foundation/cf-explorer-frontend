import { useSelector } from "react-redux";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { render } from "src/test-utils";

import ToggleSidebar from ".";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

describe("test ToggleSidebar", () => {
  it("renders ToggleSidebar open", async () => {
    const mockUseSelector = useSelector as jest.Mock;
    mockUseSelector.mockReturnValue({ sidebar: true });
    const handleToggle = jest.fn();
    render(<ToggleSidebar handleToggle={handleToggle} />);
    expect(screen.getByTestId("toggle-sidebar-toggle-menu")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-sidebar-arrow-left")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("toggle-sidebar-toggle-menu"));
    await waitFor(() => {
      expect(handleToggle).toHaveBeenCalled();
    });
  });

  it("renders ToggleSidebar close", async () => {
    const mockUseSelector = useSelector as jest.Mock;
    mockUseSelector.mockReturnValue({ sidebar: false });
    const handleToggle = jest.fn();
    render(<ToggleSidebar handleToggle={handleToggle} />);
    expect(screen.getByTestId("toggle-sidebar-arrow-right")).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("toggle-sidebar-toggle-menu"));
    await waitFor(() => {
      expect(handleToggle).toHaveBeenCalled();
    });
  });
});
