import { render, screen } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";

import AssetHolders from "./AssetHolders";
import AssociatedAddress from "./AssociatedAddress";
import MinttingBurningPolicy from "./MinttingBurningPolicy";
import Script from "./Script";

import { NativeScriptContext } from ".";

const data = {
  loading: false,
  after: "",
  associatedAddress: [],
  before: "04/19/2019 06:59:41",
  conditionType: "all",
  keyHashes: ["421d2150828730433df35f93088bfc223f9ab3b74ad8333c160625f7"],
  script: "",
  scriptHash: "",
  initialized: true
};

const holdersData = {
  address: "addr1q9j2jfjc8e62evvlna3dkpj2u5zsyjz9hu046qxazqrchmpw84y7ctgfrxanhqjgu0lrmxk27u8e37sajtvh8hgzhvwqnqumq4",
  displayName: "HOSKY",
  fingerprint: "asset17q7r59zlc3dgw0venc80pdv566q6yguw03f0d9",
  metadata: { url: "https://hosky.io", ticker: "HOSKY", decimals: 0 },
  name: "484f534b59",
  policy: "a0028f350aaabe0545fdcb56b039bfb08e4bb4d8c4d7c3c7d481c235",
  quantity: 500000000000068
};
jest.mock("src/commons/hooks/useFetchList");

describe("AssetHolders component", () => {
  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({ data: [holdersData] });
  });

  it("should component render", () => {
    render(
      <NativeScriptContext.Provider value={data}>
        <AssetHolders />
      </NativeScriptContext.Provider>
    );
    expect(screen.getByRole("columnheader", { name: /address/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /token name/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /token id/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /balance/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: new RegExp(holdersData.address, "i") })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: new RegExp(holdersData.displayName, "i") })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: new RegExp(holdersData.fingerprint, "i") })).toBeInTheDocument();
  });
});

describe("AssociatedAddress component", () => {
  it("should component render with nodata", () => {
    render(
      <NativeScriptContext.Provider value={data}>
        <AssociatedAddress />
      </NativeScriptContext.Provider>
    );
    expect(screen.getByText(/associated addresses/i)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /empty icon/i })).toBeInTheDocument();
  });

  it("should component render with data", () => {
    render(
      <NativeScriptContext.Provider value={{ ...data, associatedAddress: ["dxxk2323dfad"] }}>
        <AssociatedAddress />
      </NativeScriptContext.Provider>
    );
    expect(screen.getByText(/associated addresses/i)).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /empty icon/i })).not.toBeInTheDocument();
  });
});

describe("MinttingBurningPolicy component", () => {
  it("should component render", () => {
    render(
      <NativeScriptContext.Provider value={data}>
        <MinttingBurningPolicy />
      </NativeScriptContext.Provider>
    );
    expect(screen.getByText(/conditions:/i)).toBeInTheDocument();
    expect(screen.getByText(/allowed by/i)).toBeInTheDocument();
    expect(screen.getByText(/421d2150828730433df35f93088bfc223f9ab3b74ad8333c/i)).toBeInTheDocument();
  });
});

describe("Script component", () => {
  it("should component render", () => {
    render(
      <NativeScriptContext.Provider value={data}>
        <Script />
      </NativeScriptContext.Provider>
    );
    screen.logTestingPlaygroundURL();
  });
});
