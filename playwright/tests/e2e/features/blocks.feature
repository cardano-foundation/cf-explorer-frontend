Feature: Check Block List Cardano Explorer

  Scenario: Blocks section content
    Given the user is in the general dashboard page in explorer portal block test
    When the user selects the Blocks option inside the Blockchain drop down menu
    Then the user should see the blocks info containing the Search bar and Blocks table

  Scenario: Block detail view page content
    Given the user is in the blocks page in explorer portal
    Given the user open the block info detail widget of one of the blocks in the table
    When the user selects the view details button
    Then the user should see the block detail page of the selected block with the Search bar, blockdetails and Transactions table

  Scenario: Block detail view through Block number
    Given the user is in the blocks page in explorer
    When the user selects the block number of one of the blocks record in the table
    Then the user should see the block detail page of the selected block number in the table

  Scenario: Block detail view through Block id
    Given the user is in the blocks list page in explorer
    When the user selects the block id of one of the blocks record in the table
    Then the user should see the block detail page of the selected block id in the table

  Scenario: Epoch detail view through epoch number
    Given the user is in the blocks page in explorer portal web
    When the user selects the epoch number of one of the blocks record in the table
    Then the user should see the epoch detail page of the selected epoch number in the table

  Scenario: Block info detail widget
    Given the user is in the blocks page in explorer portal for go to detail widget
    When the user selects any data of the row execpt the block number, block id or epoch number of one of the blocks record in the table
    Then the user should see the block detail info widget with the Info widget data with the same data for the block id, absolute slot, created at date, fees and the total output in Ada of the selected block in the table

  Scenario: Block detail view page through Block id in block info detail widget
    Given the user is in the blocks page in explorer portal for go to block detail from widget
    When the user open the block info detail widget of one of the blocks in the table for go to block detail from widget
    Then the user selects the block id into the block info detail widget user should see the block detail page of the selected block id

  Scenario: Go to Transaction detail page through transaction hash code
    Given the user is in the Blocks section in the explorer page for go to trx detail from block
    Given the user go to the detail view page of one block for go to trx detail from block
    When the user selects the transaction hash of one record of the transactions table in the block detail view page
    Then the user should be redirected to the transaction details page of the select transaction in the block detail view page

  Scenario: Go to address detail view
    Given the user is in the Blocks section in the explorer page for go to address detail from block
    Given the user go to the detail view page of one block for go to address detail from block
    When the user selects one of the input - output addresses of one record of the transactions table in the block detail view page
    Then the user should be redirected to the address details page of the select address in the block detail view page

  Scenario: Go to transactions table in block detail view
    Given the user is in the Blocks section in the explorer page for go to transaction table from widget
    Given the user selects one of the blocks to open the info widget for go to transaction table from widget
    When the user selects the transactions section into the info widget of the selected block
    Then the user should see the selected block detail view page in the transactions table section

  Scenario: Go to Block producer pool
    Given the user is in the Blocks section in the explorer page for go to pool detail from producer
    Given the user go to the detail view page of one block for go to pool detail from producer
    When the user selects the pool link in the block producer
    Then the user should be redirected to the pool details page that produce the given block
