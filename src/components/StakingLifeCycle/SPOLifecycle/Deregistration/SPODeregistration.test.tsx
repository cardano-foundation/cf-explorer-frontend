import { render, screen } from "src/test-utils";
import { getShortHash } from "src/commons/utils/helper";

import Deregistration, { DeregistrationTimeline } from "./index";

const mockedData = {
  poolId: "0c2e0c5a062389a3fd6fafddae26344d490866d7a34cad981b20f96b",
  poolName: "A CardanoLand pool ACL",
  poolView: "pool1pshqcksxywy68lt04lw6uf35f4yssekh5dx2mxqmyrukke2z5y3",
  stakeKeys: [
    "stake1u8lfu9fuxfvmd52za448mlmg5g65tjmwrtxhdszfuntchscmlqcej",
    "stake1u96p044dm63xr5qqp9vs3tn8c7cy8heqrf32zge6kvnax0gpg3q8p",
    "stake1u9k74gm48n5y9qyhm3w6eex3p3jf2t54u2pz5yhy4yl3a8smtxnar",
    "stake1ux0xhuuf2e65qnvt35qtzuemq272xsjmh87yuvep580pagccpntge"
  ],
  txHash: "0x7ab3f9562b7b2c8e4e6f73b8f6a26a702d4a0c1e2eac37d286d2dcb6e8591c3b",
  totalFee: 1000,
  poolHold: 50000,
  time: "2023-07-03T12:34:56Z",
  fee: 10,
  retiringEpoch: 500
};

describe("Deregistration component", () => {
  it("should component render", () => {
    render(<Deregistration />);
    expect(screen.getByText(/recent deregistration/i)).toBeInTheDocument();
    expect(screen.getByText(/filter-ic.svg/i)).toBeInTheDocument();
  });
});

describe("DeregistrationTimeline component", () => {
  it("should component render", () => {
    const handleToggleModal = jest.fn();
    render(<DeregistrationTimeline selected={mockedData} toggleModal={handleToggleModal} showBackButton={true} />);
    const txHashEl = screen.getByRole("link", {
      name: new RegExp(getShortHash(mockedData.txHash), "i")
    });
    expect(txHashEl).toBeInTheDocument();
  });
});
