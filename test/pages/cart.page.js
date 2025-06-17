class CartPage {
    get welcomeMessage() { return $('.panel.header .greet.welcome'); }
    get cartTrigger() { return $('a.showcart'); }
    get miniCartPopup() { return $('div.block-minicart'); }
    get proceedToCheckoutBtn() { return $('#top-cart-btn-checkout'); }
    get loadingMask() { return $('.loading-mask'); }

    async proceedToCheckout() {
        await browser.execute(() => window.scrollTo(0, 0));
        await this.welcomeMessage.waitForDisplayed({ timeout: 10000 });
        //Use Fluent Wait - waitUntil()
        
        //retry logic
        await this.openCartWithRetry();
        
        await this.proceedToCheckoutBtn.waitForClickable({ 
            timeout: 15000,
            interval: 1000,
            timeoutMsg: 'Proceed to Checkout button never became clickable'
        });
        
        // Scroll into view just before clicking
        await this.proceedToCheckoutBtn.scrollIntoView({ block: 'center' });
        await browser.pause(500); // Small stabilization pause
        
        await this.proceedToCheckoutBtn.click();
        
        
        await this.loadingMask.waitForDisplayed({ 
            timeout: 15000, 
            reverse: true 
        });
    }

    async openCartWithRetry(maxAttempts = 3) {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                await this.cartTrigger.waitForClickable({ timeout: 10000 });
                await this.cartTrigger.click();
                await this.miniCartPopup.waitForDisplayed({ timeout: 10000 });
                return; // Success
            } catch (err) {
                if (attempt === maxAttempts) throw err;
                //loggers dependencies
                console.log('Cart open attempt ${attempt} failed, retrying...');
                await browser.refresh();
                await browser.pause(1000);
            }
        }
    }
}

module.exports = new CartPage();