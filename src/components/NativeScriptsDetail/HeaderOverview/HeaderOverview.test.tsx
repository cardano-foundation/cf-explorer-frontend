import { render, screen } from "src/test-utils";

import HeaderOverview from ".";
const scriptHash = "1uxgxua350uepslksm2dnqeaym2f92qy82axr7p98mvaga4sy6w30e";
describe("HeaderOverview component", () => {
  it("should component render", () => {
    render(<HeaderOverview data={{ scriptHash }} />);
    expect(screen.getByText(/native script details/i)).toBeInTheDocument();
    expect(screen.getByText(/script hash:/i)).toBeInTheDocument();
  });
});
