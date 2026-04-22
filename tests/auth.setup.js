import {test} from '@playwright/test';
import { RegisterPage } from '../page-object/register.page';
import { NewUser1 } from '../data/testData';
import { LoginPage } from '../page-object/login.page';

test('setup: login and save storageState', async ({page, context}) => {
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);


    await test.step("Open login page", async () => {
      await registerPage.openLoginPage();
    });
    
    await test.step("Register new user", async () => {
      await registerPage.fillRegistrationForm(NewUser1);
    });
    
    await test.step("Login with new user", async () => {
      await loginPage.login(NewUser1.Email, NewUser1.Password);
    });

    await test.step("Save storage state", async () => {
        await context.storageState({ path: 'data/storageState.json' });
    });
});
