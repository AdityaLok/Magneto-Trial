module.exports = {
    insertCredential: `INSERT INTO credentials (firstName, lastName, email, password, phoneNumber)
    VALUES (?, ?, ?, ?, ?)`,

    insertUserDetails: `INSERT INTO user_details (firstName, lastName, email, password, address, pinCode, phoneNumber)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,

    insertOrder: `INSERT INTO orders (productId, orderDateTime)
    VALUES (?, ?)`,

    getLastUser: `SELECT * FROM user_details ORDER BY id DESC LIMIT 1`
};