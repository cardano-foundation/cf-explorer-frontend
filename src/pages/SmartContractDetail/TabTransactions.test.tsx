import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";

import { render } from "src/test-utils";

import TabTransactions from "./TabTransactions";

describe("ContractTabs", () => {
  it("should render component", () => {
    render(<TabTransactions />);
    expect(screen.getByTestId(/TabTransactions/)).toBeInTheDocument();
  });
});
