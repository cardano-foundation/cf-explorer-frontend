  it("should show details of Epoch ${epochNo}", () => {
    cy.visit("epoch/${epochNo}");
    cy.get(':nth-child(1) > .css-golliw').should("contain", "${start_time}");
    cy.get(':nth-child(2) > .css-golliw').should("contain", "${end_time}");
    cy.get('.MuiGrid-container > :nth-child(8)').should("contain", "${total_rewards}");
    cy.get('[style="position: relative; width: 100%; height: 100%;"] > div').should("contain", "${epoch_no}");
    cy.get(':nth-child(4) > .css-golliw').invoke('text').then(parseFloat).should("be.gte", ${blk_count} - 1);
    cy.get(':nth-child(4) > .css-golliw').invoke('text').then(parseFloat).should("be.lte", ${blk_count} + 1);
    $tests
  });
