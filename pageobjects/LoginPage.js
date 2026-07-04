class LoginPage {

    constructor(page) {

        this.page = page;
        this.signInButton = page.locator("#login");
        this.username = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async validLogin(username, password) {
        await this.username.fill(username);
        await this.password.type(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/client/');
    }



}
module.exports = { LoginPage };