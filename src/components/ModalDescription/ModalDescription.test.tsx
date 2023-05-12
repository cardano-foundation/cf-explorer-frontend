import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DelegationProcessDescription } from "./DelegationProcessDescription";
import { DeregistrationProcessDescription } from "./DeregistrationProcessDescription";
import { RegistrationProcessDescription } from "./RegistrationProcessDescription";
import { RewardDistributionProcessDescription } from "./RewardDistributionProcessDescription";
import { SPOInvolvementInDelegationDescription } from "./SPOInvolvementInDelegationDescription";
import { WithdrawingFundProcessDescription } from "./WithdrawingFundProcessDescription";

test("Render DelegationProcessDescription modal", async () => {
  const handleCloseModal = jest.fn();
  render(<DelegationProcessDescription open={true} handleCloseModal={handleCloseModal} />);
  const element = screen.getByText(/The delegation process/i);
  expect(element).toBeInTheDocument();
  await userEvent.click(screen.getByTestId("close-modal-button"));
  expect(handleCloseModal).toHaveBeenCalled();
});

test("Render DeregistrationProcessDescription modal", async () => {
  const handleCloseModal = jest.fn();
  render(<DeregistrationProcessDescription open={true} handleCloseModal={handleCloseModal} />);
  const element = screen.getByText(/The deregistration process/i);
  expect(element).toBeInTheDocument();
  await userEvent.click(screen.getByTestId("close-modal-button"));
  expect(handleCloseModal).toHaveBeenCalled();
});

test("Render RegistrationProcessDescription modal", async () => {
  const handleCloseModal = jest.fn();
  render(<RegistrationProcessDescription open={true} handleCloseModal={handleCloseModal} />);
  const element = screen.getByText(/The registration process/i);
  expect(element).toBeInTheDocument();
  await userEvent.click(screen.getByTestId("close-modal-button"));
  expect(handleCloseModal).toHaveBeenCalled();
});

test("Render RewardDistributionProcessDescription modal", async () => {
  const handleCloseModal = jest.fn();
  render(<RewardDistributionProcessDescription open={true} handleCloseModal={handleCloseModal} />);
  const element = screen.getByText(/The reward distribution process/i);
  expect(element).toBeInTheDocument();
  await userEvent.click(screen.getByTestId("close-modal-button"));
  expect(handleCloseModal).toHaveBeenCalled();
});

test("Render SPOInvolvementInDelegationDescription modal", async () => {
  const handleCloseModal = jest.fn();
  render(<SPOInvolvementInDelegationDescription open={true} handleCloseModal={handleCloseModal} />);
  const element = screen.getByText(/The SPO’s involvement in delegation/i);
  expect(element).toBeInTheDocument();
  await userEvent.click(screen.getByTestId("close-modal-button"));
  expect(handleCloseModal).toHaveBeenCalled();
});

test("Render WithdrawingFundProcessDescription modal", async () => {
  const handleCloseModal = jest.fn();
  render(<WithdrawingFundProcessDescription open={true} handleCloseModal={handleCloseModal} />);
  const element = screen.getByText(/The withdrawing funds process/i);
  expect(element).toBeInTheDocument();
  await userEvent.click(screen.getByTestId("close-modal-button"));
  expect(handleCloseModal).toHaveBeenCalled();
});
