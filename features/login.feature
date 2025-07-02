Feature: Login

  Scenario: Admin logs in and searches for a trip request
    Given I am on the login page
    When I enter the email "admin@gmail.com"
    And I enter the password "admin123"
    And I click the sign in button
    And I navigate to the Settings menu
    And I navigate to the Age Range menu
    And I navigate to the Trip Request menu
    And I search for "30"
    Then I should see the search results 