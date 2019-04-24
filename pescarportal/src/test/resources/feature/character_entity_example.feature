Feature: Character entity example

  Background: The environment is setup
    Given There is a controller service and Dao ready to be used

  Scenario Outline: A character is created saved and retrieved
    Given a character with <name> <class> <life> and <money>
    And   the item with <item name> and <attack value>
    And   it equips the item
    When and the characters is saved in the characterService
    And   the character is retrieved
    Then  the character retrieved has the same <name> <class> <life> and <money>
    And   the retrieved character has the same sword with <item name> and <attack value>
    Examples:
      | name    | class   |  life | money | item name | attack value |
      | maguito | mago    |  10   | 23    | baston    | 20           |
      | Ivan    | truhan  |  15   | 0     | lentes    | 0            |
      | Roque   | paladin |  30   | 20    | reliquia  | 50           |

  Scenario Outline: A character is requested through our rest controller
    Given a character with <name> <class> <life> and <money>
    And the item with <item name>  and  <attackValue>
    And it equips the item
    When and the characters is saved in the characterService
    And a client sends a Get rest call for the character
    And a 401 message status code is returned and a message with the character with <name> <class> <life> and <money> is returned
    Examples:
      | name    | class   |  life | money | item name | attackValue |
      | maguito | mago    |  10   | 23    | baston    | 20           |
      | Ivan    | truhan  |  15   | 0     | lentes    | 0            |
      | Roque   | paladin |  30   | 20    | reliquia  | 50           |



  Scenario Outline: A character is posted through our rest controller
    Given a character with <name> <class> <life> and <money>
    When a client sends a POST rest call with the character
    And a 201 status code is returned and the character is in the database
    Examples:
      | name    | class   |  life | money |
      | maguito | mago    |  10   | 23    |
      | Ivan    | truhan  |  15   | 0     |
      | Roque   | paladin |  30   | 20    |

