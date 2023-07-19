import { useCardano } from "@cardano-foundation/cardano-connect-with-wallet";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";

import { render, screen } from "src/test-utils";
import SignIn from "src/pages/SignIn";
import themes from "src/themes";
import { UserDataType } from "src/types/user";

import MyProfile from "./index";

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
  enabledWallet: "exampleWallet",
  stakeAddress: "exampleAddress",
  usedAddresses: [],
  unusedAddresses: [],
  signMessage: jest.fn(),
  connect: jest.fn(),
  disconnect: jest.fn(),
  installedExtensions: [],
  accountBalance: 100
};

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useTheme: jest.fn()
}));

jest.mock("react-redux", () => {
  return {
    __esModule: true,
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn()
  };
});

jest.mock("@cardano-foundation/cardano-connect-with-wallet", () => ({
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
    const mockedReturnValue = {
      isEnabled: true,
      isConnected: true,
      isConnecting: false,
      enabledWallet: "exampleWallet",
      stakeAddress: "exampleAddress",
      usedAddresses: [],
      unusedAddresses: [],
      signMessage: jest.fn(),
      connect: jest.fn(),
      disconnect: jest.fn(),
      installedExtensions: [],
      accountBalance: 100
    };

    mockUseCardano.mockReturnValueOnce(mockedReturnValue);

    render(<SignIn />);
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });
});

describe("MyProfile component", () => {
  beforeEach(() => {
    const mockedUseTheme = useTheme as jest.Mock;
    mockedUseTheme.mockReturnValue(themes.light);

    const mockUseCardano = useCardano as jest.Mock;
    mockUseCardano.mockReturnValue(mockedReturnValue);

    const mockUseSelector = useSelector as jest.Mock;
    mockUseSelector.mockReturnValue({ userData: mockApiData });
  });
  it("rendering component on PC", () => {
    render(<MyProfile />);
    expect(screen.getByText(mockApiData.email)).toBeInTheDocument();
    expect(screen.getByText(mockApiData.lastLogin)).toBeInTheDocument();
  });
});
