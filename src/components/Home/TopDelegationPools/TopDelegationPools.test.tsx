import { cleanup, screen, waitFor } from "@testing-library/react";
import { useSelector } from "react-redux";
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";

import { render } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";
import { formatADAFull, formatPercent } from "src/commons/utils/helper";
import { details, routers } from "src/commons/routers";

import TopDelegationPools from ".";

jest.mock("src/commons/hooks/useFetch");
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

const mockItem: DelegationPool = {
  poolId: "pool1ases3nklh6gyjf74r7dqm89exjfd520z9cefqru959wcccmrdlk",
  poolName: "Minswap",
  poolSize: 88181086417463,
  reward: 3.4967,
  feePercent: 1,
  feeAmount: 340000000,
  pledge: 50000000000000,
  saturation: 123.46,
  epochBlock: 10,
  lifetimeBlock: 10,
  lifetimeRos: 10
};

describe("TopDelegationPools", () => {
  beforeEach(() => {
    const mockUseFetch = useFetch as jest.Mock;
    const mockUseSelector = useSelector as jest.Mock;
    mockUseFetch.mockReturnValue({ data: [mockItem], loading: false, initialized: true });
    mockUseSelector.mockReturnValue({ sidebar: true });
  });

  afterEach(() => {
    cleanup();
  });

  it("renders Pools", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <TopDelegationPools />
      </Router>
    );
    expect(screen.getByText("Pools")).toBeInTheDocument();
    const seeAllButton = screen.getByTestId("view-all");
    expect(seeAllButton).toBeInTheDocument();
    await userEvent.click(seeAllButton);
    await waitFor(async () => {
      expect(history.location.pathname).toBe(routers.DELEGATION_POOLS);
    });
  });

  it("renders data in the table Pools", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <TopDelegationPools />
      </Router>
    );
    expect(screen.getByText(mockItem.poolName)).toBeInTheDocument();
    expect(screen.getByText(formatADAFull(mockItem.poolSize))).toBeInTheDocument();
    expect(screen.getByText(formatPercent(mockItem.saturation / 100))).toBeInTheDocument();
  });

  it("navigate pool detail Pools", async () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <TopDelegationPools />
      </Router>
    );
    await userEvent.click(screen.getByText(mockItem.poolName));
    await waitFor(async () => {
      expect(history.location.pathname).toBe(details.delegation(mockItem.poolId));
    });
  });
});
