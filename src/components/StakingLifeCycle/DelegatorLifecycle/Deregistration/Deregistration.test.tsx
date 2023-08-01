import userEvent from "@testing-library/user-event";
import { useParams } from "react-router-dom";

import { render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";

import Deregistration  from "./index";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}));
jest.mock("src/commons/hooks/useFetch");

const stakeId = "stake1u96el9cyxhwd7s7f7qmculdpp44f5mjrsvh9vh9nrlhdjlsgvfap6";

describe("Deregistration", () => {
  beforeEach(() => {
    const mockUseParams = useParams as jest.Mock<{ stakeId: string }>;
    mockUseParams.mockReturnValue({ stakeId });
    
    const mockedUseFetch = useFetch as jest.Mock;
    mockedUseFetch.mockReturnValue({
      data: null,
      loading: false
    });
  });
  it("render Deregistration ", () => {
    render(<Deregistration />);
    expect(screen.getByText(/registration list/i)).toBeInTheDocument();
    expect(screen.getByText(/showing 0 result/i)).toBeInTheDocument();
  });
});
 