import { screen } from "@testing-library/react";
import Router from "react-router";
import DelegatorLifecycle from ".";
import { render } from "../../../test-utils";

describe("DelegatorLifecycle timeline view", () => {
  beforeEach(() => {
    jest.spyOn(Router, "useParams").mockReturnValue({ stakeId: "123" });
  });

  it("should render Registration", () => {
    render(
      <DelegatorLifecycle
        handleResize={jest.fn()}
        containerPosition={{ top: undefined, left: undefined }}
        currentStep={0}
        setCurrentStep={jest.fn()}
      />
    );
    expect(screen.getByText("Rewards Distribution")).toBeInTheDocument();
    expect(screen.getByText("Rewards Withdrawal")).toBeInTheDocument();
    expect(screen.getByText("Next: Delegation")).toBeInTheDocument();
  });

  it("should render Delegation", () => {
    render(
      <DelegatorLifecycle
        handleResize={jest.fn()}
        containerPosition={{ top: undefined, left: undefined }}
        currentStep={1}
        setCurrentStep={jest.fn()}
      />
    );
    expect(screen.getByText("Previous: Registration")).toBeInTheDocument();
    expect(screen.getByText("Next: Rewards Distribution")).toBeInTheDocument();
  });

  it("should render Rewards Distribution", () => {
    render(
      <DelegatorLifecycle
        handleResize={jest.fn()}
        containerPosition={{ top: undefined, left: undefined }}
        currentStep={2}
        setCurrentStep={jest.fn()}
      />
    );
    expect(screen.getByText("Previous: Delegation")).toBeInTheDocument();
    expect(screen.getByText("Next: Rewards Withdrawal")).toBeInTheDocument();
  });

  it("should render Rewards Withdrawal", () => {
    render(
      <DelegatorLifecycle
        handleResize={jest.fn()}
        containerPosition={{ top: undefined, left: undefined }}
        currentStep={3}
        setCurrentStep={jest.fn()}
      />
    );
    expect(screen.getByText("Previous: Rewards Distribution")).toBeInTheDocument();
    expect(screen.getByText("Next: Deregistration")).toBeInTheDocument();
  });

  it("should render Deregistration", () => {
    render(
      <DelegatorLifecycle
        handleResize={jest.fn()}
        containerPosition={{ top: undefined, left: undefined }}
        currentStep={4}
        setCurrentStep={jest.fn()}
      />
    );
    expect(screen.getByText("Previous: Rewards Withdrawal")).toBeInTheDocument();
  });
});
