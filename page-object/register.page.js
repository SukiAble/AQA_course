export class RegisterPage {
    constructor(page) {
        this.page = page;
        this.registerButton = page.locator('[id="login-register-button"]');
        this.FirstName = page.locator('[id="register-first-name"]');
        this.LastName = page.locator('[id="register-last-name"]');
        this.Email = page.locator('[id="register-email"]');
        this.Password = page.locator('[id="register-password"]');
        this.City = page.locator('[id="register-city"]');
        this.Country = page.locator('[id="register-country"]');
        this.Phone = page.locator('[id="register-phone"]');
        this.Street = page.locator('[id="register-street"]');
        this.Zip = page.locator('[id="register-zip"]');
        this.SubmitRegister = page.locator('[id="register-button"]');
    }

    async navigate(){
        await this.page.goto('https://aqa-app.vercel.app/login');
    }

    async fillRegistrationForm(NewUser1){
        await this.registerButton.click();
        await this.FirstName.fill(NewUser1.FirstName);
        await this.LastName.fill(NewUser1.LastName);
        await this.Email.fill(NewUser1.Email);
        await this.Password.fill(NewUser1.Password);
        await this.City.fill(NewUser1.City);
        await this.Country.selectOption(NewUser1.Country);
        await this.Phone.fill(NewUser1.Phone);
        await this.Street.fill(NewUser1.Street);
        await this.Zip.fill(NewUser1.Zip);
        await this.SubmitRegister.click();
    }
}