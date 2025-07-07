Feature: Add Accommodation

  Scenario: Admin Add Accommodation
    Given I am logged in as admin Accommodation
    Then Select Accommodation and Click on Add Products
    When Basic Info - Enter Experience Code, Select Experience Theme, Categories Experience , Address, country, States, City, Postal Code
    When Media & Description- Traveller Experience, Photos Experience, Videos Experience
    When Important Info- Age Range, Want to Bring, Cancellation Policy, Child, Smoking, Parties and Pets
    When Room - Click Add Room, Code, Title & Description, Room Type, Room Category, Room Attribute, Amenities, Number of People, types of room, Close Room
    When Incluson & Exclusion- Select Include Experience and Select not Inculde Experience
    When Booking Off- Enter Weeks, Days, Hours, Minutes And Click on Save
    When Check In & Check out Time- Add Time
    When Calender- Click Add Avaibiliy, Select Avaibility Rule,Select End Date, Affected Days, Select Rule Color,And Click on Save
    When Pricing- Add Rate- Enter Code , Title, Start Date, End Date, Description, and Save
    When Task & Resources- Click on Add Task, Enter Title Task , Description, Start Time,  and Click on Save
    When Select Action and Activate
    When Delete Added Data

    