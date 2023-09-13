import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { render } from "src/test-utils";

import { DelegationProcessDescription } from "./DelegationProcessDescription";
import { DeregistrationDelegatorProcessDescription } from "./DeregistrationDelegatorProcessDescription";
import { RegistrationDelegatorProcessDescription } from "./RegistrationDelegatorProcessDescription";
import { RewardDistributionProcessDescription } from "./RewardDistributionProcessDescription";
import { SPOInvolvementInDelegationDescription } from "./SPOInvolvementInDelegationDescription";
import { WithdrawingFundProcessDescription } from "./WithdrawingFundProcessDescription";
import { DeregistrationSPOProcessDescription } from "./DeregistrationSPOProcessDescription";
import { OperatorRewards } from "./OperatorRewards";
import { RegistrationSPOProcessDescription } from "./RegistrationSPOProcessDescription";

describe("ModalDescription", () => {
  it("Render DelegationProcessDescription modal", async () => {
    const handleCloseModal = jest.fn();
    render(<DelegationProcessDescription open={true} handleCloseModal={handleCloseModal} />);
    const element = screen.getByText("Delegation");
    expect(element).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("close-modal-button"));
    expect(handleCloseModal).toHaveBeenCalled();
  });

  it("Render DeregistrationDelegatorProcessDescription modal", async () => {
    const handleCloseModal = jest.fn();
    render(<DeregistrationDelegatorProcessDescription open={true} handleCloseModal={handleCloseModal} />);
    const element = screen.getByText("Deregistration");
    expect(element).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("close-modal-button"));
    expect(handleCloseModal).toHaveBeenCalled();
  });

  it("Render DeregistrationSPOProcessDescription modal", async () => {
    const handleCloseModal = jest.fn();
    render(<DeregistrationSPOProcessDescription open={true} handleCloseModal={handleCloseModal} />);
    const element = screen.getByText("Deregistration");
    expect(element).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("close-modal-button"));
    expect(handleCloseModal).toHaveBeenCalled();
  });

  it("Render OperatorRewards modal", async () => {
    const handleCloseModal = jest.fn();
    render(<OperatorRewards open={true} handleCloseModal={handleCloseModal} />);
    const element = screen.getByText(/Operator rewards/i);
    expect(element).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("close-modal-button"));
    expect(handleCloseModal).toHaveBeenCalled();
  });

  it("Render RegistrationDelegatorProcessDescription modal", async () => {
    const handleCloseModal = jest.fn();
    render(<RegistrationDelegatorProcessDescription open={true} handleCloseModal={handleCloseModal} />);
    const element = screen.getByText("Registration");
    expect(element).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("close-modal-button"));
    expect(handleCloseModal).toHaveBeenCalled();
  });

  it("Render RegistrationSPOProcessDescription modal", async () => {
    const handleCloseModal = jest.fn();
    render(<RegistrationSPOProcessDescription open={true} handleCloseModal={handleCloseModal} />);
    const element = screen.getByText("Registration");
    expect(element).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("close-modal-button"));
    expect(handleCloseModal).toHaveBeenCalled();
  });

  it("Render RewardDistributionProcessDescription modal", async () => {
    const handleCloseModal = jest.fn();
    render(<RewardDistributionProcessDescription open={true} handleCloseModal={handleCloseModal} />);
    const element = screen.getByText("Rewards distribution");
    expect(element).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("close-modal-button"));
    expect(handleCloseModal).toHaveBeenCalled();
  });

  it("Render SPOInvolvementInDelegationDescription modal", async () => {
    const handleCloseModal = jest.fn();
    render(<SPOInvolvementInDelegationDescription open={true} handleCloseModal={handleCloseModal} />);
    const element = screen.getByText(/Pool updates/i);
    expect(element).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("close-modal-button"));
    expect(handleCloseModal).toHaveBeenCalled();
  });

  it("Render WithdrawingFundProcessDescription modal", async () => {
    const handleCloseModal = jest.fn();
    render(<WithdrawingFundProcessDescription open={true} handleCloseModal={handleCloseModal} />);
    const element = screen.getByText("Reward withdrawal");
    expect(element).toBeInTheDocument();
    await userEvent.click(screen.getByTestId("close-modal-button"));
    expect(handleCloseModal).toHaveBeenCalled();
  });
});
