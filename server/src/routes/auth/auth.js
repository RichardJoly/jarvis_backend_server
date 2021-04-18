//require module
const express = require('express');
const router = express.Router();

//require perso
const authQuery = require('./auth.query')
const auth = require('../../middleware/auth')

//router method post for path '/register'
router.post('/register', async (req, res) => {
    if (req.body === null) {
        console.log("no body");
        res.json({
            msg : "receive"
        });
    } else if (!req.body.pseudo || !req.body.password) {
        console.log("register incomplete");
    } else {
        const result = await authQuery.registerUser(req.body);
        if (result === null) {
            console.log("error register");
        } else {
            const token = {token : auth.generate_token(result)};
            res.status(201).json(token);
        }
    }
});


//router method post for path '/login'
router.post('/login', async (req, res) => {
    if (req.body === null) {
        console.log("no body");
    } else if (!req.body.pseudo || !req.body.password) {
        console.log("body incomplete");
    } else {
        const result = await authQuery.loginUser(req.body);
        if (result === null) {
            res.status(400).json({msg : "Invalid Credentials"})
        } else if (result[0].password != auth.hashing(req.body.password)) {
            res.status(400).json({msg : "Invalid Credentials"})
        } else {
            const token = {
                token : auth.generate_token(result.id)
            }
            res.status(200).json(token);
        }
    }
});

module.exports = router;
