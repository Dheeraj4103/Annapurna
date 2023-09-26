const BigPromise = require("../middlewares/bigPromise");

exports.home = BigPromise(async (req, res) => {
    res.status(200).json({
        success: true,
        greetings: "Hello from API",
    });
});
exports.homeDummy = BigPromise(async (req, res) => {
    res.status(200).json({
        success: true,
        greetings: "This is a Dummy API",
    });
});
