const jwt = require("jsonwebtoken");
const { User } = require("../model/userModel");

async function protect(req, res, next) {
    let token;
    if (req.headers.authorization) {
        try {
            token = req.headers.authorization;

            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
            next();
        } catch (error) {
            res.status(401).json({
                message: "Not authorized, token failed",
            });
        }
    }

    if (!token) {
        res.status(401).json({
            message: "Not authorized, no token",
        });
    }
}

module.exports = { protect };