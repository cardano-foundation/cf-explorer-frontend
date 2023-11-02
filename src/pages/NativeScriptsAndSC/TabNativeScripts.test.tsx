import "@testing-library/jest-dom/extend-expect";
import { screen } from "@testing-library/react";

import { render } from "src/test-utils";

import TabNativeScripts from "./TabNativeScripts";

describe("TabNativeScripts", () => {
  it("should component render", () => {
    render(<TabNativeScripts />);
    expect(screen.getByTestId(/TabNativeScripts/)).toBeInTheDocument();
  });
});
