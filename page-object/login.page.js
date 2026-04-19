export class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailField = page.locator('[id="login-email"]');
        this.passwordField = page.locator('[id="login-password"]');
        this.loginButton = page.locator('[id="login-button"]');
        this.myAccountButton = page.locator('[id="nav-account"]');
    }

    async login(email, password) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.loginButton.click();
        await this.myAccountButton.waitFor();
    }
}