Feature: Check Transaction Cardano Explorer

  Scenario: Transactions section content
    Given User goes to explorer portal
    When the user selects the Transactions option inside the Blockchain drop down menu
    Then the user should see the transactions page containing the Search bar and Transactions table

  Scenario: Transaction detail page through transaction hash
    Given the user is in the Transactions page
    When  the user selects the transaction hash of one record of the transactions table in the transactions page
    Then the transaction details page of the select transaction should be opened

  Scenario: Block detail page through block number
    Given the user is in the Transactions page
    When  the user selects the block number of one record of the transactions table in the transactions page
    Then the user should be redirected to the block detail page of the selected block number

  Scenario: Epoch detail page through epoch number
    Given the user is in the Transactions page
    When  the user selects the epoch number of one record of the transactions table in the transactions page
    Then the user should be redirected to the epoch detail page of the selected epoch number
