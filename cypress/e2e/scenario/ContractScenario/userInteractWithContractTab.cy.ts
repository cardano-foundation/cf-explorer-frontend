const address = "58606cc73281c50b3d6eb9a0c19db60f1bd321ff3e896145ab7177755a7e18cb";
const datumHash = "521ae7c96a41ef7b3ff0d0c78e17faf1f5fd024e4cd7ad6d6931896ba37d1f73";
const datum = "9f582082ca817919eb8a2857ba794b0eb85001980ca7f8032e7bed4084277c4d53af781a001e8480ff";

describe("user interact with contract tab", () => {
  beforeEach(() => {
    cy.visit(`/transaction/${address}/contracts`);
  });

  it("test overview", () => {
    cy.get("p").contains("What are smart contracts?").click();
    cy.get("button").contains("Continue Reading", { matchCase: false });
    cy.get(`[data-testid="close-modal-button"]`).click();
    cy.get("button").contains("View Contract", { matchCase: false });
    cy.get("p").contains("Contract Address", { matchCase: false });
    cy.get("p").contains("Purpose", { matchCase: false });
  });

  it("should client go to view spend purpose", () => {
    const times: string[] = [];
    cy.get(`[data-testid="contract-card-item"]`).each(($card) => {
      if ($card.html().includes("SPEND")) {
        if (times.indexOf("SPEND") < 0) {
          cy.wrap($card).find("div").contains("View Contract").click();
          cy.get("p").contains("UTXO", { matchCase: false });
          cy.get("p").contains("Contract", { matchCase: false });
          cy.get("button").contains("Redeemer", { matchCase: false }).find("svg").click();
          cy.get("p").contains("What is the redeemer?", { matchCase: false });
          cy.get("p").contains("Purpose", { matchCase: false });
          cy.get("p").contains("Data", { matchCase: false });
          cy.get("p").contains("Mem", { matchCase: false });
          cy.get("p").contains("Steps", { matchCase: false });
          cy.get(`[data-testid="close-modal-button"]`).click();
          cy.get("button").contains("Datum", { matchCase: false }).find("svg").click();
          cy.get("p").contains(datumHash, { matchCase: false });
          cy.get("p").contains(datum, { matchCase: false });
          cy.get(`[data-testid="close-modal-button"]`).click();
          cy.get("div").contains("Compiled Code ", { matchCase: false }).click();
          cy.get("p").contains("What is compiled code?");
          cy.get(`[data-testid="close-modal-button"]`).click();
          cy.get(`[data-testid="goback-button"]`).click();
          cy.get("button").contains("View Contract", { matchCase: false });
          cy.get("p").contains("Contract Address", { matchCase: false });
          cy.get("p").contains("Purpose", { matchCase: false });
        }
        times.push("SPEND");
      }
    });
  });

  it("should client go to view mint purpose", () => {
    const times: string[] = [];
    cy.get(`[data-testid="contract-card-item"]`).each(($card) => {
      if ($card.html().includes("MINT")) {
        const isBurn = $card.html().includes("BURN");
        if (times.indexOf("MINT") < 0) {
          cy.wrap($card).find("div").contains("View Contract").click();
          cy.get("p").contains("Redeemer", { matchCase: false }).find("~ div svg").click();
          cy.get("p").contains("What is the redeemer?", { matchCase: false });
          cy.get("p").contains("Purpose", { matchCase: false });
          cy.get("p").contains("Data", { matchCase: false });
          cy.get("p").contains("Mem", { matchCase: false });
          cy.get("p").contains("Steps", { matchCase: false });
          cy.get(`[data-testid="close-modal-button"]`).click();
          cy.get("div").contains("Compiled Code ", { matchCase: false }).click();
          cy.get("p").contains("What is compiled code?");
          cy.get(`[data-testid="close-modal-button"]`).click();
          if (isBurn) {
            cy.get("p").contains("Burn", { matchCase: false }).find("~ div svg").click();
            cy.get("p").contains("Asset Name", { matchCase: false });
            cy.get("p").contains("Quantity", { matchCase: false });
            cy.get(`[data-testid="close-modal-button"]`).click();
          }
          cy.get(`[data-testid="goback-button"]`).click();
        }
        times.push("MINT");
      }
    });
  });

  it("should client go to view cert purpose", () => {
    const times: string[] = [];
    cy.get(`[data-testid="contract-card-item"]`).each(($card) => {
      if ($card.html().includes("CERT")) {
        cy.wrap($card).find("div").contains("View Contract").click();
        cy.get("button").contains("Redeemer", { matchCase: false }).find("svg").click();
        cy.get("p").contains("What is the redeemer?", { matchCase: false });
        cy.get("p").contains("Purpose", { matchCase: false });
        cy.get("p").contains("Data", { matchCase: false });
        cy.get("p").contains("Mem", { matchCase: false });
        cy.get("p").contains("Steps", { matchCase: false });
        cy.get(`[data-testid="close-modal-button"]`).click();

        cy.get("div").contains("Compiled Code ", { matchCase: false }).click();
        cy.get("p").contains("What is compiled code?");
        cy.get(`[data-testid="close-modal-button"]`).click();
      }
      times.push("CERT");
    });
  });

  it("should client go to view cert purpose", () => {
    const times: string[] = [];
    cy.get(`[data-testid="contract-card-item"]`).each(($card) => {
      if ($card.html().includes("CERT")) {
        cy.wrap($card).find("div").contains("View Contract").click();
        cy.get("button").contains("Redeemer", { matchCase: false }).find("svg").click();
        cy.get("p").contains("What is the redeemer?", { matchCase: false });
        cy.get("p").contains("Purpose", { matchCase: false });
        cy.get("p").contains("Data", { matchCase: false });
        cy.get("p").contains("Mem", { matchCase: false });
        cy.get("p").contains("Steps", { matchCase: false });
        cy.get(`[data-testid="close-modal-button"]`).click();

        cy.get("div").contains("Compiled Code ", { matchCase: false }).click();
        cy.get("p").contains("What is compiled code?");
        cy.get(`[data-testid="close-modal-button"]`).click();
      }
      times.push("CERT");
    });
  });

  it("should client go to view REWARD purpose", () => {
    const times: string[] = [];
    cy.get(`[data-testid="contract-card-item"]`).each(($card) => {
      if ($card.html().includes("REWARD")) {
        cy.wrap($card).find("div").contains("View Contract").click();
        cy.get("div").contains("Redeemer", { matchCase: false }).find("~ div svg").click();
        cy.get("p").contains("What is the redeemer?", { matchCase: false });
        cy.get("p").contains("Purpose", { matchCase: false });
        cy.get("p").contains("Data", { matchCase: false });
        cy.get("p").contains("Mem", { matchCase: false });
        cy.get("p").contains("Steps", { matchCase: false });
        cy.get(`[data-testid="close-modal-button"]`).click();

        cy.get("div").contains("Compiled Code ", { matchCase: false }).click();
        cy.get("p").contains("What is compiled code?");
        cy.get(`[data-testid="close-modal-button"]`).click();
      }
      times.push("REWARD");
    });
  });
});
