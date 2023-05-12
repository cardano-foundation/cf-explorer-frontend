import { cleanup, screen } from "@testing-library/react";
import Router from "react-router";
import SPOLifecycle from ".";
import { render } from "../../../test-utils";

describe("SPOLifecycle timeline view", () => {
  beforeEach(() => {
    jest.spyOn(Router, "useParams").mockReturnValue({ poolId: "123" });
  });
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should render Registration", () => {
    render(
      <SPOLifecycle
        handleResize={jest.fn()}
        containerPosition={{ top: undefined, left: undefined }}
        currentStep={0}
        setCurrentStep={jest.fn()}
      />
    );
    expect(screen.getByText("Deregistration")).toBeInTheDocument();
    expect(screen.getByText("Operator Rewards")).toBeInTheDocument();
    expect(screen.getByText("Next Step: Pool Updates")).toBeInTheDocument();
  });

  it("should render Pool Updates", () => {
    render(
      <SPOLifecycle
        handleResize={jest.fn()}
        containerPosition={{ top: undefined, left: undefined }}
        currentStep={1}
        setCurrentStep={jest.fn()}
      />
    );
    expect(screen.getByText("Next Step: Operator Rewards")).toBeInTheDocument();
  });

  it("should render Operator Rewards", () => {
    render(
      <SPOLifecycle
        handleResize={jest.fn()}
        containerPosition={{ top: undefined, left: undefined }}
        currentStep={2}
        setCurrentStep={jest.fn()}
      />
    );
    expect(screen.getByText("Previous: Pool Updates")).toBeInTheDocument();
    expect(screen.getByText("Next Step: Deregistration")).toBeInTheDocument();
  });

  it("should render Deregistration", () => {
    render(
      <SPOLifecycle
        handleResize={jest.fn()}
        containerPosition={{ top: undefined, left: undefined }}
        currentStep={3}
        setCurrentStep={jest.fn()}
      />
    );
    expect(screen.getByText("Previous: Operator Rewards")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /View in tabular/i })).toBeInTheDocument();
  });
});
