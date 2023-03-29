var express = require("express");
var router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken")
const User = require("../models/user")
const passportJWT = require("../middlewares/passport-jwt")


router.get("/profile", [passportJWT.checkAuth], async function (req, res, next) {
  const user = await User.findByPk(req.user.user_id);
  
  return res.status(200).json({
    user:{
      id:user.id,
      fullname:user.fullname,
      email:user.email,
      role:user.role
    }
  });
});

/* GET users listing. */
router.get("/", function (req, res, next) {
  return res.status(200).json({
    message: "Hello Users",
  });
});

router.post("/register",async function (req, res, next) {
  const {fullname,email,password} = req.body;


  const user = await User.findOne({where:{email:email}})
  if(user !== null){
    return res.status(400).json({message:"Email already exists in the system"})
  }
  const passwordHash = await argon2.hash(password)
  const newUser = await User.create({
    fullname:fullname,
    email:email,
    password:passwordHash
  })
  
  return res.status(201).json({
    message: "register successful.",
    user:{
      if:newUser.id,
      fullname:newUser.fullname
    }
  });
});

router.post("/login",async function (req, res, next) {
  const {email,password} = req.body;
  const user = await User.findOne({where:{email:email}})
  if(user === null){
    return res.status(404).json({message:'cannot found user in the system.'})
  }

  const isValid = await argon2.verify(user.password,password)
  if(isValid === false){
    return res.status(401).json({message:'password is invalid.'})
  }

  const token = jwt.sign({user_id:user.id,role:user.role},process.env.JWT_KEY,{ expiresIn:'7d'})
  
  return res.status(200).json({
    message: "login success.",
    access_token:token
  });
});

module.exports = router;
