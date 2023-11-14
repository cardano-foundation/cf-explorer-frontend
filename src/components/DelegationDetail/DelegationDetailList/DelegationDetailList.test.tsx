import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import { fireEvent, render, screen } from "src/test-utils";
import { details } from "src/commons/routers";
import { POOL_ACTION_TYPE } from "src/commons/utils/constants";

import { DelegationCertificatesHistory, DelegationEpochList, DelegationStakingDelegatorsList } from ".";

const mockEpochList = {
  data: [
    {
      epoch: 447,
      block: 61,
      stakeAmount: 65904_430,
      delegator: 26689,
      fee: 582.382668,
      ros: 123
    },
    {
      epoch: 446,
      block: 58,
      stakeAmount: 14904_430,
      delegator: null,
      fee: 321.31,
      ros: 321
    }
  ],
  loading: false,
  initialized: true,
  total: 10,
  scrollEffect: jest.fn()
};

const mockStakingDelegators = {
  data: [
    {
      address: "0x123456789",
      view: "View 1",
      totalStake: 1000,
      time: "2023-07-11",
      fee: 0.05
    },
    {
      address: "0x987654321",
      view: "View 2",
      totalStake: 500,
      time: "2023-07-12",
      fee: 0.02
    }
  ],
  loading: false,
  initialized: true,
  total: 10,
  scrollEffect: jest.fn()
};

const mockCertificatesHistory = {
  data: [
    {
      txHash: "addr1z8snz7c4974vzdpxu65ruphl3zjdvtxw8strf2c2tmqnxz2j2c79gy9l76sdg0xwhd7r0c0kna0tycz4y5s6mlenh8pq0xmsha",
      createdAt: "2020/07/29 21:58:11",
      block: 9441048,
      epoch: 443,
      slot: 443,
      absoluteSlot: 106249559,
      actions: ["POOL REGISTRATION" as POOL_ACTION_TYPE]
    },
    {
      txHash: "addr1z8jd97ct35n4s5ss8lt4sq0zclw0dmf7yak8fj46m0jm3dswtf6nj8t35qph4n6m04gawl49yvsxytfjpjpcfhehpcvqwwrrlu",
      createdAt: "2020/07/29 21:58:11",
      block: 9441048,
      epoch: 443,
      slot: 443,
      absoluteSlot: 106249559,
      actions: ["POOL UPDATE" as POOL_ACTION_TYPE]
    },
    {
      txHash: "addr1zxem3j9xw7gyqnry0mfdhku7grrzu0707dc9fs68zwkln5sm5kjdmrpmng059yellupyvwgay2v0lz6663swmds7hp0qul0eqc",
      createdAt: "2020/07/29 21:58:11",
      block: 9441048,
      epoch: 443,
      slot: 443,
      absoluteSlot: 106249559,
      actions: ["POOL UPDATE" as POOL_ACTION_TYPE, "POOL DEREGISTRATION" as POOL_ACTION_TYPE]
    }
  ],
  loading: false,
  initialized: true,
  total: 10,
  scrollEffect: jest.fn()
};

describe("Epoch List component", () => {
  beforeEach(() => {
    render(<DelegationEpochList {...mockEpochList} />);
  });

  it("should component render", () => {
    expect(screen.getByText("447")).toBeInTheDocument();
    expect(screen.getByText("446")).toBeInTheDocument();
  });
});

describe("DelegationDetailList component", () => {
  it("should component render", () => {
    render(<DelegationStakingDelegatorsList {...mockStakingDelegators} />);
    expect(screen.getByRole("link", { name: /view 1/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view 2/i })).toBeInTheDocument();
    expect(screen.getByText(/result/i)).toBeInTheDocument();
  });

  it("should detail page button click", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <DelegationStakingDelegatorsList {...mockStakingDelegators} />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: /view 1/i }));
    expect(history.location.pathname).toBe(details.stake(mockStakingDelegators.data[0].view));
  });
});

describe("Certificates History Component", () => {
  it("should component render", () => {
    render(<DelegationCertificatesHistory {...mockCertificatesHistory} />);
    expect(screen.getByTestId("table-common")).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "addr1z8snz7c4974vzdpxu65ruphl3zjdvtxw8strf2c2tmqnxz2j2c79gy9l76sdg0xwhd7r0c0kna0tycz4y5s6mlenh8pq0xmsha"
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "addr1z8jd97ct35n4s5ss8lt4sq0zclw0dmf7yak8fj46m0jm3dswtf6nj8t35qph4n6m04gawl49yvsxytfjpjpcfhehpcvqwwrrlu"
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "addr1zxem3j9xw7gyqnry0mfdhku7grrzu0707dc9fs68zwkln5sm5kjdmrpmng059yellupyvwgay2v0lz6663swmds7hp0qul0eqc"
      })
    ).toBeInTheDocument();
  });
});
