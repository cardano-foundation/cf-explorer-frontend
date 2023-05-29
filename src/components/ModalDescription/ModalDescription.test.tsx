import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DelegationProcessDescription } from "./DelegationProcessDescription";
import { DeregistrationDelegatorProcessDescription } from "./DeregistrationDelegatorProcessDescription";
import { RegistrationDelegatorProcessDescription } from "./RegistrationDelegatorProcessDescription";
import { RewardDistributionProcessDescription } from "./RewardDistributionProcessDescription";
import { SPOInvolvementInDelegationDescription } from "./SPOInvolvementInDelegationDescription";
import { WithdrawingFundProcessDescription } from "./WithdrawingFundProcessDescription";

describe("ModalDescription", () => {
  it("Render DelegationProcessDescription modal", async () => {
    const handleCloseModal = jest.fn();
    render(<DelegationProcessDescription open={true} handleCloseModal={handleCloseModal} />);
    const element = screen.getByText(/The delegation process/i);
    expect(element).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("close-modal-button"));
    expect(handleCloseModal).toHaveBeenCalled();
  });

  it("Render DeregistrationDelegatorProcessDescription modal", async () => {
    const handleCloseModal = jest.fn();
    render(<DeregistrationDelegatorProcessDescription open={true} handleCloseModal={handleCloseModal} />);
    const element = screen.getByText(/The deregistration process/i);
    expect(element).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("close-modal-button"));
    expect(handleCloseModal).toHaveBeenCalled();
  });

  it("Render RegistrationProcessDescription modal", async () => {
    const handleCloseModal = jest.fn();
    render(<RegistrationDelegatorProcessDescription open={true} handleCloseModal={handleCloseModal} />);
    const element = screen.getByText(/The registration process/i);
    expect(element).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("close-modal-button"));
    expect(handleCloseModal).toHaveBeenCalled();
  });

  it("Render RewardDistributionProcessDescription modal", async () => {
    const handleCloseModal = jest.fn();
    render(<RewardDistributionProcessDescription open={true} handleCloseModal={handleCloseModal} />);
    const element = screen.getByText(/The reward distribution process/i);
    expect(element).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("close-modal-button"));
    expect(handleCloseModal).toHaveBeenCalled();
  });

  it("Render SPOInvolvementInDelegationDescription modal", async () => {
    const handleCloseModal = jest.fn();
    render(<SPOInvolvementInDelegationDescription open={true} handleCloseModal={handleCloseModal} />);
    const element = screen.getByText(/The SPO’s involvement in delegation/i);
    expect(element).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("close-modal-button"));
    expect(handleCloseModal).toHaveBeenCalled();
  });

  it("Render WithdrawingFundProcessDescription modal", async () => {
    const handleCloseModal = jest.fn();
    render(<WithdrawingFundProcessDescription open={true} handleCloseModal={handleCloseModal} />);
    const element = screen.getByText(/The withdrawing funds process/i);
    expect(element).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("close-modal-button"));
    expect(handleCloseModal).toHaveBeenCalled();
  });
});
