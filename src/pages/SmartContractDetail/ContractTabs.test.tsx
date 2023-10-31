import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";

import { render } from "src/test-utils";

import ContractTabs from "./ContractTabs";

describe("ContractTabs", () => {
  it("should render component", () => {
    render(<ContractTabs setVersion={jest.fn()} />);
    expect(screen.getAllByText(/Associated Addresses/)[0]).toBeInTheDocument();
  });
});
