const express = require('express');
var morgan = require('morgan');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

const app = express();

// regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// morgan middleware
app.use(morgan("tiny"));

// cookie and fileuploader middleware
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

app.set("view engine", "ejs");

// import all routes
const home = require('./routes/home');
const user = require('./routes/user');
const product = require('./routes/product');
const payment = require('./routes/payment');
const order = require('./routes/order');

// router middleware
app.use('/api/v1', home);
app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', payment);
app.use('/api/v1', order);

app.get('/signuptest', (req, res) => {
    res.render("signuptest")
})

module.exports = app;