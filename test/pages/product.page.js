 class ProductPage {
    get sizeOptions() {
        return $$('//div[contains(@class,"swatch-attribute size")]//div[@option-label]');
    }

    get colorOptions() {
        return $$('//div[contains(@class,"swatch-attribute color")]//div[@option-label]');
    }

    get addToCartButton() {
        return $('#product-addtocart-button');
    }

    get addToCartSuccessMessage() {
        return $('.message-success.success.message');
    }

    async selectRandomSizeAndColor() {
        const sizes = await this.sizeOptions;
        const colors = await this.colorOptions;

        if (sizes.length === 0 || colors.length === 0) {
            throw new Error('No size or color options available on product page.');
        }

        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];

        await size.scrollIntoView();
        await size.waitForClickable({ timeout: 5000 });
        await size.click();

        await color.scrollIntoView();
        await color.waitForClickable({ timeout: 5000 });
        await color.click();
    }

    async addProductToCart() {
        await this.selectRandomSizeAndColor();

        await this.addToCartButton.scrollIntoView();
        await this.addToCartButton.waitForClickable({ timeout: 5000 });
        await this.addToCartButton.click();

        await this.addToCartSuccessMessage.waitForDisplayed({ timeout: 10000 });
    }
}

module.exports = new ProductPage();