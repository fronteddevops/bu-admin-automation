Feature: Gmail Compose

  Scenario: Admin as Gmail Compose
    Given I am logged in as Admin For Gmail Compose
    Then Select Email
    When First indexing Email Drag and Drop on To Do
    When Click on Deadline and select today
    And Click on First indexing Email on To Do
    

    