// const { jwt } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");

const generateJWTToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || "7d",
  });
};

module.exports = generateJWTToken;
