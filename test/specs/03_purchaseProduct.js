import { server } from '../mocks/server';
import axios from 'axios';
const searchPage = require('../pages/search.page');
const productPage = require('../pages/product.page');
const cartPage = require('../pages/cart.page');
const checkoutPage = require('../pages/checkout.page');
const confirmationPage = require('../pages/confirmation.page');
const loginPage = require('../pages/login.page');
const { fetchUserData } = require('../utils/dataGenerator');
const db = require('../utils/db');
const sql = require('../utils/sqlqueries');
const fs = require('fs');
const path = require('path');
const { validateOrder } = require('../utils/apiHelper');
const MESSAGES = require('../constants/messages');
const StatusCodes = require('../constants/statusCodes');



describe('Magento Jacket Purchase Flow', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    it('login once', async () => {
        const user = await fetchUserData('customer');
        expect(user).not.toBeNull();
        expect(user.email).toBeDefined();
        expect(user.password).toBeDefined();

        await browser.url('/customer/account/login/');
        console.log("Maximizing window");
        await browser.maximizeWindow();

        await loginPage.open();
        await loginPage.login(user.email, user.password);

    });

    it('should search for Jacket, apply filters, add to cart', async () => {
        await searchPage.searchAndFilterProduct('Jacket');
        await productPage.addProductToCart();
    });

    it('should complete checkout process', async () => {
        const userShippingDetails = await fetchUserData('customer');
        await cartPage.proceedToCheckout();
        await checkoutPage.fillShippingDetails(userShippingDetails.address, userShippingDetails.city, userShippingDetails.pinCode, userShippingDetails.phoneNumber);
        await checkoutPage.placeOrder();

        const isConfirmed = await confirmationPage.isOrderConfirmed();
        expect(isConfirmed).toBeTrue();

        const orderId = await confirmationPage.getOrderId();
        expect(orderId).toBeDefined();

        const heading = await confirmationPage.getConfirmationHeading();
        expect(heading).toContain(MESSAGES.success.purchaseSuccess);
    });

    it('should validate order via API after placement', async () => {

        const orderId = await confirmationPage.getOrderConfirmationId();
        const response = await axios.get(`https://magento.softwaretestingboard.com/rest/V1/orders/${orderId}`);


        expect(response.status).toBe(StatusCodes.OK);
        expect(response.data.status).toBe("processing");
        // const orderResponse = await validateOrder(orderId);

        // expect(orderResponse.status).toBe(200);
        // expect(orderResponse.data.status).toBe('pending'); 
    });


});

// // Save order info to file
// const logPath = path.resolve(__dirname, '../apiResponse/checkoutResponse.txt');
// fs.writeFileSync(logPath, Order ID: ${orderId}\nEmail: ${customer.email});

// it('should verify order from database', async () => {
//     const [rows] = await db.query(sql.getOrdersByEmail(customer.email));
//     expect(rows.length).toBeGreaterThan(0);
//     console.log('Latest Order from DB:', rows[0]);
// });