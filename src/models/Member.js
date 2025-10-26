const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Member = sequelize.define(
  "Member",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "last_name",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: "date_of_birth",
    },
    membershipType: {
      type: DataTypes.ENUM("Basic", "Premium", "VIP"),
      allowNull: false,
      field: "membership_type",
    },
    joinedDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: "joined_date",
    },
    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      defaultValue: "Active",
      allowNull: false,
    },
  },
  {
    tableName: "members",
    timestamps: true,
    underscored: true,
  }
);

module.exports = Member;
