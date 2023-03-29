var express = require("express");
var router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken")
const passportJWT = require("../middlewares/passport-jwt")
const checkAdmin = require("../middlewares/check-admin")




router.post("/",[passportJWT.checkAuth,checkAdmin.checkAdminRole],async function (req, res, next) {
  const {product_name,product_price} = req.body;
  return res.status(200).json({
    message: "add product successful."
  });
});

module.exports = router;
