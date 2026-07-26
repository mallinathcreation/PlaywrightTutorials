Feature: : Ecommerce Validations
    @Regression
    Scenario: Placing the order
        Given a login to Ecommerce application with "mbasu@gmail.com" and "Mbasu@123"
        When Add "ZARA COAT 3" to cart
        Then Verify "ZARA COAT 3" is displayed in the cart
        When Enter valid details and place the order
        Then Verify order is present in the order history