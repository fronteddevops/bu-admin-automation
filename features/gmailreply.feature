Feature: Gmail Reply

  Scenario: Admin as Gmail Reply
    Given I am logged in as Admin For GmailReply
    Then Select Email
    When First indexing Email Drag and Drop on To Do
    When Click on Deadline and select today
    
    