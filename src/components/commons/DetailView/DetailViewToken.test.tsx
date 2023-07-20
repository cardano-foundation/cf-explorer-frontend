import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import { act, render, screen } from "src/test-utils";
import { details } from "src/commons/routers";
import useFetch from "src/commons/hooks/useFetch";

import DetailViewToken from "./DetailViewToken";

const mockToken: IToken = {
  name: "Token Name",
  displayName: "Token Display Name",
  policy: "Token Policy",
  fingerprint: "Token Fingerprint",
  txCount: 10,
  supply: 1000,
  createdOn: "2023-07-03T12:34:56Z",
  metadata: {
    policy: "Token Metadata Policy",
    logo: "Token Metadata Logo",
    decimals: 6,
    description: "Token Metadata Description",
    ticker: "Token Metadata Ticker",
    url: "Token Metadata URL"
  },
  volumeIn24h: 500,
  totalVolume: "10000",
  numberOfHolders: 50,
  tokenType: "Token Type",
  tokenLastActivity: "2023-07-03T12:34:56Z",
  metadataJson: "Token Metadata JSON"
};

const mockTokenId = "1123KCCTSFD";

jest.mock("src/commons/hooks/useFetch");

describe("DetailViewToken component", () => {
  beforeEach(() => {
    (useFetch as jest.Mock).mockReturnValue({
      data: mockToken
    });
  });

  it("should component render", () => {
    render(<DetailViewToken handleClose={jest.fn()} token={mockToken} tokenId={mockTokenId} />);
    expect(screen.getByText(/token metadata description/i)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /policy script/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /top holders/i })).toBeInTheDocument();
  });

  it("should component go to detail pages", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <DetailViewToken handleClose={jest.fn()} token={mockToken} tokenId={mockTokenId} />
      </Router>
    );
    act(() => {
      userEvent.click(screen.getByRole("link", { name: /view details/i }));
    });
    expect(history.location.pathname).toBe(details.token(mockTokenId));
  });
});
