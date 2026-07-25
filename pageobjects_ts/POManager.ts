import { LoginPage } from '../pageobjects_ts/LoginPage';
import { DashboardPage } from '../pageobjects_ts/DashboardPage';
import { CartPage } from '../pageobjects_ts/CartPage';
import { OrdersReviewPage } from '../pageobjects_ts/OdersReviewPage';
import { OrdersHistoryPage } from '../pageobjects_ts/OrdersHistoryPage';
import { Page} from '@playwright/test';

export class POManager {

    page: Page;
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    cartPage: CartPage;
    ordersReviewPage: OrdersReviewPage;
    ordersHistoryPage: OrdersHistoryPage;

    constructor(page: Page) {
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