const MESSAGES = require('../constants/messages');
const TIMEOUTS = require('../constants/timeouts');

class ConfirmationPage {
    get successMessage() { return $('div.checkout-success'); }

    get orderNumberText() { return $('.checkout-success .order-number > strong'); }

    get confirmationHeading() { return $('h1.page-title > span'); }

    async isOrderConfirmed() {
        await this.successMessage.waitUntil(async function () {
            return await this.isDisplayed();
        }, {
            timeout: TIMEOUTS.wait.loadingMaskDisappear,
            timeoutMsg: MESSAGES.timeouts.successMsgMissing
        }
        );
        let message = await this.successMessage.getText();
        return message.includes(MESSAGES.success.orderPlaced);
    }

    async getOrderId() {
        let text = await this.successMessage.getText();
        let match = text.match(/#(\d+)/);
        return match ? match[1] : null;
    }

    async getOrderConfirmationId() {
        return await this.orderNumberText.getText();
    }

    async getConfirmationHeading() {
        return await this.confirmationHeading.getText();
    }
}

module.exports = new ConfirmationPage();