const TIMEOUTS = require('../constants/timeouts');
const MESSAGES = require('../constants/messages');

class CheckoutPage {
    get newAddressButton() {
        return $('span[data-bind="i18n: \'New Address\'"]');
    }
    get street() { return $('[name="street[0]"]'); }
    get city() { return $('[name="city"]'); }
    get zip() { return $('[name="postcode"]'); }
    get phone() { return $('[name="telephone"]'); }
    get country() { return $('[name="country_id"]'); }
    get state() { return $('[name="region_id"]'); }
    get shippingMethod() { return $('input[value="flatrate_flatrate"]'); }
    get nextBtn() { return $('button.continue'); }
    get placeOrderBtn() { return $('button.checkout'); }

    async fillShippingDetails(address, city, pinCode, phoneNumber) {
        let isNewAddressVisible = await this.newAddressButton.isDisplayed();

        if (isNewAddressVisible) {
            console.log('Shipping address exists. Proceeding to payment step.');
        } else {
            await browser.waitUntil(async () => await this.street.isDisplayed(), {
                timeout: TIMEOUTS.wait.loadingMaskDisappear,
                timeoutMsg: MESSAGES.timeouts.shippingFormNotLoaded
            });

            await this.street.setValue(address);
            await this.city.setValue(city);
            await this.selectRandomState();
            await this.zip.setValue(pinCode);
            await this.phone.setValue(phoneNumber);
        }

        await browser.waitUntil(async () => await this.shippingMethod.isClickable(), {
            timeout: TIMEOUTS.wait.proceedToCheckoutBtn,
            timeoutMsg: MESSAGES.timeouts.shippingMethodNotClickable
        });
        await this.shippingMethod.click();

        await this.nextBtn.scrollIntoView();
        await browser.waitUntil(async () => await this.nextBtn.isClickable(), {
            timeout: TIMEOUTS.wait.proceedToCheckoutBtn,
            timeoutMsg: MESSAGES.timeouts.nextButtonNotClickable
        });
        await this.nextBtn.click();

        await browser.waitUntil(async () => await this.placeOrderBtn.isClickable(), {
            timeout: TIMEOUTS.wait.loadingMaskDisappear,
            timeoutMsg: MESSAGES.timeouts.placeOrderNotClickable
        });
    }

    async placeOrder() {
        await this.placeOrderBtn.click();
    }

        async selectRandomState() {
        let stateDropdown = await $('select[name="region_id"]');
        let options = await stateDropdown.$$('option');

        let validOptions = [];
        for (let i = 1; i < options.length; i++) {
            const value = await options[i].getAttribute('value');
            if (value) validOptions.push(options[i]);
        }

        let randomIndex = Math.floor(Math.random() * validOptions.length);
        await validOptions[randomIndex].click();

        let selected = await validOptions[randomIndex].getText();
        console.log(`Selected state: ${selected}`);
    }
}

module.exports = new CheckoutPage();