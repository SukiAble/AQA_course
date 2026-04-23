import { expect } from '@playwright/test';
import { AbstractPage } from './Abstract.page';

export class basketPage extends AbstractPage {
    constructor(page, tabletNameValue, coffeeMachineNameValue, tabletPriceValue, coffeeMachinePriceValue) {
        super(page);
        this.firstProductItem = page.locator('[id="cart-item-name-5"]');
        this.secondProductItem = page.locator('[id="cart-item-name-6"]');

        this.firstProductPrice = page.locator('[id="cart-item-price-5"]');
        this.secondProductPrice = page.locator('[id="cart-item-price-6"]');

        this.totalPrice = page.locator('[id="cart-total"]');
        this.checkoutButton = page.locator('[id="cart-checkout-button"]');

        this.addFirstItemButton = page.locator('[id="cart-item-increase-5"]');
        this.removeFirstItemButton = page.locator('[id="cart-item-decrease-5"]');

    }


    async goToCheckoutPage() {
        //const firstProductPrice = parseFloat(this.tabletPriceValue.replace('$', ''));
        //const secondProductPrice = parseFloat(this.coffeeMachinePriceValue.replace('$', ''));
        //const expectedTotalPrice = (firstProductPrice + secondProductPrice).toFixed(2);
        //const actualTotalPrice = await this.totalPrice.innerText();
        //const actualTotalPriceValue = parseFloat(actualTotalPrice.replace('Total: $', '')).toFixed(2);
        //expect(actualTotalPriceValue).toBe(expectedTotalPrice);
       
        await this.checkoutButton.click();
        await this.page.waitForURL('/checkout');
    }
}