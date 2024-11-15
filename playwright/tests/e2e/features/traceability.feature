Feature: Check Traceability program feature shows the information related to business cases and their interaction
  with Cardano block chain

  Scenario: Check International Organisation of Vine and Wine link
    Given The user goes to Traceability program page in explorer portal
    When the user clicks the OIV link
    Then the user should be redirected to "www.oiv.int" page

  Scenario: Check National Wine Agency link
    Given The user goes to Traceability program page in explorer portal
    When the user clicks in the National Wine Agency link
    Then the user should be redirected to "wine.gov.ge" page

  Scenario: Check Case Study link
    Given The user goes to Traceability program page in explorer portal
    When the user clicks in the Case Study button
    Then the user should be redirected to "cardanofoundation.org/case-studies/bolnisi" page
