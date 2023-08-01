import { render, screen } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";
import { getShortHash, getShortWallet } from "src/commons/utils/helper";

import RegistrationPools, { POOL_TYPE } from "./index";

jest.mock("src/commons/hooks/useFetchList");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}));

const mockedData = [
  {
    block: 4490550,
    cost: 340000000,
    epoch: 208,
    margin: 0.015,
    pledge: 450000000000,
    poolId: 1,
    poolName: "OctasPool",
    poolView: "pool1z5uqdk7dzdxaae5633fqfcu2eqzy3a3rgtuvy087fdld7yws0xt",
    slotNo: 800,
    stakeKey: ["stake1uy89kzrdlpaz5rzu8x95r4qnlpqhd3f8mf09edjp73vcs3qhktrtm"],
    txHash: "841cca81da918feb9fa7257a34630eac95794be712ed3faae6df64f215ce25f2",
    txId: 2415556,
    txTime: "07/30/2020 04:58:11"
  }
];

describe("RegistrationPools component", () => {
  beforeEach(() => {
    const mockedUseFetchList = useFetchList as jest.Mock;
    mockedUseFetchList.mockReturnValue({
      data: mockedData,
      loading: false,
      error: null,
      initialized: true,
      total: 1,
      totalPage: 1,
      currentPage: 1,
      lastUpdated: new Date().toString()
    });
  });
  it("redering compoment on PC registration", () => {
    render(<RegistrationPools poolType={POOL_TYPE.REGISTRATION} />);
    expect(screen.getByText(/Pool Certificate/i)).toBeInTheDocument();
    expect(screen.getByText(/last updated/i)).toBeInTheDocument();
  });

  it("redering compoment on PC de-registration", () => {
    render(<RegistrationPools poolType={POOL_TYPE.DEREREGISTRATION} />);
    expect(
      screen.getByRole("heading", {
        name: /pool deregistration/i
      })
    ).toBeInTheDocument();
  });

  it("rendering table on PC with data", () => {
    render(<RegistrationPools poolType={POOL_TYPE.REGISTRATION} />);
    const data = mockedData[0];
    expect(screen.getByText(getShortHash(data.txHash))).toBeInTheDocument();
    expect(screen.getByText(data.poolName)).toBeInTheDocument();
    data.stakeKey.forEach((stakeKey: string) => {
      expect(screen.getByText(getShortWallet(stakeKey))).toBeInTheDocument();
    });
  });

  it("rendering without any data", () => {
    const mockedUseFetchList = useFetchList as jest.Mock;
    mockedUseFetchList.mockReturnValue({
      data: [],
      loading: false,
      error: true,
      initialized: true,
      total: 0,
      totalPage: 0,
      currentPage: 1,
      lastUpdated: "07/30/2020 04:58:11"
    });

    const data = mockedData[0];

    render(<RegistrationPools poolType={POOL_TYPE.REGISTRATION} />);
    expect(screen.queryByText(getShortHash(data.txHash))).not.toBeInTheDocument();
    expect(screen.queryByText(data.poolName)).not.toBeInTheDocument();
    data.stakeKey.forEach((stakeKey: string) => {
      expect(screen.queryByText(getShortWallet(stakeKey))).not.toBeInTheDocument();
    });
  });
});
