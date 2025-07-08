Feature: Gmail Compose

  Scenario: Admin as Gmail Compose
    Given I am logged in as Admin For Gmail Compose
    Then Select Email
    When First indexing Email Drag and Drop on To Do
    When Click on Deadline and select today
    And Click on First indexing Email on To Do
    When Click on Compose Email Icon
    When Enter Sender Email
    When Enter Subject
    When Select Template
    When Add Text in Email Body
    When Add File
    When click on Send Email
    

    