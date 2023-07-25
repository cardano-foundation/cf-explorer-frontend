import Router from "react-router";
import { cleanup, screen } from "@testing-library/react";

import { render } from "src/test-utils";
import { ListTabResponseSPO } from "src/pages/SPOLifecycle";

import SPOLifecycle from "..";

const tabConfig: ListTabResponseSPO = {
  isRegistration: true,
  isUpdate: true,
  isReward: true,
  isDeRegistration: true
};

describe("SPOLifecycle timeline view", () => {
  beforeEach(() => {
    jest.spyOn(Router, "useParams").mockReturnValue({ poolId: "123" });
  });
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should render Registration", () => {
    render(<SPOLifecycle currentStep={0} setCurrentStep={jest.fn()} renderTabsSPO={tabConfig} />);
    expect(screen.getByText("Deregistration")).toBeInTheDocument();
    expect(screen.getByText("Operator Rewards")).toBeInTheDocument();
    expect(screen.getByText("Next: Pool Updates")).toBeInTheDocument();
  });

  it("should render Pool Updates", () => {
    render(<SPOLifecycle currentStep={1} setCurrentStep={jest.fn()} renderTabsSPO={tabConfig} />);
    expect(screen.getByText("Next: Operator Rewards")).toBeInTheDocument();
  });

  it("should render Operator Rewards", () => {
    render(<SPOLifecycle currentStep={2} setCurrentStep={jest.fn()} renderTabsSPO={tabConfig} />);
    expect(screen.getByText("Previous: Pool Updates")).toBeInTheDocument();
    expect(screen.getByText("Next: Deregistration")).toBeInTheDocument();
  });

  it("should render Deregistration", () => {
    render(<SPOLifecycle currentStep={3} setCurrentStep={jest.fn()} renderTabsSPO={tabConfig} />);
    expect(screen.getByText("Previous: Operator Rewards")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /View in tabular/i })).toBeInTheDocument();
  });
});
