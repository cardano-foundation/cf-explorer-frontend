
  it("should show details of transaction $transactionNo", () => {
    cy.visit("/transaction/$transactionNo");
    cy.get(':nth-child(3) > .css-golliw').should("contain", "${tx_timestamp}");
    cy.get(':nth-child(5) > .css-golliw > .css-0').should("contain", "${total_output}");
    cy.get('.MuiGrid-container').should("contain", "${block_height}");


  });
