import { render, screen } from "src/test-utils";

import ProtocolUpdate from ".";

const mockData = {
  oldValue: 0.5,
  value: 0.6,
  protocol: "protocol-name"
};

describe("ProtocolUpdate component", () => {
  it("should component render", () => {
    render(<ProtocolUpdate data={[mockData]} />);
    expect(screen.getByRole("columnheader", { name: /parameter name/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /previous value/i })).toBeInTheDocument();
    expect(screen.getByText(mockData.protocol)).toBeInTheDocument();
    expect(screen.getByText(mockData.value)).toBeInTheDocument();
    expect(screen.getByText(mockData.oldValue)).toBeInTheDocument();
  });
});
