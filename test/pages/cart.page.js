const TIMEOUTS = require('../constants/timeouts');
const MESSAGES = require('../constants/messages');

class CartPage {
    get welcomeMessage() { return $('.panel.header .greet.welcome'); }
    get cartTrigger() { return $('a.showcart'); }
    get miniCartPopup() { return $('div.block-minicart'); }
    get proceedToCheckoutBtn() { return $('#top-cart-btn-checkout'); }
    get loadingMask() { return $('.loading-mask'); }

    async proceedToCheckout() {
        await browser.execute(() => window.scrollTo(0, 0));

        await browser.waitUntil(async () => await this.welcomeMessage.isDisplayed(), {
            timeout: TIMEOUTS.wait.welcomeMessage,
            timeoutMsg: MESSAGES.timeouts.welcomeNotVisible
        });

        await this.openCartWithRetry();

        await browser.waitUntil(async () => await this.proceedToCheckoutBtn.isClickable(), {
            timeout: TIMEOUTS.wait.proceedToCheckoutBtn,
            timeoutMsg: MESSAGES.timeouts.checkoutBtnNotClickable
        });

        await this.proceedToCheckoutBtn.scrollIntoView({ block: 'center' });
        await this.proceedToCheckoutBtn.click();

        await browser.waitUntil(async () => !(await this.loadingMask.isDisplayed()), {
            timeout: TIMEOUTS.wait.loadingMaskDisappear,
            timeoutMsg: MESSAGES.timeouts.placeOrderNotClickable
        });
    }

async openCartWithRetry(maxAttempts = 3) {
    for (let trial = 1; trial <= maxAttempts; trial++) {
        if (isClickable) {
            await this.cartTrigger.scrollIntoView();
            await this.cartTrigger.click();

            // ✅ Check if page has changed
            try {
                await browser.waitUntil(async () => {
                    const url = await browser.getUrl();
                    return url.includes('checkout') || url.includes('cart');
                }, {
                    timeout: TIMEOUTS.wait.checkoutPageLoad,
                    timeoutMsg: 'Checkout/cart page did not load after cart click'
                });

                console.log('✅ Checkout/cart page loaded successfully');
                return;
            } catch (err) {
                console.warn('Page did not change after cart click: ${err.message}');
            }
        } else {
            console.log('Cart trigger not clickable.');
        }

        if (trial < maxAttempts) {
            console.log('Retrying after refresh...');
            await browser.refresh();
        }
    }

    throw new Error(MESSAGES.timeouts.cartTriggerRetryFailed);
}
}

module.exports = new CartPage();