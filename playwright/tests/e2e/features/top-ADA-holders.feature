Feature: Top ADA Holders in Cardano explorer

    Scenario: Top ADA Holders page content
        Given the user is in the general dashboard page in explorer portal test top ADA holder
        When the user selects the Top ADA Holders option inside the Blockchain drop down menu
        Then the user should see the top ADA Holders address hash, balance and transaction count sorted by balance

    Scenario: Top ADA Holders page - By Amount Staked
        Given the user is in the Top ADA Holders section
        When the user selects the By amount Staked option
        Then the user should see the Stake Address, pool and Stake amount of the Top ADA holders sorted by stake amount
    
    Scenario: By Address ADA Balance - Adress details
        Given the user is in the Top ADA Holders section Address ADA Balance
        When the user selects the Address hash of one the Top ADA Holders
        Then the user should be redirected to the Address detail page of the selected Address hash

    Scenario: By Amount Staked - Stake Adress details
        Given the user is in the Top ADA Holders section tab Address ADA Balance
        And the user selects the By amount Staked option
        When the user selects the Stake Address hash of one the Top ADA Holders
        Then the user should be redirected to the Stake Address detail page of the selected Stake Address hash

    Scenario: By Amount Staked - Pool details
        Given the user is in the page Top ADA Holders section
        And the user selects the By amount Staked option
        When the user selects the pool link of one the Top ADA Holders
        Then the user should be redirected to the Pool detail page of the selected pool link