module.exports=
{
    insertNewUser: `INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)`,
    getLastUser:`SELECT * FROM users ORDER BY id DESC LIMIT 1`
}