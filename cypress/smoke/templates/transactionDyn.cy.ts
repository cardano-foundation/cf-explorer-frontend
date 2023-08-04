
  it("should show details of transaction $transactionNo", () => {
    cy.visit("/transaction/$transactionNo");
    cy.get('.MuiGrid-container > :nth-child(3)').should("contain", "${tx_timestamp}");
    cy.get('.MuiGrid-container > :nth-child(5)').should("contain", "${total_output}");
    cy.get('.MuiGrid-container > :nth-child(7)').should("contain", "${block_height}");


  });
