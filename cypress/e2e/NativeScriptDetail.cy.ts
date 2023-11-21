const scriptHash = "6cbfab6e294c4616de42fce9616909ffcecdae584c293ce233627da6";
describe("Native Script Details", () => {
  it("should the page render", () => {
    cy.visit(`en/native-script/${scriptHash}`);
    cy.get("p").contains("Native Script Details", { matchCase: false });
    cy.get(`[data-testid="ellipsis-text"]`).contains(scriptHash.slice(-10));
    cy.get("button").contains("Verify Script", { matchCase: false });
    cy.get(".MuiAccordionSummary-content").contains("Script", { matchCase: false });
    cy.get(".MuiAccordionSummary-content").contains("Token", { matchCase: false });
    cy.get(".MuiAccordionSummary-content").contains("Asset Holders", { matchCase: false });
  });

  it("should the script tab render", () => {
    cy.visit(`en/native-script/${scriptHash}`);
    cy.get("p").contains("Native Script Details", { matchCase: false });
    cy.get(`[data-testid="ellipsis-text"]`).contains(scriptHash.slice(-10));
    cy.get("button").contains("Verify Script", { matchCase: false });
    cy.get(".MuiAccordionSummary-content").contains("Script", { matchCase: false }).click();
    cy.get("p").contains("This script has not been verified. To verify, please click the button below", {
      matchCase: false
    });
    cy.get(".MuiCollapse-wrapperInner button").contains("Verify Script", { matchCase: false });
  });

  it("should the token tab render", () => {
    cy.visit(`en/native-script/${scriptHash}`);
    cy.get("p").contains("Native Script Details", { matchCase: false });
    cy.get(`[data-testid="ellipsis-text"]`).contains(scriptHash.slice(-10));
    cy.get("button").contains("Verify Script", { matchCase: false });
    cy.get(".MuiAccordionSummary-content").contains("Token", { matchCase: false }).click();
    cy.get("table tr th").contains("Token Name");
    cy.get("table tr th").contains("Token ID");
    cy.get("table tr th").contains("Created At");
    cy.get("table tr th").contains("Total Supply");
    cy.get("table tr th").contains("Total Transactions");
  });

  it("should the token tab render", () => {
    cy.visit(`en/native-script/${scriptHash}`);
    cy.get("p").contains("Native Script Details", { matchCase: false });
    cy.get(`[data-testid="ellipsis-text"]`).contains(scriptHash.slice(-10));
    cy.get("button").contains("Verify Script", { matchCase: false });
    cy.get(".MuiAccordionSummary-content").contains("Asset Holders", { matchCase: false }).click();
    cy.get("table tr th").contains("Address");
    cy.get("table tr th").contains("Token Name");
    cy.get("table tr th").contains("Token ID");
    cy.get("table tr th").contains("Balance");
  });
});
