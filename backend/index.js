const app = require('./app');
require('dotenv').config();
const connectWithDB = require("./config/db");
const cloudinary = require('cloudinary');
// connect oto database
connectWithDB();

// configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const corsOptions = {
    origin: 'http://localhost:3000/#/menu',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};



app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));