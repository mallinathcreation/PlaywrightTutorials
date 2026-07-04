const { LoginPage } = require('../pageobjects/loginpage');
const { DashboardPage } = require('../pageobjects/DashboardPage');
const { CartPage } = require('../pageobjects/CartPage');
const { OrdersReviewPage } = require('../pageobjects/OdersReviewPage');
const { OrdersHistoryPage } = require('../pageobjects/OrdersHistoryPage');

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(this.page);
        this.ordersReviewPage = new OrdersReviewPage(this.page);
        this.ordersHistoryPage = new OrdersHistoryPage(this.page);
    }

    getLoginPage() {
        return this.loginPage;
    }
    getDashboardPage() {
        return this.dashboardPage;
    }
    getCartPage() {
        return this.cartPage;
    }
    getOrdersReviewPage() {
        return this.ordersReviewPage;
    }
    getOrdersHistoryPage() {
        return this.ordersHistoryPage;
    }


}
module.exports = { POManager };