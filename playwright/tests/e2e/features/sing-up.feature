Feature: Sign up into explorer portal

  Scenario: New user can not register into explorer with wrong email
    Given the user go to explorer sign up page
    When the user enter and invalid email in sign up form
    Then the user should see an error displayed in sign un page

  Scenario: New user can not register when confirm email does not match
    Given the user go to explorer sign up page
    And the user enter his email
    When the user enter a different email in confirm email field
    Then the user should see an error indicating the email does not match

  Scenario: New user can not register when password confirmation does not match
    Given the user go to explorer sign up page
    And the user enter a password
    When the user enter a different password in password confirm field
    Then the user should see an error indicating the password does not match

  Scenario: New user can not register without accept terms and conditions
    Given the user go to explorer sign up page
    When the user enter all the credentials information without accept terms and conditions
    Then the user should be not able to click the sign up option

  Scenario: New user can not register with an email that is already registered
    Given the user go to explorer sign up page
    When the user try to register with a registered email
    Then the user should see an error indicating the email is already registered

