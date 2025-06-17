module.exports = {
    insertCredential: `INSERT INTO credentials (firstName, lastName, email, password)
    VALUES (?, ?, ?, ?)`,

    insertUserDetails: `INSERT INTO user_details (firstName, lastName, email, password, address, city, pinCode, phoneNumber)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,

    insertOrder: `INSERT INTO orders (user_email, productId, orderDateTime, shippingAddress, shippingPin, shippingPhone)
        VALUES (?, ?, ?, ?, ?, ?)`,
    
    getLastUser: `SELECT * FROM user_details ORDER BY id DESC LIMIT 1`,

    getOrdersByEmail: `SELECT * FROM orders WHERE user_email = ? ORDER BY orderDateTime DESC LIMIT 1`

    //getOrdersByEmail: (email) => `SELECT * FROM orders WHERE email= '${email}' ORDER BY orderDateTime DESC LIMIT 1`
};