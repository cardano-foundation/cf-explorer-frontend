import { render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";

import DetailViewContractHash from "./DetailViewContractHash";

const mockedData: IContractItemTx = {
  contract: "Sample Contract",
  address: "0x123456789abcdef",
  datumBytesIn: "Sample Datum Bytes In",
  datumBytesOut: "Sample Datum Bytes Out",
  datumHashIn: "Sample Datum Hash In",
  datumHashOut: "Sample Datum Hash Out",
  purpose: "Sample Purpose",
  redeemerBytes: "Sample Redeemer Bytes",
  redeemerMem: 100,
  redeemerSteps: 10,
  scriptBytes: "Sample Script Bytes",
  scriptHash: JSON.stringify({ prop1: "Value 1", prop2: "Value 2" })
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
    expect(screen.getByText(mockedData.purpose)).toBeInTheDocument();
    expect(screen.getByText(mockedData.redeemerBytes)).toBeInTheDocument();
    expect(screen.getByText(mockedData.redeemerMem)).toBeInTheDocument();
    expect(screen.getByText(mockedData.redeemerSteps)).toBeInTheDocument();
  });
});
