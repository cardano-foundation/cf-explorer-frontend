import { render, screen } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";

import PoollUpdates from ".";

jest.mock("src/commons/hooks/useFetchList");

describe("PoolUpdates component", () => {
  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({ data: [] });
  });
  it("should component render", () => {
    render(<PoollUpdates />);
    const filterIC = screen.getByRole("button", {
      name: /filter/i
    });
    expect(screen.getByText(/recent updates/i)).toBeInTheDocument();
    expect(filterIC).toBeInTheDocument();
  });
});
