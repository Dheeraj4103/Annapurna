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

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));