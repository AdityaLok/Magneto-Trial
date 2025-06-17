const TIMEOUTS = require('../constants/timeouts');
const MESSAGES = require('../constants/messages');
 
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

    get cartSuccessMessage() {
        return $('.message-success.success.message');
    }

    async selectRandomSizeAndColor() {
        let sizes = await this.sizeOptions;
        if (sizes.length === 0) throw new Error('No size options found.');
        let randomSize = sizes[Math.floor(Math.random() * sizes.length)];
        await randomSize.scrollIntoView();
        await browser.waitUntil(async () => {
            return await randomSize.isClickable();
        },{
            timeout: TIMEOUTS.wait.medium,
            timeoutMsg: MESSAGES.timeouts.sizeNotClickable

        })
        // await this.randomSize.waitUntil(async function () {
        //     return await this.isClickable();
        // },{
        //     timeout: TIMEOUTS.wait.medium,
        //     timeoutMsg: MESSAGES.timeouts.sizeNotClickable
        // });
        await randomSize.click();

        let colors = await this.colorOptions;
        if (colors.length === 0) throw new Error('No color options found.');
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        await randomColor.scrollIntoView();
        await browser.waitUntil(async () => {
            return await randomColor.isClickable();
        }, {
            timeout: TIMEOUTS.medium,
            timeoutMsg: MESSAGES.timeouts.colorNotClickable
        });
        // await this.randomColor.waitUntil(async function () {
        //     return await this.isClickable();
        // }, {
        //     timeout: TIMEOUTS.medium,
        //     timeoutMsg: MESSAGES.timeouts.colorNotClickable
        // });
        await randomColor.click();
    }

    async addProductToCart() {
        await this.selectRandomSizeAndColor();

        await this.addToCartButton.scrollIntoView();
        await browser.waitUntil(async() => {
            return await this.addToCartButton.isClickable();
        }, {
            timeout: TIMEOUTS.medium,
            timeoutMsg: MESSAGES.timeouts.addToCartNotClickable
        });
        await this.addToCartButton.click();

        await browser.waitUntil(async () => {
            return await this.cartSuccessMessage.isDisplayed();
        }, {
            timeout: TIMEOUTS.wait.addToCartSuccessMessage,
            timeoutMsg: MESSAGES.error.productNotAdded
        });
    }
}

module.exports = new ProductPage();