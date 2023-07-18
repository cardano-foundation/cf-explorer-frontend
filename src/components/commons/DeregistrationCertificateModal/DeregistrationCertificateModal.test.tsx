import { fireEvent, render, screen } from "src/test-utils";
import useFetch from "src/commons/hooks/useFetch";

import { DeregistrationCertificateModal } from ".";

const mockStake = "stake99823jjjddwrqw2323";
const mockData: IStakeKeyDetail = {
  status: "ACTIVE",
  stakeAddress: "stakeAddress123",
  totalStake: 1000,
  rewardAvailable: 500,
  rewardWithdrawn: 200,
  rewardPools: ["rewardPool1", "rewardPool2"],
  pool: {
    tickerName: "POOL",
    poolName: "My Pool",
    poolId: "poolId123",
    iconUrl: "https://example.com/pool-icon.png",
    logoUrl: "https://example.com/pool-logo.png"
  }
};
jest.mock("src/commons/hooks/useFetch");

describe("DeregistrationCertificateModal component", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockReturnValue({
      data: mockData
    });
  });
  it("should component render", () => {
    render(<DeregistrationCertificateModal handleCloseModal={jest.fn()} open={true} stake={mockStake} />);
    const stakeKey = screen.getByRole("link", {
      name: new RegExp(mockStake, "i")
    });
    expect(screen.getByText(/deregistration certificate/i)).toBeInTheDocument();
    expect(screen.getByTestId("close-modal-button")).toBeInTheDocument();
    expect(stakeKey).toBeInTheDocument();
  });

  it("should component close", async () => {
    const onClose = jest.fn();
    render(<DeregistrationCertificateModal handleCloseModal={onClose} open={true} stake={mockStake} />);
    await fireEvent.click(screen.getByTestId("close-modal-button"));
    expect(onClose).toBeCalled();
  });
});
