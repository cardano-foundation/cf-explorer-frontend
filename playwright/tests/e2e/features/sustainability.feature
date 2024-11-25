Feature: Check Sustainability Indicators feature shows the information related to Cardano's ecological impact


  Scenario: Check stake address emissions calculator
    Given the user selects the stake address id from Stake delegations page
    When the user search the stake address id in the Emissions Calculator
    Then the user should see the number of transactions and the emissions for the given stake address

  Scenario: Check cardano Mica indicators
    Given the user is in the sustainability page
    Then the user should see the Cardano's mica indicator
