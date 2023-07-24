import { render, screen } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";

import InstantReards from ".";

const contract: Contracts = {
  address: "0x0123456789abcdef",
  txCount: 100,
  balance: 5000
};

jest.mock("src/commons/hooks/useFetchList");

describe("InstantRewards page", () => {
  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({ data: [contract], total: 1 });
  });
  it("should component render", () => {
    render(<InstantReards />);
    expect(screen.getByRole("heading", { name: /instantaneous rewards/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /tx hash/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /created at/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /block/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /stake address/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /rewards paid/i })).toBeInTheDocument();
  });
});
