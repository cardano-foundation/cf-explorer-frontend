Feature: Check Block List Cardano Explorer

  Scenario: Blocks section content
    Given User goes to explorer portal
    When the user selects the Blocks option inside the Blockchain drop down menu
    Then the user should see the blocks info containing the Search bar and Blocks table

  Scenario: Block detail view page content
    Given the user is in the blocks page in explorer portal
    When the user selects the block id of one of the blocks record in the table
    Then the user should see the block detail page of the selected block with the Search bar, blockdetails and Transactions table

  Scenario: Block detail view through Block number
    Given the user is in the blocks page in explorer portal
    When the user selects the block number of one of the blocks record in the table
    Then the user should see the block detail page of the selected block number in the table

  Scenario: Block detail view through Block id
    Given the user is in the blocks page in explorer portal
    When the user selects the block id of one of the blocks record in the table
    Then the user should see the block detail page of the selected block id in the table

  Scenario: Epoch detail view through epoch number
    Given the user is in the blocks page in explorer portal
    When the user selects the epoch number of one of the blocks record in the table
    Then the user should see the epoch detail page of the selected epoch number in the table

  Scenario: Go to Block producer pool
    Given the user is in the blocks page in explorer portal
    And the user selects the block id of one of the blocks record in the table
    When the user selects the pool link in the block producer
    Then the user should be redirected to the pool details page that produce the given block
