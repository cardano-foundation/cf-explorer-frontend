import { render, screen } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";

import PoollUpdates from ".";

const mockData = [
  {
    fee: 200525,
    margin: 0.015,
    poolHold: null,
    poolUpdateId: 28763,
    time: "2022/09/13 09:10:10",
    txHash: "5b17fedf8780cb9b66d14acaae02146e9cc1cd39384f970f7879e8fa49ddc180"
  }
];
jest.mock("src/commons/hooks/useFetchList");

describe("PoolUpdates component", () => {
  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({ data: mockData });
  });
  it("should component render", () => {
    render(<PoollUpdates />);
    const filterIC = screen.getByRole("button", {
      name: /filter-ic.svg filter/i
    });
    expect(screen.getByText(/recent updates/i)).toBeInTheDocument();
    expect(filterIC).toBeInTheDocument();
  });
});
