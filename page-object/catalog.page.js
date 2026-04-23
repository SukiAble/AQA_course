import { expect } from "@playwright/test";
import { AbstractPage } from './Abstract.page';


export class CatalogPage extends AbstractPage {
    constructor(page) {
        super(page);
        this.coffeeMachineProduct = page.locator('[id="product-add-6"]');
        this.tabletProduct = page.locator('[id="product-add-5"]');
        this.basketCounter = page.locator('[id="cart-count"]');

        this.tabletName = page.locator('[id="product-name-5"]');
        this.coffeeMachineName = page.locator('[id="product-name-6"]');
        this.tabletPrice = page.locator('[id="product-price-5"]');
        this.coffeeMachinePrice = page.locator('[id="product-price-6"]');

    }

async selectproduct() {
        await this.coffeeMachineProduct.click();
        await this.tabletProduct.click();
        //await expect(this.tabletProduct).toHaveText("Remove from Basket");
        //const basketCount = await this.basketCounter.innerText();
        const itemsInfo = await this.getProductinfo();
        return itemsInfo;
    }

async gotoBasket() {
        await this.basketCounter.click();
    }

async getProductinfo() {
    return {
        firstProduct: {
            name: await this.tabletName.innerText(),
            price: await this.tabletPrice.innerText()
        },
        secondProduct: {
            name: await this.coffeeMachineName.innerText(),
            price: await this.coffeeMachinePrice.innerText()
        }
    }

    //this.tabletNameValue = await this.tabletName.innerText();
    //this.coffeeMachineNameValue = await this.coffeeMachineName.innerText();
    //this.tabletPriceValue = await this.tabletPrice.innerText();
    //this.coffeeMachinePriceValue = await this.coffeeMachinePrice.innerText();

    console.log('Tablet Name:', this.tabletNameValue);
    console.log('Coffee Machine Name:', this.coffeeMachineNameValue);
    console.log('Tablet Price:', this.tabletPriceValue);
    console.log('Coffee Machine Price:', this.coffeeMachinePriceValue);
    }
}