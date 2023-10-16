/// <reference types="cypress" />

describe("delegation pool spec", () => {
  it("should navigate to the stake pool page", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-pools"]').click();
    cy.get("h2").contains("Pools");
    cy.get("div").contains("Epoch");
    cy.get("div").contains("Slot");
    cy.get("div").contains("Live Stake");
    cy.get("div").contains("Delegators");
    cy.get("div").contains("Total Pools");
    cy.get("table tr th").contains("Pool");
    cy.get("table tr th").contains("Pool size", { matchCase: false });
    cy.get("table tr th").contains("Declared Pledge");
    cy.get("table tr th").contains("Saturation");
    cy.get("table tr th").contains("Number of Delegators");
    cy.get("table tr th").contains("Blocks in Epoch");
    cy.get("table tr th").contains("Blocks lifetime", { matchCase: false });
    cy.get("table tr th").contains("Fixed Cost");
  });

  it("redirect to correct transaction detail page", () => {
    const pool = "pool1m06tlj2ykawzvweacgmhxj43hykczgfuynk2lqzxvshm5lq2lyq";
    cy.visit("/pools");
    cy.get("div").contains("Pools");
    cy.get('[data-testid="search-bar"]').type(pool).type("{enter}");
    cy.get("small").contains("Pool ID", { matchCase: false });
    cy.get("small ~ a").should("have.attr", "href").and("include", pool);
  });

  it.only("should navigate to the transaction detail page", () => {
    const pool = "pool1m06tlj2ykawzvweacgmhxj43hykczgfuynk2lqzxvshm5lq2lyq";
    cy.visit("/pool/pool1m06tlj2ykawzvweacgmhxj43hykczgfuynk2lqzxvshm5lq2lyq");
    cy.get("small").contains("Pool ID", { matchCase: false });
    cy.get("small ~ a").should("have.attr", "href").and("include", pool);
    cy.get(":nth-child(1) > .css-syl2v3 > .css-vkzxw5").contains("Ticker");
    cy.get(":nth-child(2) > .css-syl2v3 > .css-vkzxw5").contains("Created At");
    cy.get(":nth-child(3) > .css-syl2v3 .css-vkzxw5").contains("Reward Account");
    cy.get(":nth-child(4) > .css-syl2v3 .css-vkzxw5").contains("Owner Account");
    cy.get(":nth-child(5) > .css-syl2v3 > .css-vkzxw5").contains("Pool size");
    cy.get(":nth-child(6) > .css-syl2v3 > .css-vkzxw5").contains("Stake limit");
    cy.get(":nth-child(7) > .css-syl2v3 > .css-vkzxw5").contains("Delegators");
    cy.get(".css-1ebz4jx").contains("Saturation");

    cy.get("div > .css-27jcwj").contains("Fixed Cost");
    cy.get("div > .css-27jcwj").contains("Margin");
    cy.get("div > .css-27jcwj").contains("Declared Pledge");
    cy.get("div > .css-27jcwj").contains("Epoch Blocks");
    cy.get("div > .css-27jcwj").contains("Lifetime Blocks");
    cy.get(".css-vd773l").contains("Analytics");
    cy.get('[data-testid="table-common"]').contains("Epoch");
  });

  it("should display the Retired Pools", () => {
    let totalPools = 0;
    let retiredPools = 0;

    cy.visit("/pools");

    cy.get("div")
      .contains("Results")
      .find("span")
      .invoke("text")
      .then((text) => {
        const num = Number(text.replace(",", ""));
        if (isNaN(num)) return;
        totalPools = num;
        cy.get("div").contains("Show Retired Pools").find(`input[type="checkbox"]`).click({ force: true });
        cy.get("div")
          .contains("Results")
          .find("span")
          .invoke("text")
          .then((text) => {
            const num = Number(text.replace(",", ""));
            if (isNaN(num)) return;
            retiredPools = num;
            cy.log(`results: ${totalPools} - ${retiredPools}`);
            expect(retiredPools).to.be.not.equal(totalPools);
          });
      });
  });

  it("should show Actual Pledge", () => {
    cy.visit("/pool/pool1q80jjs53w0fx836n8g38gtdwr8ck5zre3da90peuxn84sj3cu0r");
    cy.get(`[data-testid="checking-green"]`).trigger("mouseover");
    cy.get("div").contains("Actual Pledge");
    cy.get(`[data-testid="actual-pledge-value"]`)
      .invoke("text")
      .then((text) => {
        const num = Number(text.replace(",", "").replace(".", ""));
        expect(num).to.be.a("number");
      });

    cy.visit("/pool/pool1ddskftmsscw92d7vnj89pldwx5feegkgcmamgt5t0e4lkd7mdp8");
    cy.get(`[data-testid="warning-light"]`).trigger("mouseover");
    cy.get(`[data-testid="actual-pledge-value"]`)
      .invoke("text")
      .then((text) => {
        const num = Number(text.replace(",", "").replace(".", ""));
        expect(num).to.be.a("number");
      });
  });
});
