import { fireEvent, render, screen } from "src/test-utils";
import useFetchList from "src/commons/hooks/useFetchList";
import { getShortWallet } from "src/commons/utils/helper";

import ModalAllAddress from ".";

const mockProps = {
  open: true,
  onClose: jest.fn(),
  stake: "1000"
};

const mockData = {
  address: "0x123456789abcdef",
  balance: 1000
};
jest.mock("src/commons/hooks/useFetchList");

describe("ModalAllAddress component", () => {
  beforeEach(() => {
    (useFetchList as jest.Mock).mockReturnValue({ data: [mockData] });
  });

  it("should component render", () => {
    render(<ModalAllAddress {...mockProps} />);
    expect(screen.getByText(/addresses list/i)).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /addresses/i })).toBeInTheDocument();
    expect(screen.getByText(getShortWallet(mockData.address))).toBeInTheDocument();
  });

  it("should modal close", () => {
    render(<ModalAllAddress {...mockProps} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockProps.onClose).toBeCalled();
  });
});
