class Timeouts {
    short = 3000;
    medium = 5000;
    long = 10000;
    xl = 15000;

    wait = {
        welcomeMessage: 7000,
        miniCartPopup: 5000,
        proceedToCheckoutBtn: 8000,
        loadingMaskDisappear: 15000,
        loginPageLoad: 6000,
        registrationSuccessMessage: 7000,
        dashboardTitleVisible: 8000,
        addToCartSuccessMessage: 7000
    };
}

module.exports = new Timeouts();