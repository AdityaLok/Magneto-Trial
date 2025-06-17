class LoginPage {
    get email() { return $('#email'); }
    get password() { return $('#pass'); }
    get signInBtn() { return $('#send2'); }

    async login(email, pass) {
        await this.email.setValue(String(email));
        await this.password.setValue(pass);
        await this.signInBtn.click();
    }

    async open() {
        await browser.url('/customer/account/login/');
    }
}

module.exports = new LoginPage();