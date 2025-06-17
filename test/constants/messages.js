class Messages {
    success = {
        accountCreated: 'Thank you for registering with Main Website Store.',
        productAdded: 'You added',
        orderPlaced: 'Your order number is',
        loginSuccess: 'Welcome',
        purchaseSuccess: 'Thank you for your purchase!'
    };

    error = {
        loginFailed: 'The account sign-in was incorrect or your account is disabled temporarily.',
        requiredField: 'This is a required field.',
        productNotAdded: 'Product not added'
    };

    labels = {
        dashboardTitle: 'My Account',
        loginTitle: 'Customer Login',
        registrationTitle: 'Create New Customer Account'
    };

    timeouts = {
        welcomeNotVisible: 'Welcome message did not appear',
        miniCartNotVisible: 'Mini cart popup did not open',
        checkoutBtnNotClickable: 'Proceed to Checkout button never became clickable',
        shippingFormNotLoaded: 'Shipping form did not load in time',
        shippingMethodNotClickable: 'Shipping method not clickable',
        nextButtonNotClickable: 'Next button not clickable',
        placeOrderNotClickable: 'Place Order button did not become clickable',
        successMsgMissing: 'Success message not displayed',
        signOutNotClickable: 'SignOut button not cickable',
        signInNotClickable: 'SignIn button not cickable',
        loginTitleNotVisible: 'Login page title not visible',
        addToCartNotClickable: 'AddToCart button not cickable',
        sizeNotClickable: 'Size not cickable',
        colorNotClickable: 'Color button not cickable',
        inputNotVisible: 'Input not visible',
        searchNotVisible: 'Search button not visible',
        productNotVisible: 'Product not visible'
    };
}

module.exports = new Messages();