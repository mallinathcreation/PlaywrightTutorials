const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { POManager } = require('../../pageObjects/POManager');
const playwright = require('@playwright/test');

Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (email, password) {
    // Write code here that turns the phrase above into concrete actions

    this.poManager = new POManager(this.page);
    this.loginPage = this.poManager.getLoginPage();
    await this.loginPage.goTo();
    await this.loginPage.validLogin(email, password);

    this.dashboardPage = this.poManager.getDashboardPage();
});

When('Add {string} to cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    await this.dashboardPage.searchProductAndAddToCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.cartPage = this.poManager.getCartPage();
    await this.cartPage.VerifyProductIsDisplayed(productName);
    await this.cartPage.Checkout();
});

When('Enter valid details and place the order', async function () {
    // Write code here that turns the phrase above into concrete actions
    this.ordersReviewPage = this.poManager.getOrdersReviewPage();
    await this.ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await this.ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('Verify order is present in the order history', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});

Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await this.page.locator('#username').type(username);
    await this.page.locator("[type='password']").type(password);
    await this.page.locator('#signInBtn').click();
});

Then('Verify login error message is displayed', async function () {
    // Write code here that turns the phrase above into concrete actions
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});
