import moment from "moment";

import { render, screen } from "src/test-utils";

import CustomDatePicker, { ICustomDatePicker } from ".";

const mockProps: ICustomDatePicker = {
  dateRange: [new Date("2022-01-01"), new Date("2022-01-31")],
  setDateRange: jest.fn(),
  hideFuture: true
};

describe("CustomDatePicker component", () => {
  it("should component render placeholder", () => {
    render(<CustomDatePicker {...mockProps} dateRange={[null, null]} />);
    expect(screen.getByText("MM/DD/YYYY - MM/DD/YYYY")).toBeInTheDocument();
    expect(screen.getByText(/daterange\.svg/i)).toBeInTheDocument();
  });

  it("should component render", () => {
    render(<CustomDatePicker {...mockProps} />);
    const [startDate, endDate] = mockProps.dateRange;
    expect(
      screen.getByText(`${moment(startDate).format("MM/DD/YYYY")} - ${moment(endDate).format("MM/DD/YYYY")}`)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/close/i)).toBeInTheDocument();
  });
});
