import { screen } from "@testing-library/react";
import ReportComposerModal from ".";
import { render } from "../../../../test-utils";

test("should render ReportComposerModal", async () => {
  render(<ReportComposerModal open={true} handleCloseModal={jest.fn()} />);
  expect(screen.getByTestId("steps-modal")).toBeInTheDocument();
});
