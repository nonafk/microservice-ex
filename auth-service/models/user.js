const { DataTypes } = require("sequelize");
const sequelize = require("../db/mysql");

const User = sequelize.define("User", {
  fullname: {
    type: DataTypes.STRING(255),
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: "member",
  },
}, {
  timestamps: false,
  tableName: 'users',
});

module.exports = User;
