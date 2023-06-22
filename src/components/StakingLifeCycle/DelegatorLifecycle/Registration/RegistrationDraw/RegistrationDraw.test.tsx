import { useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import userEvent from "@testing-library/user-event";

import { render, screen } from "src/test-utils";
import themes from "src/themes";
import { RegistrationDraw } from "src/components/StakingLifeCycle/SPOLifecycle/Registration/RegistrationDraw";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useTheme: jest.fn()
}));

const selected = {
  poolUpdateId: 12,
  txHash: "hash",
  fee: 2,
  poolHold: 2,
  time: "12/12/2022",
  margin: 2
};

const data = {
  poolName: "poolname",
  poolView: "poolview",
  stakeKeys: ["statekey1"],
  txHash: "txhash"
};

describe("RegistrationDraw", () => {
  beforeEach(() => {
    const mockUseSelector = useSelector as jest.Mock;
    const mockedUseTheme = useTheme as jest.Mock;
    mockedUseTheme.mockReturnValue(themes.light);
    mockUseSelector.mockReturnValue({ sidebar: 0 });
  });

  it("renders without errors", () => {
    const toggleModal = jest.fn();

    render(<RegistrationDraw data={data} selected={selected} toggleModal={toggleModal} showBackButton={true} />);
  });

  it("calls toggleModal when Registration Certificate shape is clicked", () => {
    const toggleModal = jest.fn();

    render(<RegistrationDraw data={data} selected={selected} toggleModal={toggleModal} showBackButton={true} />);
    const certificate = screen.getByText(/pool registration certificate/i);
    userEvent.click(certificate);

    expect(toggleModal).toHaveBeenCalled();
  });

  it("does not render the back button when showBackButton prop is false", () => {
    const toggleModal = jest.fn();

    render(<RegistrationDraw data={data} selected={selected} toggleModal={toggleModal} showBackButton={true} />);

    const backButton = screen.queryByTestId("back-button");

    expect(backButton).toBeNull();
  });
});
