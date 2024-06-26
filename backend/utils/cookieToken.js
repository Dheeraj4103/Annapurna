const cookieToken = (user, res) => {
    const token = user.getJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 1000
        ),
        httpOnly: true
    };

    user.password = undefined;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    res.status(200).cookie('token', token, options).json({
        success: true,
        token,
        user
    });
};

module.exports = cookieToken;