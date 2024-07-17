Feature: Check Pools Page Cardano Explorer

  Scenario: Pools page content
    Given the user is in the general dashboard page in explorer portal site
    When the user selects the Pools option inside the Blockchain drop down menu
    Then the user should see the Pools page containing the Search bar, the General infor cards and the Pools table

  Scenario: Epochs page through pools page
    Given the user is in the Pools page
    When the user selects the epoch info card in the pools page
    Then the user should be redirected to the current Epoch details page

  Scenario: Pool details page content
    Given the user is in the pools page in explorer portal
    When the user selects one of the pools records
    Then the user should see the Pool details page of the selected pool with the Search bar, Pools details, Analytics chart, Epoch table, Staking delegators table, Pool certificates history table and Governance votes section

  Scenario: Owner account address through pool details page
    Given the user is in the Pools details site of one Pool
    When the user selects the address hash under the Owner account part in the pool details section
    Then the user should be redirected to the Owner account address details page of the selected address hash

  Scenario: Pools details page - Epoch table
    Given the user is in the Pools details web of one Pool
    When the user selects an Epoch number from the epochs table
    Then the user should be redirected to the selected Epoch details page

  Scenario: Pools details page -  Staking Delegators
    Given the user is in the Pools details page site of one Pool
    When the user selects an delegetor hash from the Staking delegators table
    Then the user should be redirected to the selected Address details page

  Scenario: Pools details page - Pool certificates History - Tx Hash
    Given the user is in the Pools details page web of one Pool
    When the user selects a transaction hash from the Pool certificates History table
    Then the user should be redirected to the selected Transaction details page

  Scenario: Pools details page - Pool certificates History - Block
    Given the user is in the Pools details pages of one Pool
    When the user selects a block number from the Pool certificates History table
    Then the user should be redirected to the selected Block details page

  Scenario: Pools details page - Pool certificates History - Epoch
    Given the user is in the Pools details pages site of one Pool
    When the user selects an epoch number from the Pool certificates History table
    Then the user should be redirected to the selected Epoch details page web

  Scenario: Pool overview - Filter
    Given the user is in the Pools overview page
    When the user selects the filter button
    Then the user should see all the Filter options displayed

  Scenario: Pool overview - Filter by pool size
    Given the user is in the Pools overview page for test filter pool size
    And the user selects the filter button for test filter pool size
    When the user drags the points for a min and a max value in the bar for the pool size filter option
    Then the user should see just the pools that have a pool size between the min and max selected values

  Scenario: Pool overview - Filter by pool name
    Given the user is in the Pools overview page for test filter pool name
    And the user selects the filter button for test filter pool name
    When the user types some text in the pool name filter option
    Then the user should see just the pools that contains the typed text

  Scenario: Pool overview - Filter by saturation level
    Given the user is in the Pools overview page for test filter saturation
    And the user selects the filter button for test filter saturation
    When the user drags the points for a min and a max value in the bar for the pool saturation filter option
    Then the user should see just the pools that have a saturation level between the min and max selected values
