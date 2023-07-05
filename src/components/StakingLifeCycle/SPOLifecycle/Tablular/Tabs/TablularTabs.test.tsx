import { render, screen } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";
import { formatDateTimeLocal } from "src/commons/utils/helper";

import DeregsitrationTab from "./DeregsitrationTab";
import OperatorRewardTab from "./OperatorReward";
import PoolRegistrationTab from "./PoolRegistrationTab";
import PoolUpdateTab from "./PoolUpdateTab";

const mockDeregistrationTabpular: SPODeregistrationTabpular = {
  poolId: "poolId123",
  poolName: "MyPool",
  poolView: "poolView123",
  stakeKeys: ["stakeKey1", "stakeKey2"],
  txHash: "txHash123",
  totalFee: 500,
  poolHold: 10000,
  time: "2023-07-03 12:34:56Z",
  fee: 100,
  retiringEpoch: 10
};

jest.mock("src/commons/hooks/useFetchList");

describe("DeregistrationTab component", () => {
  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({
      data: [mockDeregistrationTabpular]
    });
  });
  it("should component render", () => {
    render(<DeregsitrationTab />);
    expect(
      screen.getByRole("link", {
        name: /txhash123/i
      })
    ).toBeInTheDocument();
  });
});

describe("OperatorReward component", () => {
  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({
      data: [mockDeregistrationTabpular]
    });
  });
  it("should component render", () => {
    render(<OperatorRewardTab />);
    expect(
      screen.getByRole("cell", {
        name: formatDateTimeLocal(mockDeregistrationTabpular.time)
      })
    );
  });
});

describe("PoolRegistrationTab component", () => {
  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({
      data: [mockDeregistrationTabpular]
    });
  });
  it("should component render", () => {
    render(<PoolRegistrationTab />);
    expect(
      screen.getByRole("link", {
        name: mockDeregistrationTabpular.txHash
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", {
        name: formatDateTimeLocal(mockDeregistrationTabpular.time)
      })
    ).toBeInTheDocument();
  });
});

describe("PoolUpdateTab component", () => {
  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({
      data: [mockDeregistrationTabpular]
    });
  });
  it("should component render", () => {
    render(<PoolUpdateTab />);
    expect(
      screen.getByRole("link", {
        name: mockDeregistrationTabpular.txHash
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", {
        name: formatDateTimeLocal(mockDeregistrationTabpular.time)
      })
    ).toBeInTheDocument();
  });
});
