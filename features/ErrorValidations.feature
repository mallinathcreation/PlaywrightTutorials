Feature: : Ecommerce2 Validations
    @validations
    Scenario Outline: Login error validation
        Given a login to Ecommerce2 application with "<email>" and "<password>"
        Then Verify login error message is displayed
        Examples:
            | email             | password     |
            | mbasu@gmail.com   | Mbasu@123    |
            | john.doe@gmail.com | John@123     |