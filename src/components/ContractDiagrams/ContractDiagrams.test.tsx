import { render, screen } from "src/test-utils";

import ContractDiagrams from ".";

const mockedData: IContractItemTx = {
  contract: "mock-contract-address",
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

describe("DetailViewContractHash component", () => {
  it("rendering ContractDiagrams transansaction", () => {
    render(<ContractDiagrams txHash="test-txHash" item={mockedData} />);
    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getByText(mockedData.purpose)).toBeInTheDocument();
    expect(screen.getByText(mockedData.redeemerMem)).toBeInTheDocument();
  });
  it("rendering ContractDiagrams contract", () => {
    render(<ContractDiagrams item={mockedData} />);
    expect(screen.getByText("Contract")).toBeInTheDocument();
    expect(screen.getByText("Redeemer")).toBeInTheDocument();
    expect(screen.getByText("Contract Bytecode")).toBeInTheDocument();
  });
});
