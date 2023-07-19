import moment from "moment";
import userEvent from "@testing-library/user-event";

import { render, screen, waitFor } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";
import { getShortWallet } from "src/commons/utils/helper";

import Bookmark from "./index";

const mockedData = [
  {
    keyword: "addr1q8xvyu3y4zzhffmmtw90f5z9hncvhqfh4s3hc89ga9rl974amhyfskfrgs4wrhvc9cpu6633d5adj9pw7qq6v3qmjkxspq2rlf",
    network: "MAIN_NET",
    type: "BLOCK",
    createdDate: "12/12/2012 00:00:00",
    id: "addr1q8xvyu3y4zzhffmmtw90f5z9hncvhqfh4s3hc89ga9rl974amhyfskfrgs4wrhvc9cpu6633d5adj9pw7qq6v3qmjkxspq2rlf",
    urlPage: "/test"
  }
];

jest.mock("src/commons/hooks/useFetchList");

describe("Bookmark compenent", () => {
  beforeEach(() => {
    const mockedUseFetchList = useFetchList as jest.Mock;
    mockedUseFetchList.mockReturnValue({ data: mockedData, loading: false, refresh: false, error: false, total: 0 });
  });

  it("rendering component on PC", () => {
    render(<Bookmark />);
    const utcDate = moment("12/12/2012 00:00:00").utc().format("MM/DD/YYYY HH:mm:ss");

    expect(screen.getByText(getShortWallet(mockedData[0].keyword))).toBeInTheDocument();
    expect(screen.getByText(utcDate)).toBeInTheDocument();
  });

  it("checking all tabs was rendered", () => {
    render(<Bookmark />);
    expect(screen.getByRole("tab", { name: /address/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /transaction/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /block/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /epoch/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /pool/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /stake address/i })).toBeInTheDocument();
  });

  it("checking dialog open", async () => {
    render(<Bookmark />);

    const button = screen.getByTestId("action-button");

    await userEvent.click(button);
    await waitFor(() => {
      expect(screen.getByText(/confirmation required/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
    });
  });
});
