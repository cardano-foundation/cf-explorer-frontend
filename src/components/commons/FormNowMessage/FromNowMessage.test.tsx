import moment from "moment";

import { render, screen } from "src/test-utils";

import FormNowMessage from ".";

describe("FromNowMessage comnponent", () => {
  it("should component render", () => {
    render(<FormNowMessage time={moment.now()} />);
    expect(screen.getByText(/last updated a few seconds ago/i)).toBeInTheDocument();
  });
});
