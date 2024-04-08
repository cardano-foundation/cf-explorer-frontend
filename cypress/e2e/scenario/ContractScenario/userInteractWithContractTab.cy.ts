const address = "a943d9e1bba373e1cc9f3ae105d3d4bd54b13e681ac51254e534ec99d779186b";
const datumHash = "288337b1682c4009a4a594186db1fd6ef5b6587399da9312a7b0aaf1ce105aa9";
const datum =
  "d8799f581cd4399ffdf2a33c9bd5565d9232278295fc1d4b7ca2bca9f84d04ff5b1a0206cc80581c43647af85d68093da3895ce31d1e8c4aeb20f3c2dfee8b0536d55b215443617264616e6f436c616e6e734d656e32343630581cde0ce548875ed1d37e8892ece3da878f480814691dfb3c1a76c63b9b1832ff";

describe("user interact with contract tab", () => {
  beforeEach(() => {
    cy.visit(`/transaction/${address}/contracts`);
  });

  it("test overview", () => {
    cy.get("p").contains("What are smart contracts?").click();
    cy.get("button").contains("Continue Reading", { matchCase: false });
    cy.get(`[data-testid="close-modal-button"]`).click();
    cy.get("button").contains("View Contract", { matchCase: false });
    cy.get("p").contains("Contract", { matchCase: false });
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
          cy.get("p").contains("Contract", { matchCase: false });
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
