const registerPage = require('../pages/register.page');
const loginPage = require('../pages/login.page');
const dashboardPage = require('../pages/dashboard.page');
//Use Object
const { generateAndSaveNewUser, fetchUserData } = require('../utils/dataGenerator');
const { loginCustomer } = require('../utils/apiHelper');
const path = require('path');
const fs = require('fs');
const { clearResponse } = require('../utils/clearResponse');

describe('Magento Registration and Login for New user', () => {
    const payloadPath = path.resolve(__dirname, '../data/loginPayload.json');
    const responsePath = path.resolve(__dirname, '../apiResponse/loginResponse.txt');

    beforeAll(() => {
        clearResponse('loginResponse.txt');
    })

    it('should register a new customer user and save to DB', async () => {
        const newUser = await generateAndSaveNewUser('customer');

        await registerPage.open();
        await registerPage.registerNewUser(newUser);

        const isUserRegistrationSuccess = await registerPage.isSuccessMessageDisplayed();
        expect(isUserRegistrationSuccess).toBeTrue();
    });

    it('should login again with same customer user from DB and validate login API', async () => {
        await dashboardPage.logout();

        const user = await fetchUserData('customer');
        expect(user).not.toBeNull();
        expect(user.email).toBeDefined();
        expect(user.password).toBeDefined();

        await loginPage.open();
        await loginPage.login(user.email, user.password);

        // Update login payload file dynamically
        const loginPayload = {
            username: user.email,
            password:user.password
        };
        
        fs.writeFileSync(payloadPath, JSON.stringify(loginPayload, null, 2));

        const apiResponse = await loginCustomer();

        expect(apiResponse.status).toBe(200);
        expect(apiResponse.data).toMatch(/^[A-Za-z0-9._-]+$/);

        // Validate payload content
        const payloadFromFile = JSON.parse(fs.readFileSync(payloadPath, 'utf-8'));
        expect(payloadFromFile.username).toEqual(user.email);
        expect(payloadFromFile.password).toEqual(user.password);

        const title = await dashboardPage.getHeadingText();
        expect(title).toContain('My Account');

    });
});

// 
//custom reporting -> overwrite the same report file
// Beforeall -> Use hooks