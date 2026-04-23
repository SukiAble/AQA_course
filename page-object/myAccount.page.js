import { expect } from '@playwright/test';
import { AbstractPage } from './Abstract.page';


export class myAccountPage extends AbstractPage {
    constructor(page) {
        super(page);
        this.items = page.locator('#account-order-0 ul > li')
        this.totalAmountField = page.locator('#account-order-0 p', { hasText: 'Total Amount:' });
        this.logoutButton = page.locator('[id="account-logout-button"]');
    }

    async logout() {
        await this.logoutButton.click();
        await expect(this.page).toHaveURL('/login');
    }

}