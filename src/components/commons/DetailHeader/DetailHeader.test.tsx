import { useHistory } from "react-router-dom";

import { render, screen } from "src/test-utils";
import { TRANSACTION_STATUS } from "src/commons/utils/constants";

import DetailHeader, { DetailHeaderProps } from ".";

const mockProps: DetailHeaderProps = {
  type: "BLOCK",
  bookmarkData: "bookmarkData123",
  loading: false,
  title: "Example Title",
  lastUpdated: 1625272628000,
  hash: "hash123",
  transactionStatus: TRANSACTION_STATUS.SUCCESS,
  stakeKeyStatus: "ACTIVE",
  epoch: {
    no: 1,
    slot: 100,
    status: "IN_PROGRESS",
    endTime: "2023-07-03T12:34:56Z"
  },
  listItem: [
    {
      icon: "icon1.png",
      title: "Item 1",
      value: "Value 1",
      allowSearch: true,
      dataSearch: ["data1", "data2"],
      isSent: true,
      key: "key1",
      hideHeader: false
    },
    {
      title: "Item 2",
      value: "Value 2",
      allowSearch: false,
      dataSearch: [],
      isSent: false,
      key: "key2",
      hideHeader: true
    }
  ],
  isHideButtonBack: true
};

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: jest.fn()
}));

const onGoBack = jest.fn();

describe("DetailHeader component", () => {
  beforeEach(() => {
    (useHistory as jest.Mock).mockReturnValue({
      goBack: onGoBack,
      push: jest.fn()
    });
  });
  it("should component render", () => {
    render(<DetailHeader {...mockProps} />);
    const status = screen.getByText(/success/i);
    const title = screen.getByText(/example title/i);
    expect(status).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  it("should component loading", () => {
    render(<DetailHeader {...mockProps} loading={true} isHideButtonBack={false} />);
    const status = screen.queryByText(/success/i);
    expect(status).not.toBeInTheDocument();
  });
});