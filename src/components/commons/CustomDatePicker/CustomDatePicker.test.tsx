import moment from "moment";

import { render, screen } from "src/test-utils";

import CustomDatePicker, { ICustomDatePicker } from ".";

const mockProps: ICustomDatePicker = {
  dateRange: [new Date("2022-01-01"), new Date("2022-01-31")],
  setDateRange: jest.fn(),
  hideFuture: true
};

describe("CustomDatePicker component", () => {
  it("should component render", () => {
    render(<CustomDatePicker {...mockProps} />);
    const [starDate, endDate] = mockProps.dateRange;
    expect(screen.getByText(moment(starDate).format("MM/DD/YYYY"))).toBeInTheDocument();
    expect(screen.getByText(moment(endDate).format("MM/DD/YYYY"))).toBeInTheDocument();
    expect(screen.getByText(/daterange\.svg/i)).toBeInTheDocument();
  });
});
