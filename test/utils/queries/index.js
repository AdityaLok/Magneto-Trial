const adminQueries = require('./admin');
const customerQueries = require('./customer');
const employeeQueries = require('./employee');

function getQueriesByRole(role) {
    switch (role.toLowerCase()) {
        case 'admin':
            return { db: 'admin_db', queries: adminQueries };
        case 'employee':
            return { db: 'employee_db', queries: employeeQueries };
        case 'customer':
        default:
            return { db: 'customer_db', queries: customerQueries };
    }
}

module.exports = { getQueriesByRole };