const express = require("express");
const userQuery = require("./user.query");
const auth = require("../../middleware/auth");

const router = express.Router();

router.get('/',  auth.verify_token, async (req, res) => {
    const result = await userQuery.Getallusers();
    if (result === null) {
        console.log("get all user error");
    } else {
        res.status(200).json(result);
    }
});

router.get('/todos', auth.verify_token, async (req, res) => {
    console.log("get user/todos");
    res.send("Receive");
});

router.get('/:id', auth.verify_token, async (req, res) => {
    if (req.params.id === null) {
        console.log("get id null");
    } else {
        if (!isNaN(req.params.id) === true) {
            const result = await userQuery.Getuserfromid(req.params.id);
        } else {
            const result = await userQuery.Getuserfromemail(req.params.id)
            console.log("test"+result);
        }
        if (result === null) {
            console.log("error getuser from id")
        } else {
            res.status(200).json(result);
        }
    }
});

router.put('/:id', auth.verify_token, async (req, res) => {
    if (req.id === null || req.body === null) {
        console.log("put id null");
    } else if (req.id === null || req.body.email === null || req.body.password === null || req.body.firstname === null || req.body.name === null) {
        console.log("error body incomplete");
    } else {
        const result = await userQuery.modify_user(req.id, req.body);
        if (result === null) {
            console.log("error request modify user");
        } else {
            res.status(200).json(result)
        }
    }
});

router.delete('/:id', auth.verify_token, async (req, res) => {
    if (req.id === null) {
        console.log("error id null");
    } else {
        const result = await userQuery.deleteUser(req.params.id);
        if (result === null) {
            console.log("error requete delete")
        } else {
            const obj = {msg : `succesfully deleted record number: ${req.params.id}`}
            res.status(200).json(obj);
        }
    }
});

module.exports = router;