const sequelize = require("../config/database");
const User = require("./User");
const Member = require("./Member");

module.exports = {
  sequelize,
  User,
  Member,
};
