Feature: Task Assign

  Scenario: Task Assign
    Given I am logged in For Task Assign
    Then Select Email
    When First indexing Email Drag and Drop on To Do
    When Click on Deadline and select today
    And Click on First indexing Email on To Do
    When Click on Assign
    When Set Reminder Tomorrow
    When Select My Day plan Tomorrow
    When Clicks on Notes and Enter Notes

 