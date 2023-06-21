import { render, fireEvent } from "src/test-utils";

import Delegation, { DelegationTimeline } from "./index";

describe("Delegation", () => {
  it("should render the component", () => {
    const { getByText } = render(<Delegation />);
    expect(getByText("Recent Delegations")).toBeInTheDocument();
  });
});

describe("DelegationTimeline", () => {
  const selectedDelegation = {
    txHash: "1234567890",
    outSum: 1000,
    fee: 10,
    time: "2023-06-13T10:00:00"
  };
  it("should render the component", () => {
    const { getByText } = render(<DelegationTimeline selected={selectedDelegation} />);
    expect(getByText(/delegation certificate/i)).toBeInTheDocument();
  });

  it("should open and close the certificate modal", () => {
    const { getByText, getByTestId, getAllByText } = render(<DelegationTimeline selected={selectedDelegation} />);

    const openModalButton = getByText(/delegation certificate/i);
    fireEvent.click(openModalButton);
    const modals = getAllByText(/delegation certificate/i);
    expect(modals.length).toBeGreaterThanOrEqual(2);
    const closeModalButton = getByTestId("close-modal-button");
    fireEvent.click(closeModalButton);
    const modalAfterClickings = getAllByText(/delegation certificate/i);

    expect(modalAfterClickings.length).not.toBeGreaterThanOrEqual(2);
  });
});
