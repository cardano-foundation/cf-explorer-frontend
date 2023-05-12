import { cleanup, screen, fireEvent, waitFor } from "@testing-library/react";
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
        setMode={jest.fn()}
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
        setMode={jest.fn()}
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
        setMode={jest.fn()}
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
        setMode={jest.fn()}
        currentStep={3}
        setCurrentStep={jest.fn()}
      />
    );
    expect(screen.getByText("Previous: Operator Rewards")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /View in tabular/i })).toBeInTheDocument();
  });

  it("should clickable and show tabular view", async () => {
    const mockSetMode = jest.fn()
    render(
      <SPOLifecycle
        handleResize={jest.fn()}
        containerPosition={{ top: undefined, left: undefined }}
        setMode={mockSetMode}
        currentStep={3}
        setCurrentStep={jest.fn()}
      />
    );
    const buttonTabularMode = screen.getByRole("button", { name: /View in tabular/i });
    await fireEvent.click(buttonTabularMode);
    expect(mockSetMode).toBeCalled();
  });
});
