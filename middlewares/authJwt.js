const jwt = require("jsonwebtoken");
const config = require("../config/auth.config")

exports.verifyToken = (req, res, next) => {
    let token = req.cookies['token'];

    if(!token){
        return res.status(403).send({
            message: "No tokenn provided!"
        })
    }

    try {
        token = token.split(' ')[1] // Remove Bearer from string

        if (token === 'null' || !token) {
            return res.status(401).send('Unauthorized request')
        }

        let verifiedUser = jwt.verify(token, config.secret);   // config.TOKEN_SECRET => 'secretKey'
        if (!verifiedUser) return res.status(401).send('Unauthorized request')

        req.user = verifiedUser; // user_id & user_type_id
        next();

    } catch (error) {
        res.status(400).send("Invalid Token");
    }
}