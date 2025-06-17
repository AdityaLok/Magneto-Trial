const axios = require('axios');
const fs = require('fs');
const path = require('path');


const loginPayloadPath = path.resolve(__dirname, '../data/loginPayload.json');
const loginResponseLogPath = path.resolve(__dirname, '../apiResponse/loginResponse.txt');
const addToCartPayloadPath = path.resolve(__dirname, '../data/addToCartPayload.json');
const addToCartResponseLogPath = path.resolve(__dirname, '../apiResponse/addToCartResponse.txt');
const orderResponse = path.resolve(__dirname, 'api-data/responses/orderResponse.json');


async function getSavedToken() {
    try {
        const fileContent = fs.readFileSync(loginResponseLogPath, 'utf-8');
        const tokenMatch = fileContent.match(/Login Token: (.+)/);
        return tokenMatch ? tokenMatch[1].trim() : null;
    } catch (error) {
        console.error('Error reading token file:', error);
        return null;
    }
}

async function validateOrder(orderId) {
    try {
        // Get saved token
        const authToken = await getSavedToken();
        if (!authToken) {
            throw new Error('No authentication token found');
        }

        const response = await axios.get(
            `https://magento.softwaretestingboard.com/rest/V1/orders/${orderId}`,
            {
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        const timestamp = new Date().toISOString();
        const logContent = `[${timestamp}] Order Validation\n` +
            `Status: ${response.status} \n` +
            `Order ID: ${orderId} \n` +
            `Response: ${JSON.stringify(response.data, null, 2)} \n\n`;

        fs.writeFileSync(orderResponse, logContent, 'utf-8');
        console.log("Order Response after GET: "+ response);
        return response.data;
    }
    catch (error) {
        // Enhanced error logging
        let errorDetails = `[${new Date().toISOString()}] Order ${orderId} Failed\n`;
        errorDetails += `Error: ${error.message}\n`;
        
        if (error.response) {
            errorDetails += `Status: ${error.response.status}\n`;
            errorDetails += `Response: ${JSON.stringify(error.response.data, null, 2)}\n`;
        }
        
        fs.appendFileSync('error.log', errorDetails + '\n');
        throw error;
    }
}

async function loginCustomer() {
    try {
        const payload = JSON.parse(fs.readFileSync(loginPayloadPath, 'utf-8'));

        const response = await axios.post(
            'https://magento.softwaretestingboard.com/rest/V1/integration/customer/token',
            payload,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                validateStatus: () => true
            }
        );  

        const token = response.data;
        const timestamp = new Date().toISOString();
        const logContent = `Timestamp: ${timestamp}\n
    Status: ${response.status}\n
    Login Token: ${token}\n`;
        fs.writeFileSync(loginResponseLogPath, logContent, 'utf-8');

        return response;
    }
    catch (error) {
        console.log('API Login request has failed: ', error.message);
        throw error;
    }
}

async function addToCartAPI(token) {
    const cartPayload = JSON.parse(fs.readFileSync(addToCartPayloadPath, 'utf-8'));

    const cartResponse = await axios.post(
        'https://magento.softwaretestingboard.com/rest/V1/carts/mine/items',
        cartPayload,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            validateStatus: () => true
        }
    );
    const cartToken = cartResponse.data;
    const cartTimestamp = new Date().toISOString();
    const cartLogContent = `Timestamp: ${cartTimestamp}\n
    Status: ${cartResponse.status}\n
    Response: ${cartToken}\n`;
    fs.writeFileSync(addToCartResponseLogPath, cartLogContent, 'utf-8');

    return cartResponse;
}


module.exports = {
    loginCustomer,
    validateOrder
};