import userEvent from "@testing-library/user-event";

import { render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";

import RegistrationCertificateModal from ".";

const mockData: SPORegistrationDetail = {
  cost: 1000,
  deposit: 5000,
  fee: 100,
  margin: 0.05,
  pledge: 10000,
  poolId: "0c2e0c5a062389a3fd6fafddae26344d490866d7a34cad981b20f96b",
  poolName: "A CardanoLand pool ACL",
  poolView: "pool1pshqcksxywy68lt04lw6uf35f4yssekh5dx2mxqmyrukke2z5y3",
  rewardAccount: "stake1u96p044dm63xr5qqp9vs3tn8c7cy8heqrf32zge6kvnax0gpg3q8p",
  stakeKeys: [
    "stake1u8lfu9fuxfvmd52za448mlmg5g65tjmwrtxhdszfuntchscmlqcej",
    "stake1u96p044dm63xr5qqp9vs3tn8c7cy8heqrf32zge6kvnax0gpg3q8p",
    "stake1u9k74gm48n5y9qyhm3w6eex3p3jf2t54u2pz5yhy4yl3a8smtxnar",
    "stake1ux0xhuuf2e65qnvt35qtzuemq272xsjmh87yuvep580pagccpntge"
  ],
  time: "2023-07-03T12:34:56Z",
  totalFee: 500,
  txHash: "0x7ab3f9562b7b2c8e4e6f73b8f6a26a702d4a0c1e2eac37d286d2dcb6e8591c3b",
  vrfKey: "0x18a2b51b867a8a2a3f78d8c63f20d1ef1e2ff25f3e0737a9e94ed0e104bfba9a"
};

jest.mock("src/commons/hooks/useFetch");

describe("RegistrationCertificateModal component", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockReturnValue({
      data: mockData
    });
  });
  it("should component render", () => {
    const onClose = jest.fn();
    render(
      <RegistrationCertificateModal
        onClose={onClose}
        open={true}
        poolId="pool1yd67lvc04eztwrpnefqh3g4dsydmezwgrg6ce4km728v6sg8zwf"
        poolUpdateId={2}
      />
    );
    const txHashLinkEl = screen.getByRole("link", {
      name: new RegExp(mockData.txHash)
    });
    const poolViewEl = screen.getByRole("link", { name: new RegExp(mockData.poolView, "i") });
    expect(txHashLinkEl).toBeInTheDocument();
    expect(poolViewEl).toBeInTheDocument();
  });
  it("should modal close", async () => {
    const onClose = jest.fn();
    render(
      <RegistrationCertificateModal
        onClose={onClose}
        open={true}
        poolId="pool1yd67lvc04eztwrpnefqh3g4dsydmezwgrg6ce4km728v6sg8zwf"
        poolUpdateId={2}
      />
    );
    const closeModalButton = screen.getByTestId("close-modal-button");
    expect(closeModalButton).toBeInTheDocument();
    await userEvent.click(closeModalButton);
    expect(onClose).toBeCalled();
  });
});
