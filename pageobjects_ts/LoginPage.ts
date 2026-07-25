import { Page, Locator } from '@playwright/test';

export class LoginPage {

    page: Page;
    signInButton: Locator;
    username: Locator;
    password: Locator;

    constructor(page: Page) {

        this.page = page;
        this.signInButton = page.locator("#login");
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async validLogin(username: string, password: string) {
        await this.username.fill(username);
        await this.password.type(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }



}