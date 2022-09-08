const jwt = require("jsonwebtoken");
require("dotenv").config();
const tripleSecret = process.env.tripleSecret;
const expiration = "5h";

module.exports = {
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, tripleSecret, { expiresIn: expiration });
  },
};
