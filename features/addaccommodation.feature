Feature: Add Accommodation

  Scenario: Admin Add Accommodation
    Given I am logged in as admin Accommodation
    Then Select Accommodation and Click on Add Products
    When Basic Info - Enter Experience Code, Select Experience Theme, Categories Experience , Address, country, States, City, Postal Code
    When Media & Description- Traveller Experience, Photos Experience, Videos Experience
    When Important Info- Age Range, Want to Bring, Cancellation Policy, Child, Smoking, Parties and Pets
    When Room - Click Add Room, Code, Title & Description, Room Type, Room Category, Room Attribute, Amenities, Number of People, types of room, Close Room
    When Incluson & Exclusion- Select Include Experience and Select not Inculde Experience  

    