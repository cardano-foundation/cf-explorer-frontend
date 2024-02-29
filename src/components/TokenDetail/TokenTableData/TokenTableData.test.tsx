import { useTheme } from "@mui/material";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import useFetchList from "src/commons/hooks/useFetchList";
import { fireEvent, render, screen } from "src/test-utils";
import themes from "src/themes";
import { details } from "src/commons/routers";

import TokenMetadata from "./TokenMetadata";
import TokenMinting from "./TokenMinting";
import TokenTopHolder from "./TokenTopHolder";
import TokenTransaction from "./TokenTransaction";

const scriptValue = {
  name: "AMLOD",
  tokenType: "Antd"
};

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useTheme: jest.fn()
}));

jest.mock("src/commons/hooks/useFetchList");
jest.mock("@textea/json-viewer");

describe("TokenMetadata component", () => {
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue(themes.light);
  });
  it("should component render", async () => {
    render(<TokenMetadata metadataJson={JSON.stringify(scriptValue)} />);
    expect(screen.getByText(/Metadata Check/i)).toBeInTheDocument();
  });

  it("should component render with no value", () => {
    render(<TokenMetadata metadataJson={""} />);
    expect(screen.getByText("No records found")).toBeInTheDocument();
  });
});

describe("TokenMinting component", () => {
  const mockTokenMetadata: ITokenMetadata = {
    policy: "token-policy",
    logo: "token-logo.png",
    decimals: 18,
    description: "Token Description",
    ticker: "TKN",
    url: "https://example.com/token"
  };

  const mockProps = {
    tokenId: "token-id",
    metadata: mockTokenMetadata
  };

  const mockData: ITokenTopHolderTable = {
    address: "0x123abchhbbcde",
    name: "Token Holder",
    displayName: "Token Holder",
    fingerprint: "token-fingerprint",
    quantity: 1000,
    addressType: "PAYMENT_ADDRESS"
  };

  beforeEach(() => {
    jest.resetModules();
    (useTheme as jest.Mock).mockReturnValue(themes.light);
    (useFetchList as jest.Mock).mockReturnValue({
      data: [mockData]
    });
  });
  it("should component render", () => {
    render(<TokenMinting {...mockProps} />);
    expect(screen.getByRole("columnheader", { name: /tx hash/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /amount minted/i })).toBeInTheDocument();
  });
});

describe("TokenTopHolder component", () => {
  const mockProps = {
    tokenId: "token-id",
    totalSupply: 1000,
    decimal: 18
  };
  const mockData = {
    address: "0x123abc",
    name: "Token Holder",
    displayName: "Token Holder",
    fingerprint: "token-fingerprint",
    addressType: "PAYMENT_ADDRESS",
    quantity: 1000
  };

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue(themes.light);
    (useFetchList as jest.Mock).mockReturnValue({ data: [mockData] });
  });

  it("should component render", () => {
    render(<TokenTopHolder {...mockProps} />);
    expect(screen.getByRole("columnheader", { name: /address/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /balance/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /share/i })).toBeInTheDocument();
  });

  it("should user goto the detail page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <TokenTopHolder {...mockProps} />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: mockData.address }));
    expect(history.location.pathname).toBe(
      mockData.addressType === "PAYMENT_ADDRESS" ? details.address(mockData.address) : details.stake(mockData.address)
    );
  });
});

describe("TokenTransaction component", () => {
  const mockData: Transactions = {
    hash: "transaction-hash",
    blockNo: 123,
    blockHash: "block-hash",
    epochNo: 1,
    epochSlotNo: 10,
    slot: 100,
    addressesInput: ["address-input-1", "address-input-2"],
    addressesOutput: ["address-output-1", "address-output-2"],
    fee: 100,
    totalOutput: 500,
    time: "2023-07-03 10:00:00",
    balance: 1000,
    tokens: [
      {
        address: "token-address-1",
        addressId: 1,
        displayName: "Token 1",
        fingerprint: "token-fingerprint-1",
        name: "Token Name 1",
        policy: "token-policy-1",
        quantity: 100
      },
      {
        address: "token-address-2",
        addressId: 2,
        displayName: "Token 2",
        fingerprint: "token-fingerprint-2",
        name: "Token Name 2",
        policy: "token-policy-2",
        quantity: 200
      }
    ]
  };

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue(themes.light);
    (useFetchList as jest.Mock).mockReturnValue({ data: [mockData] });
  });

  it("should component render", () => {
    render(<TokenTransaction tokenId="00xx3wecDDCEEdssdE" />);
    expect(screen.getByRole("columnheader", { name: /tx hash/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /addresses/i })).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });

  it("should user goto detail page", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <TokenTransaction tokenId="00xx3wecDDCEEdssdE" />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: /transaction-hash/i }));
    expect(history.location.pathname).toBe(details.transaction(mockData.hash));
  });
});
