Feature: Alumni profile persistence

  Background: The environment is ready to work
    Given service that has a Dao

    ## photo, cv.
    ##
  Scenario Outline: The alumni profile is created and retrieved
    Given  an alumni profile with <telephone> <alternativeTelephone> <maximumEducationLevel> <pescarCenter> <counselor> <graduationYear>
    When the alumni profile is created
    Then the alumni profile has <telephone> <alternativeTelephone> <maximumEducationLevel> <pescarCenter> <counselor> <graduationYear>


    Examples:
      | telephone | alternativeTelephone | maximumEducationLevel | pescarCenter | counselor | graduationYear |
      | 45829675  | 47827463             | collegue              | La Plata     | Manu      | 2006           |
      | 48294618  | 48392019             | highschool            | Quilmes      | Lu        | 2017           |

  Scenario Outline: The alumni profile with a current job is created and retrieved
    Given an alumni profile
    And works in <jobDesignation> <workingHours> <grossSalary>
    When the alumni profile is created
    Then the profile has a work with <jobDesignation> <workingHours> <grossSalary>

    Examples:
      | jobDesignation | workingHours | grossSalary |
      | Teacher        | 12           | 20000       |
      | Singer         | 4            | 70000       |

  Scenario Outline: The alumni profile with a job history is created and retrieved
    Given an alumni profile
    And  a job history with <jobHistoryDesignation> <jobDesignationWorkingHours> <jobHistoryGrossSalary>
    When the alumni profile is created
    Then the profile has a history job with <jobHistoryDesignation> <jobDesignationWorkingHours> <jobHistoryGrossSalary>

    Examples:
      | jobHistoryDesignation | jobDesignationWorkingHours | jobHistoryGrossSalary |
      | Fisher                | 20                         | 2                     |
      | Mason                 | 2                          | 100000                |


  Scenario Outline: The alumni profile with a current study is created and retrieved
    Given an alumni profile
    And study in <instituteName> <fieldStudy> <yearStudy> and <scholarship>
    When the alumni profile is created
    Then the profile has a study with <instituteName> <fieldStudy> <yearStudy> <scholarship>

     Examples:
      | instituteName   | fieldStudy | yearStudy | scholarship |
      | Piave Institute | Economics  | 2004      | false       |
      | Marista         | Insight    | 1990      | true        |


  Scenario Outline: The alumni profile with a study history is created and retrieved
    Given an alumni profile
    And a study history with <instituteName> <fieldStudy> <yearStudy> and <scholarship>
    When the alumni profile is created
    Then the profile has a study history with <instituteName> <fieldStudy> <yearStudy> <scholarship>

    Examples:
      | instituteName   | fieldStudy | yearStudy | scholarship |
      | Piave Institute | Economics  | 2004      | false       |
      | Marista         | Insight    | 1990      | true        |