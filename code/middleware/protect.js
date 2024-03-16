const jwt = require("jsonwebtoken");
const { UserSchema } = require("../models/auth/user/user.model");

async function protect(req, res, next) {
    let token;
    if (req.headers.authorization) {
        try {
            token = req.headers.authorization.split(' ')[1];

            //decodes token id
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.UserSchema = await UserSchema.findById(decoded.id);
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