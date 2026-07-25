const jwt = require("jsonwebtoken");

const JWT_SECRET = "your-secret-key";

function authenticate(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Access denied"
        });
    }

    const token = authHeader.replace("Bearer ", "");

    try {

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid token"
        });

    }

}

module.exports = authenticate;
