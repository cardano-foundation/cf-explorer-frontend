import { fireEvent, screen } from "@testing-library/react";
import { render } from "src/test-utils";

import ReportComposerModal from ".";
describe("should render ReportComposerModal", () => {
  it("should render ReportComposerModal", () => {
    render(<ReportComposerModal open={true} handleCloseModal={jest.fn()} />);
    expect(screen.getByTestId("report-compose-modal")).toBeInTheDocument();
  });
  it("should available input", () => {
    render(<ReportComposerModal open={true} handleCloseModal={jest.fn()} />);
    const nameInput = screen.getByPlaceholderText("Enter report name");
    const epochRangeInput = screen.getByTestId('slider');
    const checkbox = screen.getByTestId("radio-group-report");
    const selectArea = screen.getByText("Pool Report by event");
    expect(nameInput).toBeInTheDocument();
    expect(epochRangeInput).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(selectArea).toBeInTheDocument();
  });
});
