Feature: Add Flights

  Scenario: Admin adds Flights
    Given I am logged in as admin flights
    Then click on flight
    Then Enter Experience Code
    Then Enter Experience type
    Then Select Theme That Describe Experice
    Then Select Categories That Describe Experience
    Then Select Country , States, City, Post Code
    Then Booking Cutoff
    Then Avaibility
    Then Departure Time
    Then Add Time
    Then Click on Add Avaibility
    Then Media and Description
    Then Pickup and Drop-off
   