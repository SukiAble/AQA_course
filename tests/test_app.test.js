import { expect, test } from '@playwright/test';
import { RegisterPage } from '../page-object/register.page';
import { NewUser1 } from '../data/testData';
import { LoginPage } from '../page-object/login.page';
import { CatalogPage } from '../page-object/catalog.page';
import { basketPage } from '../page-object/basket.page';
import { checkoutPage } from '../page-object/checkout.page';
import { cardData } from '../data/testData';
import { myAccountPage } from '../page-object/myAccount.page';

test.setTimeout(60000); // Set a longer timeout for the test
test('Create user, login, order 2 items, payment', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const catalogPage = new CatalogPage(page);
  const CheckoutPage = new checkoutPage(page);
  const MyAccountPage = new myAccountPage(page);

let items;
let basketpage;

await test.step("Open login page", async () => {
  await registerPage.openLoginPage();
});

await test.step("Register new user", async () => {
  await registerPage.fillRegistrationForm(NewUser1);
});

await test.step("Login with new user", async () => {
  await loginPage.login(NewUser1.Email, NewUser1.Password);
});

await test.step("Select 2 items and check basket counter", async () => {
  items = await catalogPage.selectproduct();
          await expect(catalogPage.basketCounter).toHaveText('2');
});

await test.step("Go to basket", async () => {
  await catalogPage.gotoBasket();
  });

await test.step("Check items in basket", async () => {
  basketpage = new basketPage(page);
          await expect(basketpage.firstProductItem).toHaveText(items.firstProduct.name);
          await expect(basketpage.secondProductItem).toHaveText(items.secondProduct.name);
          await expect(basketpage.firstProductPrice).toHaveText(items.firstProduct.price);
          await expect(basketpage.secondProductPrice).toHaveText(items.secondProduct.price);
});


await test.step("Check total price", async () => {
        const firstProductPriceNumber = Number((await basketpage.firstProductPrice.innerText()).replace(/\D/g, ''));
        const secondProductPriceNumber = Number((await basketpage.secondProductPrice.innerText()).replace(/\D/g, ''));
        console.log('First Product Price:', firstProductPriceNumber);
        console.log('Second Product Price:', secondProductPriceNumber);
        const totalNumber = parseInt((await basketpage.totalPrice.innerText()).replace(/[^\d.]/g, ''), 10);
        console.log('Total Price:', totalNumber);
        expect(totalNumber).toBe(firstProductPriceNumber + secondProductPriceNumber);
});

await test.step("Go to checkout page", async () => {
        await basketpage.goToCheckoutPage();
});


await test.step("Fill card details and submit payment", async () => {
  await CheckoutPage.fillCardDetails(cardData.CardNumber, cardData.CardCvv, cardData.CardDate);
});

await test.step("Verify order success and navigate to My Account", async () => {
          await expect(CheckoutPage.successOrder).toBeVisible({ timeout: 10000 });
          await expect(CheckoutPage.page).toHaveURL('/checkout');
});

await test.step("Go to My Account page", async () => {
  await CheckoutPage.goToMyAccount();
          await expect(CheckoutPage.page).toHaveURL('/account');
});

await test.step("Verify order details in My Account", async () => {
        const totalPrice = Number(items.firstProduct.price.replace('$', '')) + Number(items.secondProduct.price.replace('$', ''));
        console.log('Calculated total price:', totalPrice);
        await expect(MyAccountPage.totalAmountField).toContainText(`${totalPrice}`);
});

await test.step("Verify items and logout button visibility", async () => {
        await expect(MyAccountPage.items.first()).toBeVisible();
        await expect(MyAccountPage.items.last()).toBeVisible();
        await expect(MyAccountPage.logoutButton).toBeEnabled();
});

await test.step("Logout", async () => {
        await MyAccountPage.logout();
});

});