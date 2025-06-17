class SearchPage {
    get searchInput() { return $('#search'); }
    get searchButton() { return $('button[title="Search"]'); }
    get product() { return $('//li[contains(@class, \'product-item\')][5]//a');}

    async searchAndFilterProduct(keyword) {
        await this.searchInput.waitForDisplayed({ timeout: 5000 });
        await this.searchInput.setValue(keyword);
        await this.searchButton.click();

        const productDisplayed = await this.product;
        await productDisplayed.click(); // Navigate to product detail page
    }
}

module.exports = new SearchPage();