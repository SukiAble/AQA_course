import { expect } from "@playwright/test";

export class checkoutPage {
    constructor(page) {
        this.page = page;
        this.cardNumberField = page.getByPlaceholder('Card Number (16 digits)');
        this.payNowButton = page.getByText('Pay Now');
        this.payNowBtn = page.getByRole('button', { name: 'Pay Now' });
        this.cardDateField = page.getByPlaceholder('MM/YY');
        this.cardCvvField = page.getByPlaceholder('CVV');
        this.successOrder = page.locator('[id="checkout-success"]');
        this.myAccountButton = page.locator('[href="/account"]');
    
    }

    async fillCardDetails(cardNumber, cardCvv, cardDate) {
        await this.cardNumberField.type(cardNumber, { delay: 100 });
        await this.cardNumberField.press('Enter');
        await this.cardDateField.fill(cardDate);
        await this.cardCvvField.fill(cardCvv);
        
        //await this.payNowButton.nth(7).click();
        //await this.payNowBtn.last().click();
        
        await this.payNowBtn.click();
    }

    async successOrderMessage() {
        await expect(this.successOrder).toBeVisible({ timeout: 10000 });
        await expect(this.page).toHaveURL('https://aqa-app.vercel.app/checkout');
    }

    async goToMyAccount() {
        await this.myAccountButton.click();
        await expect(this.page).toHaveURL('https://aqa-app.vercel.app/account');
    }
}
