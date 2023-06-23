import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { render } from "src/test-utils";

import StepReviewModal from "./StepReviewModal";

describe("StepReviewModal", () => {
  test("should render with correct data", () => {
    const mockHandleCloseModal = jest.fn();
    const mockGotoStep = jest.fn();

    const params = {
      reportName: "Test Report",
      dateRange: ["2023-06-01", "2023-06-10"],
      epochRange: ["50", "60"],
      address: "test-address",
      poolSize: "YES",
      adaTransfers: "NO",
      eventsKey: ["REGISTRATION", "REWARDS"],
      reportType: "PoolReport"
    };

    render(
      <StepReviewModal open={true} handleCloseModal={mockHandleCloseModal} params={params} gotoStep={mockGotoStep} />
    );

    const reportName = screen.getByText(/test report/i);
    const epochRange = screen.getByText("06/01/2023 - 06/10/2023");
    const addressDetails = screen.getByText("test-address");
    const poolSize = screen.getByText("NO");
    const poolReportByEvent = screen.getByText("Registration, Rewards");

    expect(reportName).toBeInTheDocument();
    expect(epochRange).toBeInTheDocument();
    expect(addressDetails).toBeInTheDocument();
    expect(poolSize).toBeInTheDocument();
    expect(poolReportByEvent).toBeInTheDocument();

    const backButton = screen.getByText("I’d like to double-check");

    userEvent.click(backButton);
    expect(mockGotoStep).toHaveBeenCalledWith(1);
  });
});
