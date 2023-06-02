import { screen } from "@testing-library/react";
import ReportComposerModal from ".";
import { render } from "src/test-utils";

test("should render ReportComposerModal", async () => {
  render(<ReportComposerModal open={true} handleCloseModal={jest.fn()} />);
  expect(screen.getByTestId("report-compose-modal")).toBeInTheDocument();
});
