import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ReactRouter from "react-router";

import { render } from "src/test-utils";

import ADATransferModal from ".";

test("should render ADATransferModal modal", async () => {
  const handleCloseModal = jest.fn();
  jest.spyOn(ReactRouter, "useParams").mockReturnValue({ stakeId: "1234" });

  render(<ADATransferModal open={true} handleCloseModal={handleCloseModal} />);
  expect(screen.getByText("ADA Transfers")).toBeInTheDocument();

  const walletActivity = screen.getByText(/Wallet Activity/i);
  expect(walletActivity).toBeInTheDocument();

  const rewardActivity = screen.getByText(/Rewards Activity/i);
  expect(rewardActivity).toBeInTheDocument();

  await userEvent.click(rewardActivity);
  expect(screen.getByText(/Epoch/i)).toBeInTheDocument();

  await userEvent.click(walletActivity);
  expect(screen.getByText(/Transaction Hash/i)).toBeInTheDocument();
});
