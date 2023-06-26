import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useTheme } from "@mui/material";
import userEvent from "@testing-library/user-event";
import { waitFor } from "@testing-library/react";

import themes from "src/themes";
import { fireEvent, render, screen } from "src/test-utils";

import FilledInfoModal, { EVENTS_NAME, ReportType } from "./FilledInfoModal";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn()
}));

jest.mock("@mui/material", () => ({
  ...jest.requireActual("@mui/material"),
  useTheme: jest.fn()
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn(),
  useParams: jest.fn()
}));

const mockedUseSelector = useSelector as jest.Mock;
const mockedHistory = useHistory as jest.Mock;
const mockedUseParams = useParams as jest.Mock;

describe("FilledInfoModal", () => {
  beforeEach(() => {
    mockedUseSelector.mockReturnValue({ currentEpoch: { no: 50 } });
    mockedHistory.mockReturnValue({ location: { pathname: "/sample-path" } });
    mockedUseParams.mockReturnValue({ poolId: "sample-pool-id", stakeId: "sample-stake-id" });
    const mockedUseTheme = useTheme as jest.Mock;
    mockedUseTheme.mockReturnValue(themes.light);
  });

  it("renders without errors", () => {
    render(<FilledInfoModal open={true} handleCloseModal={jest.fn()} saveParams={jest.fn()} gotoStep={jest.fn()} />);
    expect(screen.getByText("Report composer")).toBeInTheDocument();
  });

  it("triggers handleSubmit when Next button is clicked", async () => {
    const saveParams = jest.fn();
    const gotoStep = jest.fn();
    render(<FilledInfoModal open={true} handleCloseModal={jest.fn()} saveParams={saveParams} gotoStep={gotoStep} />);

    const nextButton = screen.getByText(/next/i);
    const reportNameInput = screen.getByPlaceholderText("Enter report name");
    const allEventsButton = screen.getByRole("button", { name: /all/i });

    await userEvent.click(screen.getByText(/yes/i));
    await userEvent.type(reportNameInput, "test-reportname");
    await userEvent.click(allEventsButton);
    await userEvent.click(nextButton);
    await waitFor(() => {
      expect(saveParams).toHaveBeenCalledTimes(1);
      expect(gotoStep).toHaveBeenCalledTimes(1);
      expect(gotoStep).toHaveBeenCalledWith(2);
    });
  });

  it("updates the report name when input value changes", () => {
    render(<FilledInfoModal open={true} handleCloseModal={jest.fn()} saveParams={jest.fn()} gotoStep={jest.fn()} />);

    const reportNameInput = screen.getByPlaceholderText<HTMLInputElement>("Enter report name");
    fireEvent.change(reportNameInput, { target: { value: "My Report" } });

    expect(reportNameInput.value).toBe("My Report");
  });

  it("selects ADA transfers option and updates the state", () => {
    render(<FilledInfoModal open={true} handleCloseModal={jest.fn()} saveParams={jest.fn()} gotoStep={jest.fn()} />);

    const adaTransfersYesRadio = screen.getByLabelText<HTMLInputElement>("Yes");
    fireEvent.click(adaTransfersYesRadio);

    expect(adaTransfersYesRadio.checked).toBe(true);
  });

  it("selects all events and updates the state", () => {
    render(<FilledInfoModal open={true} handleCloseModal={jest.fn()} saveParams={jest.fn()} gotoStep={jest.fn()} />);

    const allEventsButton = screen.getByRole("button", { name: /all/i });
    fireEvent.click(allEventsButton);
    const events = EVENTS_NAME.filter((event) => {
      return event.type === ReportType.StakeKeyReport;
    });
    const eventEls = [];
    events.forEach((event) => {
      const currentEvent = screen.queryByText(event.label);
      eventEls.push(currentEvent);
    });
    expect(eventEls.length).toEqual(events.length);
  });
});
