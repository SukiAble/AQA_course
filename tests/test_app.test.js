import { test } from '@playwright/test';
import { RegisterPage } from '../page-object/register.page';
import { NewUser1 } from '../data/testData';
import { LoginPage } from '../page-object/login.page';
import { CatalogPage } from '../page-object/catalog.page';
import { basketPage } from '../page-object/basket.page';
import { checkoutPage } from '../page-object/checkout.page';
import { cardData } from '../data/testData';
import { myAccountPage } from '../page-object/myAccount.page';

test.setTimeout(60000); // Set a longer timeout for the test
test('test', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);
  const catalogPage = new CatalogPage(page);
  const CheckoutPage = new checkoutPage(page);
  const MyAccountPage = new myAccountPage(page);


  await registerPage.navigate();
  await registerPage.fillRegistrationForm(NewUser1);
  await loginPage.login(NewUser1.Email, NewUser1.Password);
  await catalogPage.selectproduct();

  const basketpage = new basketPage(page, catalogPage.tabletNameValue, catalogPage.coffeeMachineNameValue, catalogPage.tabletPriceValue, catalogPage.coffeeMachinePriceValue );

  await basketpage.compareProductsDetails();

  await basketpage.checkTotalPrice();

  await CheckoutPage.fillCardDetails(cardData.CardNumber, cardData.CardCvv, cardData.CardDate);

  await CheckoutPage.successOrderMessage();

  await CheckoutPage.goToMyAccount();

  await MyAccountPage.checkFinalOrder(catalogPage.tabletPriceValue, catalogPage.coffeeMachinePriceValue);

  await MyAccountPage.checkTwoItems();

  await MyAccountPage.logout();

});