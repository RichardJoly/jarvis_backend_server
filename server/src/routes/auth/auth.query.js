const connection = require('../../config/db');
const auth = require('../../middleware/auth');

//require module for "better methode of query"
const util = require('util');
const query = util.promisify(connection.query).bind(connection);


//add a user to the database with data
async function registerUser(data) {
    try {
        await query(
            "INSERT INTO user (pseudo, password) VALUE(?,?)",
            [data.pseudo, auth.hashing(data.password)]
        );
        const result = await query(
            'SELECT id FROM user WHERE pseudo = ?',
            [data.pseudo]
        );
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
};

//get password and id from database by email
async function loginUser(data) {
    try {
        const result = await query(
            'SELECT id, password FROM user WHERE pseudo = ?',
            [data.pseudo]
        );
        if (result === null) {
            return null;
        }
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

module.exports = {
    loginUser,
    registerUser
};