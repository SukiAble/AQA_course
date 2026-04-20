import { expect } from '@playwright/test';

export class myAccountPage {
    constructor(page) {
        this.page = page;
        this.items = page.locator('#account-order-0 ul > li')
        this.totalAmountField = page.locator('#account-order-0 p', { hasText: 'Total Amount:' });
        this.logoutButton = page.locator('[id="account-logout-button"]');
    }

    async logout() {
        await this.logoutButton.click();
        await this.page.pause();
        await expect(this.page).toHaveURL('/login');
    }

}