Feature: Add User

  Scenario: Admin adds a new user with a group and permissions
    Given I am logged in as admin
    When I navigate to the Users section in Settings
    And I create a new group "Admin Group1234" with permissions
    And I add a new user "John Doe4" with email "johnx4@example.com" and password "user123" to the group
    Then the user should be added successfully