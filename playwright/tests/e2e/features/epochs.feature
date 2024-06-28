Feature: Epoch list in Cardano explorer

  Scenario: Epochs section content
    Given the user is in the general dashboard page in explorer portal
    When the user selects the Epochs option inside the Blockchain drop down menu
    Then the user should see the epochs info containing the Search bar, Current epoch resume info and the Finished epochs table

  Scenario: Open Current Epoch info detail widget
    Given the user is in the Epochs section in the explorer page
    When the user selects the current epoch number
    Then the user should see a widget containing the Info widget data with the same epoch number, start time, end time, blocks number and slot number of the selected current active epoch

  Scenario: Open Finished Epoch info detail widget
    Given the user is in the Epochs section in the explorer page with finished epoch
    When the user selects one of the finished epochs record or the eye symbol at the end of the row
    Then the user should see a widget containing the Info widget data with the same data of the selected epoch in the table

  Scenario: Active Epoch detail view page
    Given the user is in the Epochs section in the explorer page to current epoch detail
    And the user open the info widget of the current active epoch
    When the user selects the view details button in the info widget
    Then the user should see the epoch detail view info page containing the Search bar, Epoch details and the Blocks table with the data of active epoch

  Scenario: Finished Epoch detail view page
    Given the user is in the Epochs section in the explorer page to finished epoch detail
    And the user open the info widget of one finished epoch
    When the user selects the view details button in the info finished epoch widget
    Then the user should see the epoch detail view info page containing the Search bar, Epoch details and the Blocks table with the data of the select finished epoch

  Scenario: Go to block detail page throuht block number
    Given the user is in the Epochs section in the explorer page to block detail
    And the user go to the detail view page of one epoch
    When the user selects the block number of one record of the blocks table in the epoch detail view page
    Then the user should be redirected to the block details page of the select block in the epoch detail view page

  Scenario: Go to block detail page throuht block id
    Given the user is in the Epochs section in the explorer page to block detail by block id
    And the user go to the detail view page of one finished epoch
    When the user selects the block id of one record of the blocks table in the epoch detail view page
    Then the user should be redirected to the block details page of the select block in the epoch detail view page by blockid

  Scenario: Go to blocks table in epoch detail view
    Given the user is in the Epochs section in the explorer page to block list by block tab
    And the user selects one of the epochs open widget Epoch
    When user selects the blocks section into the info widget of the selected epoch
    Then the user should see the selected epoch detail view page in the blocks table section
