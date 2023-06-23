import { useHistory, useParams } from "react-router-dom";

import { render, screen, fireEvent } from "src/test-utils";
import { formatDateTimeLocal } from "src/commons/utils/helper";

import Deregistration, { DeregistrationTimeline } from "./index";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn(),
  useParams: jest.fn()
}));

describe("DeregistrationTimeline", () => {
  beforeEach(() => {
    const mockUseHistory = useHistory as jest.Mock;
    const mockUseParams = useParams as jest.Mock;
    mockUseHistory.mockReturnValueOnce({ push: jest.fn() });
    mockUseParams.mockReturnValueOnce({ stakeId: "abc123" });
  });
  it("renders without errors", () => {
    const selected = {
      txHash: "sktn32",
      deposit: 1000,
      fee: 50,
      time: "12/12/2022 07:00:00"
    };

    const toggleModal = jest.fn();
    render(<DeregistrationTimeline selected={selected} toggleModal={toggleModal} showBackButton={true} />);
    expect(screen.getByText(/deregistration certificate/i)).toBeInTheDocument();
    expect(screen.getByText("0.00005")).toBeInTheDocument();
    expect(screen.getByText(formatDateTimeLocal(selected.time))).toBeInTheDocument();
  });

  it("calls toggleModal when Deregistration Certificate shape is clicked", () => {
    const selected = {
      txHash: "abc123",
      deposit: 1000,
      fee: 50,
      time: "12/12/2022 07:00:00"
    };

    const toggleModal = jest.fn();

    render(<DeregistrationTimeline selected={selected} toggleModal={toggleModal} showBackButton={true} />);

    fireEvent.click(screen.getByText("Deregistration Certificate"));
    expect(toggleModal).toHaveBeenCalled();
  });
});

describe("Deregistration", () => {
  beforeEach(() => {
    const mockUseHistory = useHistory as jest.Mock;
    const mockUseParams = useParams as jest.Mock;
    mockUseHistory.mockReturnValueOnce({ push: jest.fn() });
    mockUseParams.mockReturnValueOnce({ stakeId: "abc123" });
  });

  it("renders without errors", () => {
    render(<Deregistration />);

    expect(screen.getByText(/Deregistration List/i)).toBeInTheDocument();
  });
});
