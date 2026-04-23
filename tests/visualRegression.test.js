import {expect, test} from '@playwright/test';
import { devices } from '@playwright/test';
import {LoginPage} from '../page-object/login.page';
import {AbstractPage} from '../page-object/Abstract.page';

test.describe('Visual Regression Tests', () => {

test('Login page -visual regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const abstractPage = new AbstractPage(page);
    await loginPage.openPage('/login');
    await abstractPage.checkVisualRegression('login-page.png', { maxDiffPixelRatio: 0.01 });
    });

test('Catalog page -visual regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const abstractPage = new AbstractPage(page);
    await loginPage.openPage('/');
    await abstractPage.checkVisualRegression('catalog-page.png', { maxDiffPixels: 100 });
    });

test('Basket page -visual regression', async ({ page }) => {
    const abstractPage = new AbstractPage(page);
    await abstractPage.openPage('/cart');
    await abstractPage.checkVisualRegression('basket-page.png', { maxDiffPixelRatio: 0.01 });
    });

test('Register page -visual regression', async ({ page }) => {
    const abstractPage = new AbstractPage(page);
    await abstractPage.openPage('/register');
    await abstractPage.checkVisualRegression('register-page.png', { fullPage: true, animations: 'disabled' });
    });

});