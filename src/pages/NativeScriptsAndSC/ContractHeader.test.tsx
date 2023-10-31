import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";

import { render } from "src/test-utils";

import ContractHeader from "./ContractHeader";

describe("ContractHeader", () => {
  it("should render header page", () => {
    render(<ContractHeader />);
    expect(screen.getByText(/Native Scripts & Smart Contracts/)).toBeInTheDocument();
  });
});
