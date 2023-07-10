import userEvent from "@testing-library/user-event";

import { render, screen } from "src/test-utils";

import PoolUpdateModal from ".";

const mockData = {
  poolUpdateId: 1,
  poolId: "0c2e0c5a062389a3fd6fafddae26344d490866d7a34cad981b20f96b",
  poolName: "A CardanoLand pool ACL",
  poolView: "pool1pshqcksxywy68lt04lw6uf35f4yssekh5dx2mxqmyrukke2z5y3",
  previousPledge: 1000,
  previousMargin: 0.05,
  txHash: "0x7ab3f9562b7b2c8e4e6f73b8f6a26a702d4a0c1e2eac37d286d2dcb6e8591c3b",
  time: "2023-07-03T12:34:56Z",
  stakeKeys: [
    "stake1u8lfu9fuxfvmd52za448mlmg5g65tjmwrtxhdszfuntchscmlqcej",
    "stake1u96p044dm63xr5qqp9vs3tn8c7cy8heqrf32zge6kvnax0gpg3q8p",
    "stake1u9k74gm48n5y9qyhm3w6eex3p3jf2t54u2pz5yhy4yl3a8smtxnar",
    "stake1ux0xhuuf2e65qnvt35qtzuemq272xsjmh87yuvep580pagccpntge"
  ],
  fee: 10,
  rewardAccount: "stake1u96p044dm63xr5qqp9vs3tn8c7cy8heqrf32zge6kvnax0gpg3q8p",
  vrfKey: "0x18a2b51b867a8a2a3f78d8c63f20d1ef1e2ff25f3e0737a9e94ed0e104bfba9a",
  pledge: 2000,
  margin: 0.03,
  cost: 500
};
describe("PoolUpdateModal component", () => {
  it("should component render", () => {
    render(<PoolUpdateModal data={mockData} onClose={jest.fn()} open={true} />);
    const rewardAccountEl = screen.getByRole("link", {
      name: new RegExp(mockData.rewardAccount, "i")
    });
    const stakeKeyEl = screen.getByRole("link", {
      name: new RegExp(mockData.stakeKeys[0])
    });
    expect(rewardAccountEl).toBeInTheDocument();
    expect(stakeKeyEl).toBeInTheDocument();
  });

  it("should modal close", async () => {
    const onClose = jest.fn();
    render(<PoolUpdateModal data={mockData} onClose={onClose} open={true} />);
    const closeBtnEl = screen.getByTestId("close-modal-button");
    expect(closeBtnEl).toBeInTheDocument();
    await userEvent.click(closeBtnEl);
    expect(onClose).toBeCalled();
  });
});
