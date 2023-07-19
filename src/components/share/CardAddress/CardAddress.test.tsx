import { render, screen } from "src/test-utils";

import CardAddress, { DetailCardProps } from ".";

const mockProps: DetailCardProps = {
  title: "Sample Title",
  address: "0x123456789abcdef",
  item: [
    { title: "Item 1", value: "Value 1" },
    { title: "Item 2", value: "Value 2" }
  ],
  type: "left",
  loading: false,
  addressDestination: "0x987654321fedcba"
};

describe("CardAddress", () => {
  it("should component render", () => {
    render(<CardAddress {...mockProps} />);
    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.address)).toBeInTheDocument();
    expect(screen.getByText(/item 1/i)).toBeInTheDocument();
    expect(screen.getByText(/value 1/i)).toBeInTheDocument();
  });

  it("should component render empty state", () => {
    render(<CardAddress {...mockProps} address="" type="right" />);
    expect(screen.getByRole("img", { name: /icon/i })).toBeInTheDocument();
  });
});
