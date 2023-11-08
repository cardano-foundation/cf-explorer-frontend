import { screen } from "@testing-library/react";
import Router from "react-router";

import { render } from "src/test-utils";

import DelegatorLifecycle from ".";

const tabConfig: ListStakeKeyResponse = {
  hasDeRegistration: true,
  hasDelegation: true,
  hasRegistration: true,
  hasWithdrawal: true,
  hashRewards: true,
  totalDelegatorRewards: true,
  totalOperatorRewards: true
};

describe("DelegatorLifecycle timeline view", () => {
  beforeEach(() => {
    jest.spyOn(Router, "useParams").mockReturnValue({ stakeId: "123" });
  });

  it("should render Registration", () => {
    render(<DelegatorLifecycle currentStep={0} setCurrentStep={jest.fn()} tabsRenderConfig={tabConfig} />);
    expect(screen.getByText(/Rewards Distribution/i)).toBeInTheDocument();
    expect(screen.getByText("Rewards Withdrawal")).toBeInTheDocument();
    expect(screen.getByText("Next: Delegation")).toBeInTheDocument();
  });

  it("should render Delegation", () => {
    render(<DelegatorLifecycle currentStep={1} setCurrentStep={jest.fn()} tabsRenderConfig={tabConfig} />);
    expect(screen.getByText("Previous: Registration")).toBeInTheDocument();
    expect(screen.getByText("Next: Rewards Distribution")).toBeInTheDocument();
  });

  it("should render Rewards Distribution", () => {
    render(<DelegatorLifecycle currentStep={2} setCurrentStep={jest.fn()} tabsRenderConfig={tabConfig} />);
    expect(screen.getByText("Previous: Delegation")).toBeInTheDocument();
    expect(screen.getByText("Next: Rewards Withdrawal")).toBeInTheDocument();
  });

  it("should render Rewards Withdrawal", () => {
    render(<DelegatorLifecycle currentStep={3} setCurrentStep={jest.fn()} tabsRenderConfig={tabConfig} />);
    expect(screen.getByText("Previous: Rewards Distribution")).toBeInTheDocument();
    expect(screen.getByText("Next: Deregistration")).toBeInTheDocument();
  });

  it("should render Deregistration", () => {
    render(<DelegatorLifecycle currentStep={4} setCurrentStep={jest.fn()} tabsRenderConfig={tabConfig} />);
    expect(screen.getByText(/Previous: Rewards Withdrawal/i)).toBeInTheDocument();
  });
});
