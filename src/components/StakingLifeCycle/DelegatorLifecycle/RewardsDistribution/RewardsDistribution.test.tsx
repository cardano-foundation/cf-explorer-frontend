import { useSelector } from "react-redux";
import { useTheme } from "@mui/material";
import { useParams } from "react-router-dom";

import useFetch from "src/commons/hooks/useFetch";
import themes from "src/themes";
import { render, screen } from "src/test-utils";

import RewardsDistribution from "./index";

jest.mock("src/commons/hooks/useFetch", () => {
  return jest.fn(() => ({
    data: {
      rewardAvailable: 100
    }
  }));
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

jest.mock("@mui/material", () => ({
  __esModule: true,
  ...jest.requireActual("@mui/material"),
  useTheme: jest.fn()
}));

describe("RewardsDistribution", () => {
  beforeEach(() => {
    const mockedUseParams = useParams as jest.Mock;
    const mockedUseFetch = useFetch as jest.Mock;
    const mockedUseSelector = useSelector as jest.Mock;
    const mockedUseTheme = useTheme as jest.Mock;
    mockedUseTheme.mockReturnValue(themes.light);
    console.log(themes.light.palette.border);
    mockedUseParams.mockReturnValue({
      stakeId: "stake123"
    });
    mockedUseFetch.mockReturnValue({
      data: {
        rewardAvailable: 100
      }
    });

    mockedUseSelector.mockReturnValue({
      sidebar: 0
    });
  });
  it("renders component and triggers modal", () => {
    render(<RewardsDistribution />);
    screen.logTestingPlaygroundURL();
    expect(screen.getByText(/cardano blockchain/i)).toBeInTheDocument();
  });
});
