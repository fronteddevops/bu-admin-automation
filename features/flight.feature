Feature: Add Flights

  Scenario: Admin adds Flights
    Given I am logged in as admin flights
    Then click on flight
    Then Enter Experience Code
    Then Enter Experience type
    Then Select Theme That Describe Experice
    Then Select Categories That Describe Experience
   