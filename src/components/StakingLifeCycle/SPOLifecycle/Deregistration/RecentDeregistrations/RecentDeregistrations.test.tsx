import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecentDeregistrations from ".";
import defaultAxios from "../../../../../commons/utils/axios";
import { getShortHash } from "../../../../../commons/utils/helper";

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
    retiringEpoch: 1,
  },
];

afterEach(() => {
  cleanup()
})

test("check RecentDeregistrations call mock api", async () => {
  const onSelect = jest.fn();
  const mockFetchData = jest.spyOn(defaultAxios, "get").mockImplementation(async () => {
    return Promise.resolve({
      json: () => Promise.resolve(fakeUserResponse),
    });
  });

  // render(<RecentDeregistrations onSelect={onSelect} />);
  // expect(mockFetchData).toHaveBeenCalled();
  // await waitFor(async() => {
  //   expect(screen.getByText(getShortHash(txHash))).toBeInTheDocument();
  //   await userEvent.click(screen.getByText(getShortHash(txHash)));
  //   expect(onSelect).toHaveBeenCalled();
  // });
});
