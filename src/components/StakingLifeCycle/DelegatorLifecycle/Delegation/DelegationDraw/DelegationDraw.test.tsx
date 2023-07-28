import userEvent from "@testing-library/user-event";
import { createBrowserHistory } from "history";
import { Router, useParams } from "react-router-dom";

import { act, render, screen, waitFor } from "src/test-utils";
import { formatADAFull, formatDateTimeLocal, getShortHash } from "src/commons/utils/helper";
import useFetch from "src/commons/hooks/useFetch";
import { details } from "src/commons/routers";

import DelegationDraw from ".";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}));
jest.mock("src/commons/hooks/useFetch");

const stakeId = "stake1u96el9cyxhwd7s7f7qmculdpp44f5mjrsvh9vh9nrlhdjlsgvfap6";
const txHash = "6aa459c234197d685a0b92846b3b879d31f56b241b5d503120f51ec517102117";

const mockData: DelegationDetail = {
  txHash,
  blockNo: 9078325,
  epoch: 426,
  outSum: 9616228,
  fee: 185081,
  poolId: "pool1u0mc9ywfxl529atxyajuz3pgqnwgnk6w7lejjmjg22ucvn7z9vh",
  poolName: "Nerd Stake Pool",
  time: "2023/07/26 10:27:14",
  stakeTotalAmount: 9616228
};

describe("DelegationDraw", () => {
  beforeEach(() => {
    const mockUseParams = useParams as jest.Mock<{ stakeId: string; txHash?: string }>;
    mockUseParams.mockReturnValue({ stakeId, txHash });
  });

  it("renders DelegationDraw", async () => {
    const toggleModal = jest.fn();
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ data: mockData, initialized: true });

    render(<DelegationDraw toggleModal={toggleModal} showBackButton />);

    expect(screen.getByTestId("delegator-delegation-back-button")).toBeInTheDocument();
    expect(screen.getByText(getShortHash(txHash))).toBeInTheDocument();
    expect(screen.getByTestId("delegator-delegation-copy-button")).toBeInTheDocument();
    expect(screen.getByTestId("delegator-delegation-fee")).toHaveTextContent(formatADAFull(mockData.fee));
    expect(screen.getByText(formatDateTimeLocal(mockData.time))).toBeInTheDocument();
    expect(screen.getByTestId("delegator-delegation-ada-holder")).toBeInTheDocument();
    const certificate = screen.getByTestId("delegator-delegation-certificate");
    expect(certificate).toHaveTextContent(/Delegation Certificate/i);
    expect(screen.getByTestId("delegator-delegation-fee-box")).toBeInTheDocument();
    expect(screen.getByTestId("delegator-delegation-cardano-blockchain")).toBeInTheDocument();
    await userEvent.click(certificate);
    await waitFor(() => {
      expect(toggleModal).toBeCalled();
    });
  });

  it("navigate DelegationDraw trasaction", async () => {
    const history = createBrowserHistory();
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ data: mockData, initialized: true });

    render(
      <Router history={history}>
        <DelegationDraw toggleModal={jest.fn()} showBackButton />
      </Router>
    );

    await act(async () => {
      await userEvent.click(screen.getByText(getShortHash(txHash)));
    });
    await waitFor(() => {
      expect(history.location.pathname).toBe(details.transaction(txHash));
    });
  });

  it("renders DelegationDraw without back button  ", () => {
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ data: mockData, initialized: true });

    render(<DelegationDraw toggleModal={jest.fn()} showBackButton={false} />);

    expect(screen.queryByTestId("delegator-delegation-back-button")).not.toBeInTheDocument();
  });

  it("renders DelegationDraw when record", () => {
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ error: true });

    render(<DelegationDraw toggleModal={jest.fn()} showBackButton />);

    expect(screen.queryByTestId("delegator-delegation-container")).not.toBeInTheDocument();
  });

  it("renders DelegationDraw when loading", () => {
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({ initialized: false });

    render(<DelegationDraw toggleModal={jest.fn()} showBackButton />);

    expect(screen.getByTestId("delegator-delegation-draw-skeleton")).toBeInTheDocument();
  });

  it("renders DelegationDraw when do have txHash", () => {
    const mockUseFetch = useFetch as jest.Mock;
    mockUseFetch.mockReturnValue({});
    const mockUseParams = useParams as jest.Mock<{ stakeId: string }>;
    mockUseParams.mockReturnValue({ stakeId });

    render(<DelegationDraw toggleModal={jest.fn()} showBackButton />);

    expect(screen.queryByAltText("delegator-delegation-draw-skeleton")).not.toBeInTheDocument();
    expect(screen.queryByTestId("delegator-delegation-conatiner")).not.toBeInTheDocument();
  });
});
