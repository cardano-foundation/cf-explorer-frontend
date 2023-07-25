import { render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";

import SPOLifecycle from "./index";

const mockedPoolInfo = {
  epochNo: 421,
  poolId: "0c2e0c5a062389a3fd6fafddae26344d490866d7a34cad981b20f96b",
  poolName: "A CardanoLand pool ACL",
  poolSize: 63265619388440,
  poolView: "pool1pshqcksxywy68lt04lw6uf35f4yssekh5dx2mxqmyrukke2z5y3",
  rewardAccounts: ["stake1u96p044dm63xr5qqp9vs3tn8c7cy8heqrf32zge6kvnax0gpg3q8p"],
  rewardAvailable: 246851015970,
  stakeKeys: [
    "stake1u8lfu9fuxfvmd52za448mlmg5g65tjmwrtxhdszfuntchscmlqcej",
    "stake1u96p044dm63xr5qqp9vs3tn8c7cy8heqrf32zge6kvnax0gpg3q8p",
    "stake1u9k74gm48n5y9qyhm3w6eex3p3jf2t54u2pz5yhy4yl3a8smtxnar",
    "stake1ux0xhuuf2e65qnvt35qtzuemq272xsjmh87yuvep580pagccpntge"
  ],
  status: "ACTIVE"
};

jest.mock("src/commons/hooks/useFetch");

describe("SPO lifecycle page", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockReturnValue({
      data: {},
      error: false,
      initialized: true
    });
  });

  it("should component render with empty data", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: null,
      error: true,
      initialized: true
    });
    render(<SPOLifecycle />);
    expect(
      screen.getByRole("img", {
        name: /empty icon/i
      })
    ).toBeInTheDocument();
  });

  it("should component render with data", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: mockedPoolInfo,
      error: false,
      initialized: true
    });
    render(<SPOLifecycle />);
    expect(screen.getByText(/switch to tabular view/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /compose report/i
      })
    ).toBeInTheDocument();
  });
});
