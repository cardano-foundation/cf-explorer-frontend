import { render, screen } from "src/test-utils";

import DropdownTokens, { IDropdownTokens } from ".";

const mockProps: IDropdownTokens = {
  tokens: [
    {
      assetName: "Token Name",
      assetQuantity: 1000,
      assetId: "token-id-123",
      policy: {
        policyId: "policy-id-123",
        totalToken: 5000,
        policyScript: "policy-script-123"
      },
      metadata: {
        decimals: 6,
        description: "Token Description",
        logo: "logo-url",
        ticker: "TKN",
        url: "website-url"
      }
    }
  ],
  type: "down",
  hideInputLabel: false,
  hideMathChar: false
};

describe("DropdownTokens component", () => {
  it("should component render", () => {
    render(<DropdownTokens {...mockProps} />);
    expect(screen.getByRole("textbox", { hidden: true })).toBeInTheDocument();
    expect((screen.getByRole("textbox", { hidden: true }) as HTMLInputElement).value).toBe("default");
  });
});
