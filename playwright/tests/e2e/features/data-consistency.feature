Feature: Check explorer portal show the correct and updated data from cardano block chain

  Scenario: Check the information of the last block in the chain
    Given An explorer user logs in into explorer portal
    And the user goes to the blocks information page
    When the user selects the last block
    And the last block information has been requested through api service
    Then the user should see the same information that the api returns

  Scenario: Check the information of the last active epoch in explorer portal
    Given An explorer user logs in into explorer portal
    And the user goes to the epochs information page
    When the user selects the last active epoch
    And the last active epoch information has been requested through api service
    Then the user should see the same information for the epoch that the api returns

  Scenario: Check the information of the last finished epoch in explorer portal
    Given An explorer user logs in into explorer portal
    And the user goes to the epochs information page
    When the user selects the last finished epoch
    And the last finished epoch information has been requested through api service
    Then the user should see the same information fort the finished epoch that the api returns

  Scenario: Check active epoch boundaries
    Given An explorer user logs in into explorer portal
    When the user goes to the epochs information page
    Then the start time of the active epoch should be the end time of the last finised epoch
