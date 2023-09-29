/// <reference types="cypress" />

describe("delegation pool spec", () => {
  it("should navigate to the stake pool page", () => {
    cy.visit("/");
    cy.get('[data-testid="menu-button-blockchain"]').click();
    cy.get('[data-testid="submenu-button-pools"]').click();
    cy.get(".css-1l7sjfb").contains("Pools");
    cy.get('[data-testid="pool-overview"] > div').eq(0).contains("Epoch", { matchCase: false });
    cy.get('[data-testid="pool-overview"] > div').eq(1).contains("Slot", { matchCase: false });
    cy.get('[data-testid="pool-overview"] > div').eq(2).contains("Live Stake", { matchCase: false });
    cy.get('[data-testid="pool-overview"] > div').eq(2).contains("Delegators", { matchCase: false });
    cy.get('[data-testid="pool-overview"] > div').eq(3).contains("Total Pools", { matchCase: false });
    cy.get(".css-1dz0v3k > tr > :nth-child(1)").contains("Pool");
    cy.get(".css-1dz0v3k > tr > :nth-child(2)").contains("Pool size");
    cy.get(".css-1dz0v3k > tr > :nth-child(3)").contains("Declared Pledge");
    cy.get(".css-1dz0v3k > tr > :nth-child(4)").contains("Saturation");
    cy.get(".css-1dz0v3k > tr > :nth-child(5)").contains("Number of Delegators");
    cy.get(".css-1dz0v3k > tr > :nth-child(6)").contains("Blocks in Epoch");
    cy.get(".css-1dz0v3k > tr > :nth-child(7)").contains("Blocks lifetime", { matchCase: false });
    cy.get(".css-1dz0v3k > tr > :nth-child(8)").contains("Fixed Cost");
  });

  it("redirect to correct transaction detail page", () => {
    const pool = "pool1m06tlj2ykawzvweacgmhxj43hykczgfuynk2lqzxvshm5lq2lyq";
    cy.visit("/pools");
    cy.get(".css-1l7sjfb").contains("Pool");
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
    cy.get(":nth-child(1) > .css-uwep2u > .css-1vfa4qi").contains("Fixed Cost");
    cy.get(":nth-child(2) > .css-uwep2u > .css-1vfa4qi").contains("Margin");
    cy.get(":nth-child(3) > .css-uwep2u > .css-1vfa4qi").contains("Declared Pledge");
    cy.get(":nth-child(4) > .css-uwep2u > .css-1vfa4qi").contains("Epoch Blocks");
    cy.get(":nth-child(5) > .css-uwep2u > .css-1vfa4qi").contains("Lifetime Blocks");
    cy.get(".css-vd773l").contains("Analytics");
    cy.get('[data-testid="table-common"]').contains("Epoch");
  });
});
