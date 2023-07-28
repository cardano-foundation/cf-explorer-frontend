import { render, screen } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";
import { formatDateTimeLocal } from "src/commons/utils/helper";

import DelegationTab from "./DelegationTab";
import DeregistrationTab from "./DeregistrationTab";
import RewardsDistributionTab from "./RewardsDistributionTab";
import WithdrawalHistoryTab from "./WithdrawalHistoryTab";
import StakeRegistrationTab from "./StakeRegistrationTab";

jest.mock("src/commons/hooks/useFetchList");

describe("DelegationTab", () => {
  const mockedData = [
    {
      deposit: 2000000,
      fee: 174301,
      time: "2022/12/26 20:55:37",
      txHash: "c906597ea4fd716aa5bdaa0ae96beed3ef07af43c97c85f64c4b5a03b17d912d"
    }
  ];

  beforeEach(() => {
    const mockedUseFetchList = useFetchList as jest.Mock;
    mockedUseFetchList.mockReturnValue({
      data: mockedData,
      total: 1
    });
  });
  it("should component renders", () => {
    render(<DelegationTab />);
    expect(
      screen.getByRole("link", {
        name: /c906597ea4fd716aa5bdaa0ae96beed3ef07af43c97c85f64c4b5a03b17d912d/i
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", {
        name: new RegExp(formatDateTimeLocal(mockedData[0].time), "i")
      })
    ).toBeInTheDocument();

    expect(screen.getByText(/0\.174301/i)).toBeInTheDocument();
    expect(screen.getByText(/showing 1 result/i)).toBeInTheDocument();
  });
});

describe("RewardsDistributionTab", () => {
  const mockedData = [
    {
      amount: 2977300,
      epoch: 417,
      time: "2023/06/09 21:47:26"
    }
  ];

  beforeEach(() => {
    const mockedUseFetchList = useFetchList as jest.Mock;
    mockedUseFetchList.mockReturnValue({
      data: mockedData,
      total: 1
    });
  });
  it("should component renders", () => {
    render(<RewardsDistributionTab />);
    expect(screen.getByText(/\+2\.9773/i)).toBeInTheDocument();
    expect(
      screen.getByRole("cell", {
        name: new RegExp(formatDateTimeLocal(mockedData[0].time), "i")
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("link", {
        name: /417/i
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/showing 1 result/i)).toBeInTheDocument();
  });
});

describe("DeregistrationTab", () => {
  const mockedData = [
    {
      fee: 181385,
      outSum: 544764115,
      time: "2023/05/30 13:26:41",
      txHash: "ed64c850fdf2e7b73c1fa0f99a33461820179d7ff9563b91a65b83e4ebc28dd4"
    }
  ];

  beforeEach(() => {
    const mockedUseFetchList = useFetchList as jest.Mock;
    mockedUseFetchList.mockReturnValue({
      data: mockedData,
      total: 1
    });
  });
  it("should component renders", () => {
    render(<DeregistrationTab />);
    expect(
      screen.getByRole("link", {
        name: /ed64c850fdf2e7b73c1fa0f99a33461820179d7ff9563b91a65b83e4ebc28dd4/i
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", {
        name: new RegExp(formatDateTimeLocal(mockedData[0].time), "i")
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/0\.181385/i)).toBeInTheDocument();
  });
});

describe("WithdrawalHistoryTab", () => {
  const mockedData = [
    {
      fee: 173157,
      time: "2022/12/26 17:47:27",
      txHash: "546c7525ff2dac120610a598bc0d07df3037c848b6ad48efab16c8b7e5ab0b21",
      value: 16370530
    }
  ];

  beforeEach(() => {
    const mockedUseFetchList = useFetchList as jest.Mock;
    mockedUseFetchList.mockReturnValue({
      data: mockedData,
      total: 1
    });
  });
  it("should component renders", () => {
    render(<WithdrawalHistoryTab />);
    expect(
      screen.getByRole("link", {
        name: /546c7525ff2dac120610a598bc0d07df3037c848b6ad48efab16c8b7e5ab0b21/i
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", {
        name: new RegExp(formatDateTimeLocal(mockedData[0].time), "i")
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/showing 1 result/i)).toBeInTheDocument();
    expect(
      screen.getByRole("cell", {
        name: new RegExp(formatDateTimeLocal(mockedData[0].time), "i")
      })
    ).toBeInTheDocument();
  });
});

describe("StakeRegistrationTab", () => {
  const mockedData = [
    {
      deposit: 2000000,
      fee: 174301,
      time: "2022/12/26 20:55:37",
      txHash: "c906597ea4fd716aa5bdaa0ae96beed3ef07af43c97c85f64c4b5a03b17d912d"
    }
  ];

  beforeEach(() => {
    const mockedUseFetchList = useFetchList as jest.Mock;
    mockedUseFetchList.mockReturnValue({
      data: mockedData,
      total: 1
    });
  });
  it("should component renders", () => {
    render(<StakeRegistrationTab />);
    expect(
      screen.getByRole("link", {
        name: /c906597ea4fd716aa5bdaa0ae96beed3ef07af43c97c85f64c4b5a03b17d912d/i
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", {
        name: new RegExp(formatDateTimeLocal(mockedData[0].time), "i")
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/0\.174301/i)).toBeInTheDocument();
  });
});
