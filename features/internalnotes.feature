Feature: Add Internal Notes

  Scenario: Add Internal Notes
    Given I am logged in For Internal Notes
    Then Select Email
    When First indexing Email Drag and Drop on To Do
    When Click on Deadline and select today
    And Click on First indexing Email on To Do
    When Click on Internal Notes
    When Enter Title
    When Enter Description
    When Click on Add Button
  