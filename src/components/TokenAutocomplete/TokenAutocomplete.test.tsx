import { fireEvent, render, screen } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";

import TokenAutocomplete from ".";
const mockToken = {
  address: "0x123456789abcdef",
  name: "Token",
  displayName: "Token Display",
  fingerprint: "ABCDEF",
  quantity: 1000,
  metadata: {
    policy: "Token Policy",
    logo: "https://example.com/token-logo.png",
    decimals: 18,
    description: "Token Description",
    ticker: "TKN",
    url: "https://example.com/token-website"
  }
};

jest.mock("src/commons/hooks/useFetchList");

describe("TokenAutocomplete component", () => {
  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({
      data: [mockToken],
      loading: false,
      total: 1
    });
  });
  it("should component render", () => {
    render(<TokenAutocomplete address="x23dxxfdd312hgc" />);
    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /open/i })).toBeInTheDocument();
  });

  it("should dropdown open", () => {
    render(<TokenAutocomplete address="x23dxxfdd312hgc" />);
    fireEvent.click(screen.getByRole("button", { name: /open/i }));
    expect(screen.getByText(/token display/i)).toBeInTheDocument();
  });
});
