import userEvent from "@testing-library/user-event";
import { createBrowserHistory } from "history";
import { Router, useParams } from "react-router-dom";

import { act, render, screen, waitFor } from "src/test-utils";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";

import DeregistrationDraw from ".";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}));
jest.mock("src/commons/hooks/useFetch");

const stakeId = "stake1u96el9cyxhwd7s7f7qmculdpp44f5mjrsvh9vh9nrlhdjlsgvfap6";
const txHash = "6aa459c234197d685a0b92846b3b879d31f56b241b5d503120f51ec517102117";

const mockData: DeregistrationDetail = {
  txHash,
  fee: 174601,
  deposit: 2000000,
  time: "2023/07/24 14:47:16",
  joinDepositPaid: true
};
const mockDataJoinDeposit: DeregistrationDetail = { ...mockData, joinDepositPaid: false };

describe("DeregistrationDraw", () => {
  beforeEach(() => {
    const mockUseParams = useParams as jest.Mock<{ stakeId: string; txHash?: string }>;
    mockUseParams.mockReturnValue({ stakeId, txHash });
  });

  it("renders DeregistrationDraw", async () => {
    const toggleModal = jest.fn();
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ data: mockData, initialized: true });

    render(<DeregistrationDraw toggleModal={toggleModal} showBackButton />);

    expect(screen.getByTestId("delegator-deregistration-back-button")).toBeInTheDocument();
    expect(screen.getByText(getShortHash(txHash))).toBeInTheDocument();
    expect(screen.getByTestId("delegator-deregistration-copy-button")).toBeInTheDocument();
    expect(screen.getByText(formatADAFull(Math.abs(mockData.deposit) - mockData.fee))).toBeInTheDocument();
    expect(screen.getByText(formatDateTimeLocal(mockData.time))).toBeInTheDocument();
    const certificate = screen.getByTestId("delegator-deregistration-certificate");
    expect(certificate).toHaveTextContent(/Deregistration Certificate/i);
    expect(screen.getByTestId("delegator-deregistration-hold-box")).toBeInTheDocument();
    expect(screen.getByTestId("delegator-deregistration-fee-box")).toBeInTheDocument();
    expect(screen.getByTestId("delegator-deregistration-cardano-blockchain")).toBeInTheDocument();
    expect(screen.queryByTestId("delegator-deregistration-join-deposit-paid")).not.toBeInTheDocument();
    await userEvent.click(certificate);
    await waitFor(() => {
      expect(toggleModal).toBeCalled();
    });
  });

  it("navigate DeregistrationDraw trasaction", async () => {
    const history = createBrowserHistory();
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ data: mockData, initialized: true });

    render(
      <Router history={history}>
        <DeregistrationDraw toggleModal={jest.fn()} showBackButton />
      </Router>
    );

    await act(async () => {
      await userEvent.click(screen.getByText(getShortHash(txHash)));
    });
    await waitFor(() => {
      expect(history.location.pathname).toBe(details.transaction(txHash));
    });
  });

  it("renders DeregistrationDraw without back button and have joinDepositPaid", () => {
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ data: mockDataJoinDeposit, initialized: true });

    render(<DeregistrationDraw toggleModal={jest.fn()} showBackButton={false} />);

    expect(screen.queryByTestId("delegator-deregistration-back-button")).not.toBeInTheDocument();
    expect(screen.getByTestId("delegator-deregistration-join-deposit-paid")).toBeInTheDocument();
  });

  it("renders DeregistrationDraw when record", () => {
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ error: true });

    render(<DeregistrationDraw toggleModal={jest.fn()} showBackButton />);

    expect(screen.queryByTestId("delegator-deregistration-container")).not.toBeInTheDocument();
  });

  it("renders DeregistrationDraw when loading", () => {
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ initialized: false });

    render(<DeregistrationDraw toggleModal={jest.fn()} showBackButton />);

    expect(screen.getByTestId("delegator-deregistration-draw-skeleton")).toBeInTheDocument();
  });

  it("renders DeregistrationDraw when do have txHash", () => {
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({});
    const mockUseParams = useParams as jest.Mock<{ stakeId: string }>;
    mockUseParams.mockReturnValue({ stakeId });

    render(<DeregistrationDraw toggleModal={jest.fn()} showBackButton />);

    expect(screen.queryByAltText("delegator-deregistration-draw-skeleton")).not.toBeInTheDocument();
    expect(screen.queryByTestId("delegator-deregistration-conatiner")).not.toBeInTheDocument();
  });
});
