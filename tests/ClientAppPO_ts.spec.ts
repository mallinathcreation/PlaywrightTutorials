import { test, expect } from '@playwright/test';
import { customtest } from '../Utils_ts/test-base';
import { POManager } from '../pageobjects_ts/POManager';
declare const require: any;
const dataSet = JSON.parse(JSON.stringify(require("../Utils_ts/PlaceOrderTestData.json")));

for (const data of dataSet) {

    test(`@web Client App Login for ${data.productName}`, async ({ page }) => {

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
        let orderId: any;
        orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);

        await dashboardPage.navigateToOrders();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

    });
}

customtest('Client App Login', async ({ page, testDataForOrder }) => {

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