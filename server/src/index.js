require('dotenv').config();
const bodyParser = require('body-parser');

const express = require("express");
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
});

const authRoutes = require('./routes/auth/auth');

app.use('/', authRoutes);

app.get("/", (req, res) => {
    res.send("Hello android");
});

app.listen(process.env.PORT, () => {
    console.log(`app listening at http://localhost:${process.env.PORT}`);
});