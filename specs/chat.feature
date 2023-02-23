#language: en

Feature: Chat
    As a user interested in connect to new business
    I should be able to send messages and be contacted by such business
    In order to buy new things or order services from these companies

    Background: Home Page
        Given I have accessed the "https://demo.podium.tools/qa-webchat-lorw/"
        When I click the "Text us" button
        Then the Podium Chat should open

    @smoke @healthCheck
    # This test scenario is tagged as smoke because the user should be
    # able to contact the business through chat.
    # If this test fail, then the business core is affected,
    # since the customers and business won't be able contact eachother
    Scenario: Submit a valid form
        Given I selected the "Scoreboard Sports - Bountiful"
        When I submit a valid contact form with:
            | name    | Gabriel Almeida                                                           |
            | phone   | +55 11 95441 9893                                                         |
            | message | I would like to buy some new running shoes. Do you have something for me? |
        Then I should contact the ne business successfully.

    @smoke
    # This test scenario is tagged as smoke because the user should be
    # able to search for business near him. Without it, the user may lose interest in the plataform
    # and will search for customers outside podium environment / products
    Scenario: Search business by address
        Given I search for "Rua Adalberto Pereira Gomes, 88"
        Then I should see all the business near that address

    @smoke
    # This test scenario is tagged as smoke because the user should be
    # able to search for business near him. Without it, the user may lose interest in the plataform
    # and will search for customers outside podium environment / products
    Scenario: Search business by postal code
        Given I search for "06856790"
        Then I should see all the business near that address

    @regression
    # This test scenario is taggged as regression, because it one of them fails, it doesn't generate losses
    # to the core business. Even though if submitted, these scenarios will generate at most an chat with parcial information about the customer
    # and the user could provide this information while chatting with the business.
    # Therefore, the core of Podium's app still works, the user is connected with the business successfully.
    Scenario Outline: Attempt to start a new chat with:
        Given I selected the "Scoreboard Sports - Narnia"
        When I attempt to submit a form with:
            | name    | <name>         |
            | phone   | <phone_number> |
            | message | <message>      |
        Then I should see the error message "<error_message>"

        Examples:
            | scenario_name                          | <name> | <phone_number                  | <message>          | <error_message>                                     |
            | Invalid Phone Number                   | Gabs   | +1 555 512 521                 | Hello World!       | Please enter a phone number that can receive texts. |
            | Invalid Name                           | *#@$@$ | +1 555 512 521                 | Hello World!       | ???                                                 |
            | Phone Number Too Long                  | Gabs   | 123123213123123131231312231231 | Hello World!       | Mobile phone is too long                            |
            | Message size bigger than message limit | Gabs   | +55 11 95441 9893              | <400 CHAR MESSAGE> | Message limit of 300 characters                     |

    @regression
    # This test scenario is taggged as regression, because it one of them fails, it doesn't generate losses
    # to the core business. Even though if submitted, these scenarios will generate at most an chat with parcial information about the customer
    # and the user could provide this information while chatting with the business.
    # Therefore, the core of Podium's app still works, the user is connected with the business successfully.
    Scenario Outline: Attempt to start a new chat with empty fiields:
        Given I selected the "Scoreboard Sports - Narnia"
        When I attempt to submit a form with:
            | name    | <name>         |
            | phone   | <phone_number> |
            | message | <message>      |
        Then the submit button should be disabled

        Examples:
            | scenario_name      | <name>          | <phone_number     | <message>    |
            | Empty Name         | {EMPTY}         | +55 11 95441 9893 | Hello World! |
            | Empty Phone Number | Gabriel Almeida | {EMPTY}           | Hello World! |
            | Empty Message      | Gabriel Almeida | +55 11 95441 9893 | {EMPTY}      |
            | Form Not Submited  | {EMPTY}         | {EMPTY}           | {EMPTY}      |