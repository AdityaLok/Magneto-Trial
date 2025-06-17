class CheckoutPage {
    get street() { return $('[name="street[0]"]'); }
    get city() { return $('[name="city"]'); }
    get zip() { return $('[name="postcode"]'); }
    get phone() { return $('[name="telephone"]'); }
    get country() { return $('[name="country_id"]'); }
    get state() { return $('[name="region_id"]'); }
    get shippingMethod() { return $('input[value="flatrate_flatrate"]'); }
    get nextBtn() { return $('button.continue'); }
    get placeOrderBtn() { return $('button.checkout'); }
    get shippingAddressBlock() {
        return $('.shipping-address-item.selected-item'); // typical when address is pre-selected
    }
    get newAddressButton() {
        return $('span[data-bind="i18n: \'New Address\'"]');
    }


    async fillShippingDetails(address, city, pinCode, phoneNumber) {
        await this.nextBtn.waitForClickable({ timeout: 5000 });
        const isNewAddressVisible = await this.newAddressButton.isDisplayed();
        if (isNewAddressVisible) {
            console.log('Shipping address exists. Proceeding to payment step.');
        } else {
            console.log('No shipping address selected. Adding new address.');
            await this.street.setValue(address);
            await this.city.setValue(city);
            await this.selectRandomState();
            await this.zip.setValue(pinCode);
            await this.phone.setValue(phoneNumber);
        }
        await this.shippingMethod.click();
        await this.nextBtn.waitForClickable({ timeout: 5000 });
        await this.nextBtn.click();
        await this.placeOrderBtn.waitForClickable();

    }

    async placeOrder() {
        await this.placeOrderBtn.click();
    }

    async selectRandomState() {
        const stateDropdown = await $('select[name="region_id"]');
        const options = await stateDropdown.$$('option');

        const validOptions = [];
        for (let i = 1; i < options.length; i++) {
            const value = await options[i].getAttribute('value');
            if (value) validOptions.push(options[i]);
        }

        const randomIndex = Math.floor(Math.random() * validOptions.length);
        await validOptions[randomIndex].click();

        const selected = await validOptions[randomIndex].getText();
        console.log(`Selected state: ${selected}`);
    }

    // /**
    //  * If a shipping address is already selected, click on the Next button
    //  */
    // async proceedIfShippingAddressExists() {
    //     const isAddressVisible = await this.shippingAddressBlock.isDisplayed();

    //     if (isAddressVisible) {
    //         await this.shippingNextButton.waitForClickable({ timeout: 5000 });
    //         await this.shippingNextButton.click();
    //         console.log('Shipping address exists. Proceeding to payment step.');
    //     } else {
    //         console.log('No shipping address selected. Adding new address.');
    //     }
    // }

}

module.exports = new CheckoutPage();