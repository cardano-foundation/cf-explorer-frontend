import { screen } from "@testing-library/react";
import { render } from "src/test-utils";

import ReportComposerModal from ".";
test("should render ReportComposerModal", async () => {
  render(<ReportComposerModal open={true} handleCloseModal={jest.fn()} />);
  expect(screen.getByTestId("report-compose-modal")).toBeInTheDocument();
});
