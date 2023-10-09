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
    cy.get(".css-1d87buq").contains(pool);
    cy.get(".css-1mwjfms").contains(pool);
  });

  it("should navigate to the transaction detail page", () => {
    const pool = "pool1m06tlj2ykawzvweacgmhxj43hykczgfuynk2lqzxvshm5lq2lyq";
    cy.visit("/pool/pool1m06tlj2ykawzvweacgmhxj43hykczgfuynk2lqzxvshm5lq2lyq");
    cy.get(".css-1d87buq").contains(pool);
    cy.get(".css-1mwjfms").contains(pool);
    cy.get(":nth-child(1) > .css-syl2v3 > .css-vkzxw5").contains("Ticker");
    cy.get(":nth-child(2) > .css-syl2v3 > .css-vkzxw5").contains("Created At");
    cy.get(":nth-child(3) > .css-syl2v3 > .css-0 > .css-vkzxw5").contains("Reward Account");
    cy.get(":nth-child(4) > .css-syl2v3 > .css-0 > .css-vkzxw5").contains("Owner Account");
    cy.get(":nth-child(5) > .css-syl2v3 > .css-vkzxw5").contains("Pool size");
    cy.get(":nth-child(6) > .css-syl2v3 > .css-vkzxw5").contains("Stake limit");
    cy.get(":nth-child(7) > .css-syl2v3 > .css-vkzxw5").contains("Delegators");
    cy.get(".css-1ebz4jx").contains("Saturation");
    //cy.get(':nth-child(1) > .css-uwep2u > .css-1vfa4qi').contains("Reward");
    cy.get(":nth-child(1) > .css-uwep2u > .css-1vfa4qi").contains("Fixed Cost");
    cy.get(":nth-child(2) > .css-uwep2u > .css-1vfa4qi").contains("Margin");
    cy.get(":nth-child(3) > .css-uwep2u > .css-1vfa4qi").contains("Declared Pledge");
    cy.get(":nth-child(4) > .css-uwep2u > .css-1vfa4qi").contains("Epoch Blocks");
    cy.get(":nth-child(5) > .css-uwep2u > .css-1vfa4qi").contains("Lifetime Blocks");
    cy.get(".css-vd773l").contains("Analytics");
    cy.get('[data-testid="table-common"]').contains("Epoch");
  });
});
