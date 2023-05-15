import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ADATransferModal from ".";
import ReactRouter from "react-router";
import { render } from "../../../../test-utils";

test("should render ADATransferModal modal", async () => {
  const handleCloseModal = jest.fn();
  jest.spyOn(ReactRouter, "useParams").mockReturnValue({ stakeId: "1234" });

  render(<ADATransferModal open={true} handleCloseModal={handleCloseModal} />);
  expect(screen.getByText("ADA Transfers")).toBeInTheDocument();

  const walletActivity = screen.getByText("Wallet Activity");
  expect(walletActivity).toBeInTheDocument();

  const rewardActivity = screen.getByText("Rewards Activity")
  expect(rewardActivity).toBeInTheDocument();

  await userEvent.click(rewardActivity);
  expect(screen.getByText("Epoch")).toBeInTheDocument();
  
  await userEvent.click(walletActivity);
  expect(screen.getByText("Transaction Hash")).toBeInTheDocument();
});
