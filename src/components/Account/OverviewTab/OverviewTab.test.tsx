import { screen } from "@testing-library/react";
import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";

import { render } from "src/test-utils";
import SignIn from "src/pages/SignIn";
import themes from "src/themes";
import { UserDataType } from "src/types/user";

import OverviewTab, { ConnectWalletModal, RowItem } from "./index";

const rowItemMockProps = {
  label: "test label",
  value: "test@mail.com",
  action: <button data-testid="mock-btn-search" />,
  isTablet: false,
  isInput: false,
  placeholder: "",
  setvalueInput: jest.fn(),
  valueInput: ""
};
const mockApiData: UserDataType = {
  address: "UK-US",
  avatar: "https://example-image.com",
  email: "test@mail.com",
  lastLogin: "06/12/2023 04:55:10",
  loginType: "wallet",
  sizeBookmark: 10,
  sizeNote: 10,
  username: "testusername",
  wallet: "7b9660a2d4ad3be24efbb368625890775c604c66b794dc0ece7fe1a773d6e14b"
};

const mockedReturnValue = {
  isEnabled: true,
  isConnected: true,
  isConnecting: false,
  enabledWallet: true,
  stakeAddress: "testAddress",
  usedAddresses: [],
  unusedAddresses: [],
  signMessage: jest.fn(),
  connect: jest.fn(),
  disconnect: jest.fn(),
  installedExtensions: [],
  accountBalance: 100
};

jest.mock("react-redux", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn()
  };
});

jest.mock("src/components/Account/OverviewTab/OverviewTab.test.tsx", () => {
  const originalModule = jest.requireActual("index.tsx");
  return {
    ...originalModule,
    ConnectWalletModal: () => <button />
  };
});

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useTheme: jest.fn()
}));

jest.mock("@cardano-foundation/cardano-connect-with-wallet", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useCardano: jest.fn() as jest.Mock extends (...args: any) => infer R ? R : never,
  NetworkType: {
    MAINNET: "mainnet",
    TESTNET: "testnet"
  },
  isWalletInstalled: jest.fn()
}));

describe("SignIn page", () => {
  beforeEach(() => {
    const mockedUseTheme = useTheme as jest.Mock;
    mockedUseTheme.mockReturnValue(themes.light);

    const mockUseCardano = useCardano as jest.Mock;
    mockUseCardano.mockReturnValue(mockedReturnValue);

    const mockUseSelector = useSelector as jest.Mock;
    mockUseSelector.mockReturnValue({ userData: mockApiData });
  });

  it("should render the page", () => {
    const mockUseCardano = useCardano as jest.Mock;

    mockUseCardano.mockReturnValueOnce(mockedReturnValue);

    render(<SignIn />);
    expect(screen.getByTestId("signin-title")).toBeInTheDocument();
  });
});

describe("RowItem Component", () => {
  it("rendering on PC", () => {
    render(<RowItem {...rowItemMockProps} />);
    expect(screen.getByText(rowItemMockProps.label)).toBeInTheDocument();
    expect(screen.getByText(rowItemMockProps.value)).toBeInTheDocument();
    expect(screen.getByTestId("mock-btn-search")).toBeInTheDocument();
  });

  it("rendering on editable mode", () => {
    const inputOption = {
      placeholder: "test placeholder",
      valueInput: "test value",
      isInput: true
    };

    render(<RowItem {...rowItemMockProps} {...inputOption} />);

    const inputEl = screen.getByPlaceholderText("test placeholder") as HTMLInputElement;

    expect(screen.getByText(rowItemMockProps.label)).toBeInTheDocument();
    expect(screen.queryByText(rowItemMockProps.value)).not.toBeInTheDocument();
    expect(screen.getByTestId("mock-btn-search")).toBeInTheDocument();
    expect(inputEl).toBeInTheDocument();
    expect(inputEl.value).toBe(inputOption.valueInput);
  });

  it("rendering on Mobile and Tablet devices", () => {
    render(<RowItem {...rowItemMockProps} isTablet={true} />);
    expect(screen.getByTestId("mobile-wraper")).toBeInTheDocument();
  });
});

describe("Overview Component", () => {
  beforeEach(() => {
    const mockedUseTheme = useTheme as jest.Mock;
    mockedUseTheme.mockReturnValue(themes.light);

    const mockUseCardano = useCardano as jest.Mock;
    mockUseCardano.mockReturnValue(mockedReturnValue);

    const mockUseSelector = useSelector as jest.Mock;
    mockUseSelector.mockReturnValue({ userData: mockApiData });
  });

  it("Rendering component on PC", async () => {
    render(<OverviewTab />);
    expect(screen.getByText(mockApiData.username)).toBeInTheDocument();
    expect(screen.getByText(mockApiData.lastLogin)).toBeInTheDocument();
  });
});

describe("ConnectWalletModal Component", () => {
  beforeEach(() => {
    const mockedUseTheme = useTheme as jest.Mock;
    mockedUseTheme.mockReturnValue(themes.light);

    const mockUseCardano = useCardano as jest.Mock;
    mockUseCardano.mockReturnValue(mockedReturnValue);

    const mockUseSelector = useSelector as jest.Mock;
    mockUseSelector.mockReturnValue({ userData: mockApiData });
  });

  it("rendering component on PC", () => {
    render(<ConnectWalletModal open={true} setOpen={jest.fn()} />);
    expect(screen.getByText("Link wallet to your account")).toBeInTheDocument();
  });

  it("checking all the wallets was loaded", () => {
    render(<ConnectWalletModal open={true} setOpen={jest.fn()} />);

    expect(screen.getByText("Flint")).toBeInTheDocument();
    expect(screen.getByText("Nami")).toBeInTheDocument();
    expect(screen.getByText("Eternl")).toBeInTheDocument();
    expect(screen.getByText("Yoroi")).toBeInTheDocument();
    expect(screen.getByText("Flint")).toBeInTheDocument();
    expect(screen.getByText("Typhon")).toBeInTheDocument();
  });
});
