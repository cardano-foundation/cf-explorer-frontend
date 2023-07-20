import { fireEvent, render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";

import DelegationDetailChart from ".";

const mockData = {
  analyticsData: {
    epochChart: {
      highest: 2000,
      lowest: 500,
      dataByDays: [
        {
          epochNo: 1,
          totalStake: 1000
        },
        {
          epochNo: 2,
          totalStake: 1500
        }
      ]
    },
    delegatorChart: {
      highest: 100,
      lowest: 20,
      dataByDays: [
        {
          epochNo: 1,
          numberDelegator: 50
        },
        {
          epochNo: 2,
          numberDelegator: 70
        }
      ]
    }
  },
  loading: false,
  initialized: true,
  total: 10,
  scrollEffect: jest.fn()
};

jest.mock("src/commons/hooks/useFetch");

const mockPool = "pool88372DCC324";
describe("DelegationDetailChart component", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockReturnValue(mockData);
  });
  it("should component render", () => {
    render(<DelegationDetailChart poolId={mockPool} />);
    expect(screen.getByRole("heading", { name: /analytics/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /analytics/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delegator/i })).toBeInTheDocument();
    expect(screen.getByText(/highest stake/i)).toBeInTheDocument();
  });

  it("should component change chart", () => {
    render(<DelegationDetailChart poolId={mockPool} />);
    fireEvent.click(screen.getByRole("button", { name: /delegator/i }));
    expect(screen.getByText(/highest number of delegators/i)).toBeInTheDocument();
    expect(screen.getByText(/lowest number of delegators/i)).toBeInTheDocument();
  });
});
