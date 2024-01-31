import { render, screen } from "src/test-utils";

import Metadata from ".";

const metaData = [
  { label: 1, value: "First Metadata", metadataCIP20: {}, metadataCIP25: {}, metadataCIP60: {}, metadataCIP83: {} }
];

describe("Metadata component", () => {
  it("should component render", () => {
    render(<Metadata data={metaData} hash="tx0023131hash33x" />);
    expect(screen.getByText(/metadata hash/i)).toBeInTheDocument();
    expect(screen.getByText(/tx002/i)).toBeInTheDocument();
    expect(screen.getByText(/metadatum label/i)).toBeInTheDocument();
  });
});
