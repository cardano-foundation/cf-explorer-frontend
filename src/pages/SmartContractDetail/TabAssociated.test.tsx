import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";

import { render } from "src/test-utils";

import TabAssociated from "./TabAssociated";

describe("ContractTabs", () => {
  it("should render component", () => {
    render(<TabAssociated setVersion={jest.fn()} />);
    expect(screen.getAllByText(/Associated Addresses/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Associated Addresses/)[0]).toBeInTheDocument();
  });
});
