import { MemoryRouter } from "react-router-dom";

import { fireEvent, render, screen } from "src/test-utils";

import ButtonBack from ".";

const mockGoBack = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    goBack: mockGoBack
  })
}));

describe("Button Back test", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ButtonBack />
      </MemoryRouter>
    );
  });

  it("should component render", () => {
    expect(screen.getByTestId("back-button")).toBeInTheDocument();
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  it("should back when click button", () => {
    fireEvent.click(screen.getByTestId("back-button"));
    expect(mockGoBack).toHaveBeenCalledTimes(1);
  });
});
