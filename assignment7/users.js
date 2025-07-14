// users.js
const bcrypt = require("bcryptjs");

const users = [
  {
    id: 1,
    username: "richa",
    password: bcrypt.hashSync("password123", 10), // hashed password
  },
];

module.exports = users;
