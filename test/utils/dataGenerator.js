const { faker } = require('@faker-js/faker');
const { getConnection } = require('./db');
const { getQueriesByRole } = require('./queries');

/**
 * Generates a new fake user and inserts into DB for a specific role.
 * @param {string} role - Role to insert user for (admin, employee, customer)
 */
async function generateAndSaveNewUser(role = 'customer') {
    const { db, queries } = getQueriesByRole(role);
    console.log("Connection started");
    const conn = await getConnection(db);

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email(firstName, lastName).toLowerCase();
    const password = faker.internet.password(15, true);
    const rawPhone = faker.phone.number('##########'); // ensures 10-digit number
    const phoneNumber = rawPhone.replace(/\D/g, '').substring(0, 15);
    // use trim
    // remove non-digits, truncate if needed
    const address = faker.location.streetAddress();
    const pinCode = faker.location.zipCode('######');
    //parseInt, to check for different digit size
    const city = faker.location.city();

    // Insert into credentials
    await conn.execute(queries.insertCredential, [firstName, lastName, email, password]);

    // Insert into user_details
    await conn.execute(queries.insertUserDetails, [
        firstName,
        lastName,
        email,
        password,
        address,
        city,
        pinCode,
        phoneNumber
    ]);

    await conn.end();
    console.log("Connection ended");

    return { firstName, lastName, email, password, phoneNumber, address, pinCode };
}

/**
 * Fetches the most recently inserted user for a specific role.
 * @param {string} role - Role to fetch user for (admin, employee, customer)
 */
async function fetchUserData(role = 'customer') {
    const { db, queries } = getQueriesByRole(role);
    console.log("Connection2 started");
    const conn = await getConnection(db);

    const [rows] = await conn.execute(queries.getLastUser);

    await conn.end();

    if (!rows || rows.length === 0) {
        console.warn(`No user found in ${role} DB.`);
        return null;
    }
    console.log("User Data: ", rows[0]);

    return rows[0];
}


/**
 * Places an order for a specific user.
 * @param {string} email - The email of the user placing the order.
 */
async function placeOrder(email) {
    const { db, queries } = getQueriesByRole('customer');
    console.log('Placing order for user: ${email}');
    const conn = await getConnection(db);

    const productId = faker.string.uuid();
    const orderDateTime = new Date().toISOString();

    await conn.execute(queries.insertOrder, [productId, orderDateTime]);

    await conn.end();
    console.log("Order placed successfully!");

    return { productId, orderDateTime };
}

module.exports = {
    generateAndSaveNewUser,
    fetchUserData
};