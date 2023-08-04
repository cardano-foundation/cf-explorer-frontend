
  it("should show details of block $blockNo", () => {
    cy.visit("/block/$blockNo");
    cy.get('[data-testid="block-details-total-output-in-ada"]').should("contain", "${totalOutputInAda}");
    cy.get('.MuiGrid-container > :nth-child(1)').should("contain", "${block_time}");
    cy.get('.MuiGrid-container > :nth-child(3)').should("contain", "${tx_count}");
    cy.get('.MuiGrid-container > :nth-child(7)').should("contain", "${epoch_slot}/432000");
    cy.get('.css-1kxgysv').should("contain", "${hash}");
    $tests

  });
