import Router from "react-router";

import { render } from "src/test-utils";
import defaultAxios from "src/commons/utils/axios";

import RecentDeregistrations from ".";

const txHash = "f0cc0767ea4cf06ce45a85db8f17f930576af1b06f327b8d9d5d25c17f962166";
const time = new Date().toString();
const fakeUserResponse: SPODeregistration[] = [
  {
    txHash,
    fee: 1,
    time,
    poolId: "PoolID",
    poolName: "PoolName",
    poolView: "poolView",
    stakeKeys: [],
    totalFee: 1,
    poolHold: 1,
    retiringEpoch: 1
  }
];

beforeEach(() => {
  jest.clearAllMocks();
});

test("check RecentDeregistrations call mock api", async () => {
  const onSelect = jest.fn();
  jest.spyOn(Router, "useParams").mockReturnValue({ poolId: "1" });
  const mockFetchData = jest.spyOn(defaultAxios, "get").mockImplementation(async () => {
    return Promise.resolve({
      json: () => Promise.resolve(fakeUserResponse)
    });
  });

  render(<RecentDeregistrations onSelect={onSelect} setShowBackButton={jest.fn()} />);
  expect(mockFetchData).toHaveBeenCalled();
});
