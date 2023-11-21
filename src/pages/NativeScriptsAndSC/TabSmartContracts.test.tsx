import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";

import { render } from "src/test-utils";

import TabSmartContracts from "./TabSmartContracts";

describe("TabSmartContracts", () => {
  it("should component render", () => {
    render(<TabSmartContracts />);
    expect(screen.getByTestId(/TabSmartContracts/)).toBeInTheDocument();
  });
});
