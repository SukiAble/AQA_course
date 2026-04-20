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


  await registerPage.openLoginPage();

  await registerPage.fillRegistrationForm(NewUser1);

  await loginPage.login(NewUser1.Email, NewUser1.Password);

  const items = await catalogPage.selectproduct();
          await expect(catalogPage.basketCounter).toHaveText('2');

  await catalogPage.gotoBasket();


  const basketpage = new basketPage(page);
          await expect(basketpage.firstProductItem).toHaveText(items.firstProduct.name);
          await expect(basketpage.secondProductItem).toHaveText(items.secondProduct.name);
          await expect(basketpage.firstProductPrice).toHaveText(items.firstProduct.price);
          await expect(basketpage.secondProductPrice).toHaveText(items.secondProduct.price);

const firstProductPriceNumber = Number((await basketpage.firstProductPrice.innerText()).replace(/\D/g, ''));
const secondProductPriceNumber = Number((await basketpage.secondProductPrice.innerText()).replace(/\D/g, ''));
console.log('First Product Price:', firstProductPriceNumber);
console.log('Second Product Price:', secondProductPriceNumber);
const totalNumber = parseInt((await basketpage.totalPrice.innerText()).replace(/[^\d.]/g, ''), 10);
console.log('Total Price:', totalNumber);
expect(totalNumber).toBe(firstProductPriceNumber + secondProductPriceNumber);

await basketpage.checkTotalPrice();

  await CheckoutPage.fillCardDetails(cardData.CardNumber, cardData.CardCvv, cardData.CardDate);
          await expect(CheckoutPage.successOrder).toBeVisible({ timeout: 10000 });
          await expect(CheckoutPage.page).toHaveURL('/checkout');

  await CheckoutPage.goToMyAccount();
          await expect(CheckoutPage.page).toHaveURL('/account');


const totalPrice = Number(items.firstProduct.price.replace('$', '')) + Number(items.secondProduct.price.replace('$', ''));
console.log('Calculated total price:', totalPrice);
await expect(MyAccountPage.totalAmountField).toContainText(`${totalPrice}`);

await expect(MyAccountPage.items.first()).toBeVisible();
await expect(MyAccountPage.items.last()).toBeVisible();
await expect(MyAccountPage.logoutButton).toBeEnabled();

await MyAccountPage.logout();

});