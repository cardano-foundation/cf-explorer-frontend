import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material";
import { useSelector } from "react-redux";

import useFetch from "src/commons/hooks/useFetch";
import themes from "src/themes";
import { API } from "src/commons/utils/api";
import { render, screen, fireEvent } from "src/test-utils";

import AddressAnalytics from ".";

jest.mock("react-router-dom", () => {
  return {
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn()
  };
});

jest.mock("src/commons/hooks/useFetch");

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useTheme: jest.fn()
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

const mockAddress = "12345";

const mockData = {
  data: [
    {
      date: "2023/11/29 00:00:00",
      value: 23753396
    },
    {
      date: "2023/11/29 02:00:00",
      value: 23753396
    },
    {
      date: "2023/11/29 04:00:00",
      value: 23753396
    },
    {
      date: "2023/11/29 06:00:00",
      value: 23753396
    },
    {
      date: "2023/11/29 08:00:00",
      value: 23753396
    },
    {
      date: "2023/11/29 10:00:00",
      value: 23753396
    },
    {
      date: "2023/11/29 12:00:00",
      value: 23753396
    },
    {
      date: "2023/11/29 14:00:00",
      value: 23753396
    },
    {
      date: "2023/11/29 16:00:00",
      value: 23753396
    },
    {
      date: "2023/11/29 18:00:00",
      value: 23753396
    },
    {
      date: "2023/11/29 20:00:00",
      value: 23753396
    },
    {
      date: "2023/11/29 22:00:00",
      value: 23753396
    },
    {
      date: "2023/11/30 00:00:00",
      value: 23753396
    }
  ],
  highestBalance: 23753396,
  lowestBalance: 23753396
};

describe("Address Analytics component test", () => {
  const mockUseParams = useParams as jest.Mock;
  const mockUseFetch = useFetch as jest.Mock;
  const mockUseTheme = useTheme as jest.Mock;
  const mockUseSelector = useSelector as jest.Mock;
  beforeEach(() => {
    jest.resetAllMocks();
    mockUseParams.mockReturnValue({ address: mockAddress });
    mockUseFetch.mockResolvedValue({ data: mockData, loading: false });
    mockUseTheme.mockReturnValue(themes.light);
    mockUseSelector.mockReturnValue("123");
    render(<AddressAnalytics />);
  });

  it("should component render", () => {
    expect(screen.getByRole("button", { name: /balance/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /1d/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /1w/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /1m/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /3m/i })).toBeInTheDocument();
    expect(screen.getByText("Highest Balance")).toBeInTheDocument();
    expect(screen.getByText("Lowest Balance")).toBeInTheDocument();
  });

  it("should fetch data", () => {
    expect(mockUseFetch).toHaveBeenCalledTimes(1);
  });

  it("should fetch data when click button", async () => {
    fireEvent.click(screen.getByRole("button", { name: /1w/i }));
    expect(mockUseFetch).toHaveBeenLastCalledWith(
      `${API.ADDRESS.ANALYTICS}/${mockAddress}/ONE_WEEK`,
      undefined,
      false,
      "123"
    );
  });
});
