import { useParams } from "react-router-dom";

import { render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";
import useADAHandle from "src/commons/hooks/useADAHandle";

import StakeDetail from ".";

const mockData = {
  status: "ACTIVE",
  stakeAddress: "stake1uywtalmp7hzyjys0fhp9t7f2dg0k24n06ncvsmwkrwtze3gr473ck",
  totalStake: 172120652718,
  rewardAvailable: 0,
  rewardWithdrawn: 0,
  pool: { poolId: "pool1elvz3kppg3peep0dcclju3gwf9m37vzyxetuf03we37sqlnsjxr" },
  rewardPools: []
};

const mockStakeId = "stake1uywtalmp7hzyjys0fhp9t7f2dg0k24n06ncvsmwkrwtze3gr473ck";

jest.mock("src/commons/hooks/useADAHandle");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}));
jest.mock("src/commons/hooks/useFetch");

describe("StakeDetail page", () => {
  const mockUseParams = useParams as jest.Mock<{ stakeId: string }>;
  const mockUseFetch = useFetch as jest.Mock;
  const mockUseADAHandle = useADAHandle as jest.Mock;
  beforeEach(() => {
    mockUseParams.mockReturnValue({ stakeId: mockStakeId });

    mockUseADAHandle.mockReturnValue([
      {
        data: null,
        loading: false
      }
    ]);
    mockUseFetch.mockImplementation((url: string) => {
      if (url !== "stakes/undefined") {
        return {
          data: null
        };
      }
      return {
        data: mockData,
        loading: false
      };
    });
    render(<StakeDetail />);
  });
  it("should component render", () => {
    expect(screen.getByText(/Stake Address Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Analytics/i)).toBeInTheDocument();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
