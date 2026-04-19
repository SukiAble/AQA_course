import { expect } from '@playwright/test';

export class basketPage {
    constructor(page, tabletNameValue, coffeeMachineNameValue, tabletPriceValue, coffeeMachinePriceValue) {
        this.page = page;
        this.firstProductItem = page.locator('[id="cart-item-name-5"]');
        this.secondProductItem = page.locator('[id="cart-item-name-6"]');

        this.firstProductPrice = page.locator('[id="cart-item-price-5"]');
        this.secondProductPrice = page.locator('[id="cart-item-price-6"]');

        this.totalPrice = page.locator('[id="cart-total"]');
        this.checkoutButton = page.locator('[id="cart-checkout-button"]');

        this.addFirstItemButton = page.locator('[id="cart-item-increase-5"]');
        this.removeFirstItemButton = page.locator('[id="cart-item-decrease-5"]');

        this.tabletNameValue = tabletNameValue;
        this.coffeeMachineNameValue = coffeeMachineNameValue;
        this.tabletPriceValue = tabletPriceValue;
        this.coffeeMachinePriceValue = coffeeMachinePriceValue;
    }

    async compareProductsDetails() {
        await expect(this.firstProductItem).toHaveText(this.tabletNameValue);
        await expect(this.secondProductItem).toHaveText(this.coffeeMachineNameValue);
        await expect(this.firstProductPrice).toHaveText(this.tabletPriceValue);
        await expect(this.secondProductPrice).toHaveText(this.coffeeMachinePriceValue);
    }

    async checkTotalPrice() {
        //const firstProductPrice = parseFloat(this.tabletPriceValue.replace('$', ''));
        //const secondProductPrice = parseFloat(this.coffeeMachinePriceValue.replace('$', ''));
        //const expectedTotalPrice = (firstProductPrice + secondProductPrice).toFixed(2);
        //const actualTotalPrice = await this.totalPrice.innerText();
        //const actualTotalPriceValue = parseFloat(actualTotalPrice.replace('Total: $', '')).toFixed(2);
        //expect(actualTotalPriceValue).toBe(expectedTotalPrice);
        const firstProductPriceNumber = Number((await this.firstProductPrice.innerText()).replace(/\D/g, ''));
        const secondProductPriceNumber = Number((await this.secondProductPrice.innerText()).replace(/\D/g, ''));
        console.log('First Product Price:', firstProductPriceNumber);
        console.log('Second Product Price:', secondProductPriceNumber);

        const totalNumber = parseInt((await this.totalPrice.innerText()).replace(/[^\d.]/g, ''), 10);
        console.log('Total Price:', totalNumber);

        expect(totalNumber).toBe(firstProductPriceNumber + secondProductPriceNumber);
       
        await this.checkoutButton.click();
        await this.page.waitForURL('https://aqa-app.vercel.app/checkout');
    }
}