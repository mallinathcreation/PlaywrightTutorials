const { test, expect } = require('@playwright/test');
const { customtest } = require('../utils/test-base');
const { POManager } = require('../pageobjects/POManager');
const dataSet = JSON.parse(JSON.stringify(require("../utils/PlaceOrderTestData.json")));

for(const data of dataSet){
test(`Client App Login for ${data.productName}`, async ({ page }) => {

    const poManager = new POManager(page);
    const email = data.username;
    const password = data.password;
    const productName = data.productName;

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(email, password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAndAddToCart(productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);

    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

});
}

customtest.only('Client App Login', async ({ page , testDataForOrder}) => {

    const poManager = new POManager(page);
    const email = testDataForOrder.username;
    const password = testDataForOrder.password;
    const productName = testDataForOrder.productName;

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(email, password);

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAndAddToCart(productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

});