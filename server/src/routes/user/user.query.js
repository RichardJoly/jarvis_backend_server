//require perso
const connection = require('../../config/db');
const auth = require('../../middleware/auth');

//require module for "better methode of query"
const util = require('util');
const query = util.promisify(connection.query).bind(connection);

//get all the users from database
async function Getallusers(){
    try {
        const result = await query('SELECT * FROM user');
        return result;
    } catch (e) {
        console.error(e);
        return null;
    }
}

//get user from database by id
async function Getuserfromid(userid) {
    try {
        const result = await query(
            'SELECT * FROM user WHERE id = ?',
        [userid]);
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
};

//get user from database by email
async function Getuserfromemail(email_user) {
    try {
        const result = await query(
            'SELECT * FROM user WHERE email = ?',
            [email_user]
        );
        return result;
    } catch (error) {
        console.error(error);
        return null;
    }
}

//update user from database by userid with data
async function modify_user(userid, data) {
    try {
        await query(
            'UPDATE user SET email = ?, password = ?, firstname = ?, name = ? WHERE id = ?', 
            [data.email, /*auth.hashing(*/data.password/*)*/, data.firstName, data.name, userid]
        );
        const result = await query(
            'SELECT * FROM user WHERE id = ?',
            [userid]
        );
        console.log(result);
        return result;
    } catch (error) {
        console.error(error)
        return null;
    }
}

//delete user from database by userid
async function deleteUser(userid) {
    try {
        await query (
            'DELETE FROM user WHERE id = ?',
            [userid]
        );
        return 0;
    } catch (error) {
        console.error(error);
        return 84;
    }
}

//add a user to the database with data
async function registerUser(data) {
    try {
        await query(
            "INSERT INTO user (email, password, name, firstname) VALUE(?,?,?,?)",
            [data.email, auth.hashing(data.password), data.name, data.firstname]
        );
        const result = await query(
            'SELECT id FROM user WHERE email = ?',
            [data.email]
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
            'SELECT id, password FROM user WHERE email = ?',
            [data.email]
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
    Getallusers,
    Getuserfromid,
    Getuserfromemail,
    modify_user,
    deleteUser,
}