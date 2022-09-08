const jwt = require("jsonwebtoken");
require("dotenv").config();
const tripleSecret = process.env.tripleSecret;
const expiration = "5h";

module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, tripleSecret, { expiresIn: expiration });
  },
  authMiddleware: function ({ req }) {
    // allows token as req.body/req.query/headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // separate "Bearer"
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }
    // if no token
    if (!token) {
      return req;
    }

    try {
      // decode and attach user Data
      const { data } = jwt.verify(token, tripleSecret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log("Invalid Token");
    }

    // return updated request object

    return req;
  },
};
