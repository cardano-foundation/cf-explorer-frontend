import { render, screen, waitFor } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";

import DetailViewContractHash from "./DetailViewContractHash";

const mockedData = {
  address: "addr1z8snz7c4974vzdpxu65ruphl3zjdvtxw8strf2c2tmqnxz2j2c79gy9l76sdg0xwhd7r0c0kna0tycz4y5s6mlenh8pq0xmsha",
  scriptHash: "e1317b152faac13426e6a83e06ff88a4d62cce3c1634ab0a5ec13309",
  purpose: "SPEND",
  redeemerBytes: "d8799fd8799fd8799f581c2ebacbff02ff",
  redeemerMem: 2927405,
  redeemerSteps: 873992433,
  datumHashIn: "622595b2e838ddce2ab2ca0fed211ce306241840c7d4abe579dbb0e00361dcd2",
  datumBytesIn: "d8799fd8ffff",
  scriptBytes: "500c01",
  datumHashOut: "622595b2e838ddce2ab2ca0fed211ce306241840c361dcd2",
  datumBytesOut: "d8799fd87fff"
};

jest.mock("src/commons/hooks/useFetch");

describe("DetailViewContractHash component", () => {
  it("rendering component loading", async () => {
    const mockedUseFetch = useFetch as jest.Mock;
    mockedUseFetch.mockReturnValue({
      data: [mockedData],
      loading: true,
      initialized: true
    });
    render(<DetailViewContractHash txHash={"test-tx-hash"} address="test-address" handleClose={jest.fn()} />);
    expect(screen.getByTestId("view-detail-drawer-loading")).toBeInTheDocument();
  });

  it("rendering component on PC", () => {
    const mockedUseFetch = useFetch as jest.Mock;
    mockedUseFetch.mockReturnValue({
      data: [mockedData],
      initialized: true
    });
    render(<DetailViewContractHash txHash={"test-tx-hash"} address="test-address" handleClose={jest.fn()} />);
    expect(screen.getByTestId("view-detail-drawer-contract-hash")).toBeInTheDocument();
    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getByText(mockedData.purpose)).toBeInTheDocument();
    expect(screen.getByText(mockedData.redeemerMem)).toBeInTheDocument();
  });
});
