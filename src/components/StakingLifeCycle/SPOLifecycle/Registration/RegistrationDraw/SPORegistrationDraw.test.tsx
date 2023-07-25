import { render, screen } from "src/test-utils";
import { formatADAFull, getShortHash } from "src/commons/utils/helper";

import { ISPOPropsData, RegistrationDraw } from ".";

const mockRegistration: SPORegistration = {
  poolUpdateId: 1,
  txHash: "0x7ab3f9562b7b2c8e4e6f73b8f6a26a702d4a0c1e2eac37d286d2dcb6e8591c3b",
  fee: 100,
  poolHold: 5000,
  time: "2023-07-03T12:34:56Z",
  margin: 0.015
};

const mockData: ISPOPropsData = {
  poolName: "A CardanoLand pool ACL",
  poolView: "pool1pshqcksxywy68lt04lw6uf35f4yssekh5dx2mxqmyrukke2z5y3",
  stakeKeys: [
    "stake1u8lfu9fuxfvmd52za448mlmg5g65tjmwrtxhdszfuntchscmlqcej",
    "stake1u96p044dm63xr5qqp9vs3tn8c7cy8heqrf32zge6kvnax0gpg3q8p",
    "stake1u9k74gm48n5y9qyhm3w6eex3p3jf2t54u2pz5yhy4yl3a8smtxnar",
    "stake1ux0xhuuf2e65qnvt35qtzuemq272xsjmh87yuvep580pagccpntge"
  ],
  txHash: "0x7ab3f9562b7b2c8e4e6f73b8f6a26a702d4a0c1e2eac37d286d2dcb6e8591c3b"
};

describe("RegistrationDraw component", () => {
  it("should component render", () => {
    render(
      <RegistrationDraw data={mockData} selected={mockRegistration} showBackButton={true} toggleModal={jest.fn()} />
    );
    const txHashLinkEl = screen.getByRole("link", {
      name: getShortHash(mockRegistration.txHash)
    });
    const feeEl = screen.getByText(formatADAFull(mockRegistration.poolHold + mockRegistration.fee || 0));
    expect(txHashLinkEl).toBeInTheDocument();
    expect(feeEl).toBeInTheDocument();
  });

  it("should pool registration cerificate open", async () => {
    const onToggleModal = jest.fn();
    render(
      <RegistrationDraw data={mockData} selected={mockRegistration} showBackButton={true} toggleModal={onToggleModal} />
    );
    const button = screen.getByText(/cardano-system.svg/i);
    expect(button).toBeInTheDocument();
  });
});
