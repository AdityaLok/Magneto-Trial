const TIMEOUTS = require('../constants/timeouts');
const MESSAGES = require('../constants/messages');

class SearchPage {
    get searchInput() { return $('#search'); }
    get searchButton() { return $('button[title="Search"]'); }
    get product() { return $('//li[contains(@class, \'product-item\')][5]//a'); }
    get productItems() { return $$('li.product-item'); }

    async searchAndFilterProduct(keyword) {
        await this.searchInput.waitUntil(async function () {
            return await this.isDisplayed();
        }, {
            timeout: TIMEOUTS.medium,
            timeoutMsg: MESSAGES.timeouts.searchNotVisible
        })
        await this.searchInput.setValue(keyword);
        await this.searchButton.click();

        let productDisplayed = await this.product;
        await productDisplayed.click(); // Navigate to product detail page
    }
}

module.exports = new SearchPage();