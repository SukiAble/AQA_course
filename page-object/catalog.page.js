import { expect } from "@playwright/test";

export class CatalogPage {
    constructor(page) {
        this.page = page;
        this.coffeeMachineProduct = page.locator('[id="product-add-6"]');
        this.tabletProduct = page.locator('[id="product-add-5"]');
        this.basketCounter = page.locator('[id="cart-count"]');

        this.tabletName = page.locator('[id="product-name-5"]');
        this.coffeeMachineName = page.locator('[id="product-name-6"]');
        this.tabletPrice = page.locator('[id="product-price-5"]');
        this.coffeeMachinePrice = page.locator('[id="product-price-6"]');

        this.tabletNameValue = '';
        this.coffeeMachineNameValue = '';
        this.tabletPriceValue = '';
        this.coffeeMachinePriceValue = '';
    }

async selectproduct() {
        await this.coffeeMachineProduct.click();
        await this.tabletProduct.click();
        //await expect(this.tabletProduct).toHaveText("Remove from Basket");
        //const basketCount = await this.basketCounter.innerText();
        await expect(this.basketCounter).toHaveText('2');
        await this.saveProductinfo();
        await this.basketCounter.click();
    }

async saveProductinfo() {
    this.tabletNameValue = await this.tabletName.innerText();
    this.coffeeMachineNameValue = await this.coffeeMachineName.innerText();
    this.tabletPriceValue = await this.tabletPrice.innerText();
    this.coffeeMachinePriceValue = await this.coffeeMachinePrice.innerText();

    console.log('Tablet Name:', this.tabletNameValue);
    console.log('Coffee Machine Name:', this.coffeeMachineNameValue);
    console.log('Tablet Price:', this.tabletPriceValue);
    console.log('Coffee Machine Price:', this.coffeeMachinePriceValue);
    }
}