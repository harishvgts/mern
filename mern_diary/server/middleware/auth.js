const jwt = require('jsonwebtoken')

const authJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
       if (err) return res.status(403);           
       req.user = user;
       next();
    });
};

module.exports = authJWT 