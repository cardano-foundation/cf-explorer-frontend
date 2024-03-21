Feature: Sign in into explorer portal

  Scenario: Registered user can sign in with credentials
    Given the user go to explorer sign in page
    When the user enter his credentials for sign in
    Then the user should see the explorer dashboard page with his user account info

  Scenario: User can not sign in with invalid email
    Given the user go to explorer sign in page
    When the user enter and invalid email
    Then the user should see an error displayed in sign in page

  Scenario: User can reset his password through forgot password page
    Given the user go to explorer sign in page
    When the user selects the forgot password option
    Then the user should see the forgot password page with field for submit his email

