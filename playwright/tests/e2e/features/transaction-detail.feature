Feature: Transaction detail in Cardano explorer

  Scenario: Transaction details page - smart contract info
    Given the user is in the transaction detail page of a transactions with smart contract info
    When the user open the contracts section
    Then the user should see the Contract data

  Scenario: Transaction details page - smart contract info details
    Given the user is in the transaction detail page of a transactions with smart contract
    And the user open the contracts section in transaction tab
    When the user selects the view contract button
    Then the user should see the contract details with Redeemer, Compiled code, Reference inputs and Assets

  Scenario: Transaction details page - Stake certificates
    Given the user is in the transaction detail page of a registration and deregistration address transaction
    When the user selects the stake certificates section
    Then the user should see the Stake adress registration and deregistration info

  Scenario: Transaction details page - Minting info
    Given the user is in the transaction detail page of a minting transaction
    When the user selects the minting section
    Then the user should see the Minting data of the given transaction

  Scenario: Transaction details page content with Pool certificates
    Given the user is in the transaction detail page of a pool registration transaction
    When the user selects the pool certificates section
    Then the user should see the Pool registration data of the given transaction

  Scenario: Transaction details page content with Pool deregistrations
    Given the user is in the transaction detail page of a pool deregistration transaction
    When the user selects the pool deregistration section
    Then the user should see the Pool deregistration data of the given transaction

  Scenario: Transaction details page content with Delegations info
    Given the user is in the transaction detail page of a delegation transaction
    When the user selects the delegations section
    Then the user should see the Delegations data of the given transaction

  Scenario: Transaction details page content with Instantaneous rewards info (Mainnet)
    Given the user is in the transaction detail page of a reward transaction
    When the user selects the instantaneous reward section
    Then the user should see the Instantaneous Rewards data of the given transaction
