const crypto = require('crypto');
const jwt = require('jsonwebtoken');


function hashing(password) {
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    return hash;
};

function generate_token(id) {
    const token = jwt.sign({id : id}, process.env.SECRET);
    return token;
}

const verify_token = (req, res, next) => {
    const header = req.header['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        jwt.verify(bearer[1], process.env.SECRET);
        if (err) {
            res.status(400).json({msg : "Token is not valid"});
        }
        next();
    } else {
        res.status(403).json({msg : "No token, authorization denied"})
        return null;
    }
};

module.exports = {
    hashing,
    generate_token,
    verify_token
}