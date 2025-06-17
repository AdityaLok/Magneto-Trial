const axios = require('axios');

async function postLogin(payload) {
    return await axios.post(
        'https://magento.softwaretestingboard.com/rest/V1/integration/customer/token',
        payload,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            validateStatus: () => true
        }
    );
}

module.exports = { postLogin };