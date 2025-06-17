const TIMEOUTS = require('../constants/timeouts');
const MESSAGES = require('../constants/messages');
const timeouts = require('../constants/timeouts');

class LoginPage {
    get email() { return $('#email'); }
    get password() { return $('#pass'); }
    get signInBtn() { return $('#send2'); }
    get pageTitle() { return $('h1.page-title > span'); }

    async open() {
        await browser.url('/customer/account/login/');

        await this.pageTitle.waitUntil(async function () {
            return await this.isDisplayed();
        }, {
            timeout: TIMEOUTS.wait.loginPageLoad,
            timeoutMsg: MESSAGES.timeouts.loginTitleNotVisible
        });
    }

    async login(email, password) {
        await this.email.setValue(email);
        await this.password.setValue(password);

        await this.signInBtn.waitUntil(async function () {
            return await this.isClickable();
        }, {
            timeout: TIMEOUTS.wait.medium,
            timeoutMsg: MESSAGES.timeouts.signInNotClickable
        });

        await this.signInBtn.click();
    }
}

module.exports = new LoginPage();