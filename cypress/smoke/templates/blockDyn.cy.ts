
  it("should show details of block $blockNo", () => {
    cy.visit("/block/$blockNo");
    cy.get('[data-testid="block-details-total-output-in-ada"]').should("contain", "${totalOutputInAda}");
    cy.get(':nth-child(1) > .css-golliw').should("contain", "${block_time}");
    cy.get(':nth-child(3) > .css-golliw').should("contain", "${tx_count}");
    cy.get(':nth-child(7) > .css-golliw').should("contain", "${epoch_slot}/432000");
    cy.get('.css-ugzz4l').should("contain", "${hash}");
    $tests

  });
