Feature: Check explorer dashboard shows a general and updated data of the cardano blockchain

  Scenario: Check Explorer dashboard have all the elements with a general resume about explorer content
    Given User goes to explorer portal
    Then the user should see the general dashboard page with all the resume information

  Scenario: Search for epoch by epoch number using epochs filter
    Given User goes to explorer portal
    And the user selects the epochs filter in the search bar
    And epoch information has been requested through api service
    When the user search by the epoch number
    Then the user should be redirected to the searched epoch detail view

  Scenario: Search by block number using block filter
    Given User goes to explorer portal
    And the user selects the blocks filter in the search bar
    And a block information has been requested through api service
    When the user search by the block number
    Then the user should be redirected to the searched block detail view

  Scenario: Search by block id/hash
    Given User goes to explorer portal
    And a block information has been requested through api service
    When the user search by block id/hash
    Then the user should be redirected to the searched block detail view
