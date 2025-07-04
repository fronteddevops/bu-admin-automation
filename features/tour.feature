Feature: Add Tour

  Scenario: Admin adds a new Tour with all required details
    Given I am logged in as admin in tour
    When home page click tour add Product and select Tour
    Then Click on Basic Info
    When Enter Experice Code
    When Choose Country Choose State and Choose City
    When Select Experience Type
    When Select Theme That Describe Experice
    When Select Categories That Describe Experience
    And Click on Save And Next Button

    When Select Traveller Experience
    When Select Image of Experience
    When Enter Video Link
    And Click on Save and Next Button

    Then in Avaibility Date and time and Click on Save
    When in Booking Cutoff Enter Week,Days,Hour and Minute
    When Click on Relative to Start Time and Click on Save
    When In Capacity Click on Save 
    When Start Time Click on Add Start-Time -Duration
    Then Enter Time, Hours , Minutes and click Save Button 
    When Calender , Add Avaibility , Veiw Avaibility and Save
    When Pick And Drop - Select experience pickup places and Dropoff places
    When Incluson and Exclusion - Select include Experience and not include Experience
    When Important Info- Select luggage available tour, Age Range , What to Bring , Cancelaltion Policy

    When Know Before You Go - What should Traveller, Physicall Difficulty,Age Limit
    When Route - Description
    When Pricing - Enter Code, Title, Languages, Cancellation Policy, Start Time and Duration
    When Extra - Max Unit, Description, Advance Setting And Save
    When Tasks & Resources - Add Title, Description, Time and Faq




    
    Then the Tour should be created successfully 