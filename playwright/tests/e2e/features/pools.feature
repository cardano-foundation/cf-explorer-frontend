Feature: Check Pools Page Cardano Explorer

  Scenario: Pools page content
    Given the user is in the general dashboard page in explorer portal site
    When the user selects the Pools option inside the Blockchain drop down menu
    Then the user should see the Pools page containing the Search bar, the General infor cards and the Pools table

  Scenario: Epochs page through pools page
   Given the user is in the Pools page
   When the user selects the epoch info card in the pools page
   Then the user should be redirected to the current Epoch details page

  Scenario: Reward account address through pool details page
   Given the user is in the Pools details page of one Pool
   When the user selects the address hash under the Reward account part in the pool details section
   Then the user should be redirected to the reward account address details page of the selected address hash

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

   Scenario: Governance votes - Filter by Action type
   Given the user is in the Pools details pages web of one Pool
   And the user selects the Governance votes section
   When the user filter by one of the Action types
   Then the user should see just the votes that has the same action type as the selected filter
   
   Scenario: Governance votes - Filter by Current status
   Given the user is in the Pools details pages web of one Pool page
   And the user selects the Governance votes section current status
   When the user filter by one of the current status
   Then the user should see just the votes that has the same status as the selected filter current status

