const { verify } = require("jsonwebtoken");
const db = require('../db')
require('dotenv').config();

const authenticate = async (req, res, next) => {
    const { token } = req.cookies;
    console.log(req.cookies)
    // if (!token) res.status(401).send("Unauthorized");

    // try {
    //     // Get id from token
    //     const { sub } = verify(token, process.env.JWT_SECRET);

    //     // Query if id is valid and exists
    //     const query = "SELECT * from users where discord_id = $1;"
    //     const result = await db.query(query, [sub])
    //     if (result.rowCount > 0) {
    //         req.user = result.rows;
    //         next();
    //     } else {
    //         req.user = null;
    //         res.status(401).send('Error');
    //     }
    // } catch (err) {
    //     console.log(err)
    // }
}

module.exports = authenticate