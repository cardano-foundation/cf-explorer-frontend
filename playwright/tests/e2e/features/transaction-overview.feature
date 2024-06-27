Feature: Check Transaction Cardano Explorer

  Scenario: Transactions section content
    Given the user is in the general dashboard page in explorer portal test
    When the user selects the Transactions option inside the Blockchain drop down menu
    Then the user should see the transactions page containing the Search bar and Transactions table

  Scenario: Transaction info widget content
    Given the user is in the transactions page in explorer portal site
    When the user selects any data of the row execpt the transaction hash, block number, epoch number or addresses hash of one of the transactions record in the table
    Then the user should see the Info widget data with the respective data of the selected transaction

  Scenario: Transaction detail page through transaction hash
    Given the user is in the Transactions page 
    When  the user selects the transaction hash of one record of the transactions table in the transactions page
    Then the transaction details page of the select transaction should be opened
    
  Scenario: Block detail page through block number
    Given the user is in the Transactions page portal
    When  the user selects the block number of one record of the transactions table in the transactions page
    Then the user should be redirected to the block detail page of the selected block number

  Scenario: Epoch detail page through epoch number
    Given the user is in the Transactions page 
    When  the user selects the epoch number of one record of the transactions table in the transactions page
    Then the user should be redirected to the epoch detail page of the selected epoch number

  Scenario: Address detail view page through input/output address  
    Given the user is in the Transactions page for go to address detail page
    When the user selects the input or output address of one record of the transactions table in the transactions page
    Then the user should be redirected to the address details page of the selected address hash

  Scenario: Transaction detail page through info widget 
    Given the user is in the Transactions page for go to transaction detail from detail button in widget
    Given the user open the info widget of one transaction record in the transactions table of transaction page
    When the user selects the view details button in the transcation info widget
    Then the transaction details page of the selected transaction should be opened

  Scenario: Address detail view page through info widget 
    Given the user is in the Transactions page to address detail from detail button in widget
    Given the user open the info widget of one transaction record in transaction web
    When the user selects the Input or Output address hash in the transcation info widget
    Then the user should be redirected to the address detail page of the selected input address hash

   Scenario: Info widget summary link section
    Given the user is in the Transactions page for go to transaction detail from summary in widget
    Given the user opens the info widget of any transaction in the transactions table from widget of transaction
    When the user selects the summary section in the info widget
    Then the transaction detail page of the selected transaction should be opened with the summary section displayed    

  Scenario:  Info widget UTXOs link section
    Given the user is in the Transactions page for go to transaction detail from widget
    Given the user opens the info widget of any transaction in the transactions table from widget
    When the user selects the UTXOs section in the info widget of the selected transaction
    Then the transaction detail page of the selected transaction should be opened with the UTXOs section displayed   

  Scenario:  Info widget transaction signatores link section
    Given the user is in the Transactions page in the explorer page for go to transaction table from widget
    Given the user opens the info widget of any transaction in the transactions table from widget tab
    When the user selects the transaction signatories section in the info widget of the selected transaction
    Then the transaction detail page of the selected transaction should be opened with the transaction signatories section displayed  