import userEvent from "@testing-library/user-event";
import { createBrowserHistory } from "history";
import { Router, useParams } from "react-router-dom";

import { act, render, screen, waitFor } from "src/test-utils";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";

import RegistrationDraw from ".";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}));
jest.mock("src/commons/hooks/useFetch");

const stakeId = "stake1u96el9cyxhwd7s7f7qmculdpp44f5mjrsvh9vh9nrlhdjlsgvfap6";
const txHash = "6aa459c234197d685a0b92846b3b879d31f56b241b5d503120f51ec517102117";

const mockData: RegistrationDetail = {
  txHash,
  fee: 174601,
  deposit: 2000000,
  time: "2023/07/24 14:47:16",
  joinDepositPaid: true
};
const mockDataJoinDeposit: RegistrationDetail = { ...mockData, joinDepositPaid: false };

describe("RegistrationDraw", () => {
  beforeEach(() => {
    const mockUseParams = useParams as jest.Mock<{ stakeId: string; txHash?: string }>;
    mockUseParams.mockReturnValue({ stakeId, txHash });
  });

  it("renders RegistrationDraw", async () => {
    const toggleModal = jest.fn();
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ data: mockData, initialized: true });

    render(<RegistrationDraw toggleModal={toggleModal} showBackButton />);

    expect(screen.getByTestId("delegator-registration-back-button")).toBeInTheDocument();
    expect(screen.getByText(getShortHash(txHash))).toBeInTheDocument();
    expect(screen.getByTestId("delegator-registration-copy-button")).toBeInTheDocument();
    expect(screen.getByText(formatADAFull(mockData.deposit + mockData.fee))).toBeInTheDocument();
    expect(screen.getByText(formatDateTimeLocal(mockData.time))).toBeInTheDocument();
    const certificate = screen.getByTestId("delegator-registration-certificate");
    expect(certificate).toHaveTextContent(/Registration Certificate/i);
    expect(screen.getByTestId("delegator-registration-hold-box")).toBeInTheDocument();
    expect(screen.getByTestId("delegator-registration-fee-box")).toBeInTheDocument();
    expect(screen.getByTestId("delegator-registration-cardano-blockchain")).toBeInTheDocument();
    expect(screen.queryByTestId("delegator-registration-join-deposit-paid")).not.toBeInTheDocument();
    await userEvent.click(certificate);
    await waitFor(() => {
      expect(toggleModal).toBeCalled();
    });
  });

  it("navigate RegistrationDraw trasaction", async () => {
    const history = createBrowserHistory();
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ data: mockData, initialized: true });

    render(
      <Router history={history}>
        <RegistrationDraw toggleModal={jest.fn()} showBackButton />
      </Router>
    );

    await act(async () => {
      await userEvent.click(screen.getByText(getShortHash(txHash)));
    });
    await waitFor(() => {
      expect(history.location.pathname).toBe(details.transaction(txHash));
    });
  });

  it("renders RegistrationDraw without back button and have joinDepositPaid", () => {
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ data: mockDataJoinDeposit, initialized: true });

    render(<RegistrationDraw toggleModal={jest.fn()} showBackButton={false} />);

    expect(screen.queryByTestId("delegator-registration-back-button")).not.toBeInTheDocument();
    expect(screen.getByTestId("delegator-registration-join-deposit-paid")).toBeInTheDocument();
  });

  it("renders RegistrationDraw when record", () => {
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ error: true });

    render(<RegistrationDraw toggleModal={jest.fn()} showBackButton />);

    expect(screen.queryByTestId("delegator-registration-container")).not.toBeInTheDocument();
  });

  it("renders RegistrationDraw when loading", () => {
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ initialized: false });

    render(<RegistrationDraw toggleModal={jest.fn()} showBackButton />);

    expect(screen.getByTestId("delegator-registration-draw-skeleton")).toBeInTheDocument();
  });

  it("renders RegistrationDraw when do have txHash", () => {
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({});
    const mockUseParams = useParams as jest.Mock<{ stakeId: string }>;
    mockUseParams.mockReturnValue({ stakeId });

    render(<RegistrationDraw toggleModal={jest.fn()} showBackButton />);

    expect(screen.queryByAltText("delegator-registration-draw-skeleton")).not.toBeInTheDocument();
    expect(screen.queryByTestId("delegator-registration-conatiner")).not.toBeInTheDocument();
  });
});
