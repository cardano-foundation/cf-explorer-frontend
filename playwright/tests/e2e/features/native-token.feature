Feature: Check Native tokens List Cardano Explorer
# TODO: Tests currently disable because Native tokens data is taking to much to load on Explorer current version 1.9.0
#  Scenario: Native tokens page content
#    Given the user is in the general dashboard page in explorer portal for go to tokens page
#    When the user selects the Native Tokens option inside the Blockchain drop down menu
#    Then the user should see the Tokens page containing the Search bar and Tokens table
#
#  Scenario: Native token info widget content
#    Given the user is in the Native tokens page
#    When the user opens the info widget of a given token
#    Then the user should see the Info widget data with the same data of the selected token
#
#  Scenario: Token details page through asset name
#    Given the user is in the Natives Tokens page in explorer portal
#    When the user selects an Asset name of one of the Tokens record in the table
#    Then the user should see the Token detail page of the selected Token in the table
#
#   Scenario: Script details page through script hash
#    Given the user is in the Natives Tokens page in explorer portal page
#    When the user selects a Script hash of one of the Tokens record in the table
#    Then the user should see the Script detail page of the selected Token in the table
#
#  Scenario: Token details page through info widget
#    Given the user is in the Native Tokens page in explorer portal
#    Given the user open the Token info detail widget of one of the tokens in the table
#    When the user selects the Token id into the token info detail widget
#    Then the user should see the Token detail page of the selected token in the table
#
#  Scenario: Script details page through info widget
#    Given the user is in the Native Tokens page in explorer site
#    Given the user open the Token info detail widget of one of the tokens in the table in Token site
#    When the user selects the script hash into the token info detail widget
#    Then the user should see the Script detail page of the selected token in the table
#
#  Scenario: Info widget specific information sections
#    Given the user is in the Native Tokens page in explorer portal web
#    Given the user open the Token info detail widget of one of the tokens in the table in web
#    When the user selects the one of the link sections into the token info detail widget in web
#    Then the user should see the Token detail page of the selected block with the Search bar
#
#  Scenario: Token detail page content
#    Given the user is in the Native tokens page in explorer portal page web
#    Given the user open the Token info detail widget of one of the tokens in the table page web
#    When the user selects the view details button page web
#    Then the user should see the Token detail page with the displayed information section that was selected before
#
#  Scenario: Transaction details page through Token detail page
#    Given the user open the detail page of a token in the native tokens page
#    When the user selects the Transaction hash of a transaction in the transactions table
#    Then the user should be redirected to the transaction details page of the selected transaction
#
#  Scenario: Transactions - Block details page through token detail page
#    Given the user open the detail page of a token in the native tokens site
#    When the user selects the Block number in the transactions table
#    Then the user should be redirected to the Block details page of the selected block number
#
#   Scenario: Transactions - Epoch details page through token detail page
#    Given the user open the detail page of a token in the native tokens web
#    When the user selects the Epoch number in the transactions table
#    Then the user should be redirected to the Epoch details page of the selected epoch number
#
#   Scenario: Transactions - Address details page through Token detail page
#    Given the user open the detail page of a token in the native tokens page in web
#    When the user selects the input addres link in the transactions table in web
#    Then the user should be redirected to the Address details page of the selected address link in web
#
#   Scenario: Top holder Address details page through token detail page
#    Given the user open the detail page of a token in the native tokens page in web site
#    When the user selects the addres link in the top holders section in web site
#    Then the user should be redirected to the Address details page of the selected address link in web site
#
#   Scenario: Minting - transaction details page through token detail page
#    Given the user open the detail page of a token in the native tokens in webpage
#    When the user selects the transaction hash in the minting section in webpage
#    Then the user should be redirected to the Transaction details page of the selected transaction hash in webpage
