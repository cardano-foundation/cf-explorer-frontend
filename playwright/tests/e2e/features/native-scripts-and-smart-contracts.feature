Feature: Check Native Script And Smart Contract Page Cardano Explorer

  Scenario: Native scripts content
    Given the user is in the general dashboard page in explorer portal for show native page
    When the user selects the Native scirpts and Smart Contracts option inside the Blockchain drop down menu for show native page
    Then the user should see the Native scipts page containing the Native srcipt info

  Scenario: Smart contracts content
    Given the user is in the general dashboard page in explorer portal for show contract page
    And the user selects the Native scirpts and Smart Contracts option inside the Blockchain drop down menu for show contract page
    When the user selects the Smart Contract section
    Then the user should see the Smart Contract info

  Scenario: Native scripts filter - Time-locked
    Given the user is in the Native Scripts and Smart contracts view for time-locked filter
    And the user selects the filter option in the native script section
    When the user filter by time locked in open status
    Then the user should see just the native scripts with time-licked in open status

  Scenario: Native scripts filter - Multi-Sig
    Given the user is in the Native Scripts and Smart contracts view for multi-sig filter
    And the user selects the filter option in the native scripts section
    When the user filter by multi-sig selecting "yes" option
    Then the user should see just the native scripts with multi-sig label

  Scenario: Smart contracts filter - Version
    Given the user is in the Native Scripts and Smart contracts view for version filter
    And the user selects the Smart contract section
    And the user select the filter in the smart contract section
    When the user filter by version selecting "Plutus V2" option
    Then the user should see just the smart contracts with "Plutus V2" version

  Scenario: Native script details page through script hash
    Given the user is in the Native Scripts and Smart contracts view for native script hash filter
    When the user selects the script hash of one of the native scripts cards
    Then the user should see the Native Script Details page of the selected native script containing the Minting Burning policy data, the Script info, the Token table and the Asset Holders table

  Scenario: Token details page through native script details page
    Given the user is in the Native Scripts details page of one native script go to token detail
    And the user open the Tokens table
    When the user selects the token ID of any token in the tokens table
    Then the user should be redirected to the tokens details page of the selected token ID

  Scenario: Smart contract details page through script hash
    Given the user is in the Native Scripts and Smart contracts view for contract script hash filter
    And the user opens the Smart contracts section
    When the user selects the script hash of one of the smart contract cards
    Then the user should see the Smart contract Details page of the selected smart contract containing the Script hash, version and Transactions table

  Scenario: Native script details page - Asset holders
    Given the user is in the Native Scripts details page of one native script
    And the user open the Asset holders table
    When the user selects the Address ID of one of the records in the Asset holders table
    Then the user should be redirected to the Address details page of the selected Address ID

  Scenario: Smart contract details page - Transactions
    Given the user is in the Smart contract details page of one smart contract transactions
    When the user selects the transaction hash of one of the records in the transactions table in Smart Contract details
    Then the user should be redirected to the Transaction details page of the selected transaction hash

  Scenario: Smart contract in Transactions details page in contract section
    Given the user is in the Smart contract details page of one smart contract
    When the user selects the transaction hash of one of the records in the transactions table
    Then user should see the selected smart contract hash with the same purpose in the contracts section of the transaction details page
