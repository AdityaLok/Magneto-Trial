const TIMEOUTS = require('../constants/timeouts');
const MESSAGES = require('../constants/messages');


class RegisterPage {
    get firstName() { return $('#firstname'); }
    get lastName() { return $('#lastname'); }
    get email() { return $('#email_address'); }
    get password() { return $('#password'); }
    get confirmPassword() { return $('#password-confirmation'); }
    get createAccountBtn() { return $('button[title="Create an Account"]'); }
    get successMessage() { return $('.message-success.success.message'); }

    async open() {
        console.log("Maximizing window");
        await browser.maximizeWindow();
        await browser.url('/customer/account/create/');
    
    }

    async registerNewUser(user) {
                await this.firstName.waitUntil(async function () {
                    return await this.isDisplayed();
                }, {
                    timeout: TIMEOUTS.medium,
                    timeoutMsg: MESSAGES.timeouts.inputNotVisible
                });
        await this.firstName.setValue(user.firstName);
        await this.lastName.setValue(user.lastName);
        await this.email.setValue(String(user.email));
        await this.password.setValue(String(user.password));
        await this.confirmPassword.setValue(String(user.password));
        await this.createAccountBtn.click();
    }

    async isSuccessMessageDisplayed() {
        await this.successMessage.waitUntil(async function () {
            return await this.isDisplayed();
        }, {
            timeout: TIMEOUTS.medium,
            timeoutMsg: MESSAGES.timeouts.successMsgMissing
        });

        return await this.successMessage.isDisplayed();
    }
}

module.exports = new RegisterPage();