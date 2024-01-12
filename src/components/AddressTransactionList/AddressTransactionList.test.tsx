import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import * as helper from "src/commons/utils/helper";
import useFetchList from "src/commons/hooks/useFetchList";
import { fireEvent, render, screen } from "src/test-utils";
import { details } from "src/commons/routers";

import AddressTransactionList from ".";

const mockAddress =
  "addr1q94pfl4n0r9kdce4jsp5eanp8cyqyvtxw5nym4n2hs4rkakgnrd39mmm4wuzt9m8vvpl2tvfw4hc75q0tf2yv9vcyvsstm0fuv";

const mockData = {
  data: [
    {
      hash: "aee9e36ddbef6855db342ef93978bb636afa5105b05e669fd4d1ac7f780fdbc0",
      blockNo: 7972764,
      blockHash: "355c8a3cdbffc66509c48c40ecfb3b662ed4dee4b488c5f2d28fbb061f87bff9",
      epochNo: 373,
      epochSlotNo: 260574,
      slot: 76033374,
      time: "2022/11/04 22:07:45",
      addressesInput: [
        "addr1q8kl3hgagw90gh6p27gfunef0zcfyucdhcsqyq0ttvg60f6pzxceaupuyg04ft759k29yucngkf50zdxmj0rn8jjgmas8uptn4",
        "addr1qx5sntqjtgyxqhxrgk9tusxn4d4l779p6vupgnhcw8qng5jpzxceaupuyg04ft759k29yucngkf50zdxmj0rn8jjgmasdlampf",
        "addr1q88uycdjf3zj5vrl4qnx0t7ma85r8nctu323hqnck57wn32pzxceaupuyg04ft759k29yucngkf50zdxmj0rn8jjgmaswedh7a",
        "addr1q9hl9szmq9zd5v6d22pkvaw93vp6cqjxah0p20fqpd4c376pzxceaupuyg04ft759k29yucngkf50zdxmj0rn8jjgmaslf5qxj"
      ],
      addressesOutput: [
        "addr1q94pfl4n0r9kdce4jsp5eanp8cyqyvtxw5nym4n2hs4rkakgnrd39mmm4wuzt9m8vvpl2tvfw4hc75q0tf2yv9vcyvsstm0fuv"
      ],
      fee: 186885,
      totalOutput: 23753396,
      balance: 23753396,
      tokens: [
        {
          policy: "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a",
          name: "746f6d2e686f6c6c616e64",
          displayName: "tom.holland",
          fingerprint: "asset1zdsnkmxz30v4wscvr3srrj7884zgel3kjy7mrd",
          quantity: 1
        },
        {
          policy: "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a",
          name: "736c6576696e6b656c65767261",
          displayName: "slevinkelevra",
          fingerprint: "asset1xsekj6urf6mak6na660835ajzlyyxukp8wxh5s",
          quantity: 1
        },
        {
          policy: "f0ff48bbb7bbe9d59a40f1ce90e9e9d0ff5002ec48f232b49ca0fb9a",
          name: "7468652e676c656e6c69766574",
          displayName: "the.glenlivet",
          fingerprint: "asset1zqlas6eejpa650xye65af0lvv0gclcgwjdzf5g",
          quantity: 1
        }
      ]
    }
  ],
  total: 1,
  totalPage: 1,
  loading: false
};
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: ""
  })
}));

jest.spyOn(helper, "getPageInfo").mockReturnValue({ page: 0, size: 50, sort: "", retired: "" });

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: () => "132"
}));

jest.mock("src/commons/hooks/useFetchList");

describe("Address Transaction List test", () => {
  const mockUseFetchList = useFetchList as jest.Mock;
  beforeEach(() => {
    mockUseFetchList.mockReturnValue(mockData);
  });

  describe("Address Transaction List test UI", () => {
    beforeEach(() => {
      render(<AddressTransactionList address={mockAddress} />);
    });

    it("should component render", () => {
      expect(screen.getByText(/tx hash/i)).toBeInTheDocument();
      expect(screen.getByText(/created at/i)).toBeInTheDocument();
      expect(screen.getByText(/block/i)).toBeInTheDocument();
      expect(screen.getByText(/epoch/i)).toBeInTheDocument();

      expect(screen.getByRole("link", { name: "7972764" })).toBeInTheDocument();
    });

    // it("should fetch data", () => {
    //   expect(mockUseFetchList).toHaveBeenCalledTimes(1);
    // });
  });

  it("should component go to detail pages", () => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <AddressTransactionList address={mockAddress} />
      </Router>
    );
    fireEvent.click(screen.getByRole("link", { name: "7972764" }));
    expect(history.location.pathname).toBe(details.block("7972764"));
  });
});
