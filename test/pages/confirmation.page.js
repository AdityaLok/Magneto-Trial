class ConfirmationPage {
    get successMessage() { return $('div.checkout-success'); }
    get orderNumberElement() { return $('.order-number'); }
    get orderStatusElement() { return $('.order-status'); }

    async isOrderConfirmed() {
        await this.successMessage.waitForDisplayed({ timeout: 5000 });
        return this.successMessage.isDisplayed();
    }

    async getOrderId() {
        const text = await this.successMessage.getText();
        const match = text.match(/#(\d+)/);
        return match ? match[1] : null;
    }

    async getOrderConfirmationId() {
        const orderText = await this.orderNumberElement.getText();
        return orderText.replace('Order #', '').trim();
    }

    async getOrderStatus() {
        return await this.orderStatusElement.getText();
    }

}

module.exports = new ConfirmationPage();