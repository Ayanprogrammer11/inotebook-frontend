const express = require('express');
const User = require('../models/User')
const router = express.Router();
const bcrypt = require("bcryptjs");
// Destrcturing: It would be like this index[0] = require("express-validator").body - And So On....
const {body, validationResult} = require("express-validator");
const jwt = require("jsonwebtoken");
let fetchuser = require('../middleware/fetchuser');


const JWT_SECRET = "AYANISAGOODB$Y";


// ROUTE: 1 - Creating a User using: POST "/api/auth/createUser" - No Login Required
router.post('/createUser', [
    // Validations
    body("name", "Enter a valid name").isLength({min: 3}),
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({min: 5})
], async (req, res) => {
  let success = false;
    // If there are errors return Bad Request and the errors
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array()})
    }
    // Check whether a User with this email exist already or not and then take the appropriate action
    try {
    let user = await User.findOne({email: req.body.email});
    if(user) {
        return res.status(400).json({success, error: "User with this email already exists"})
    } 
    // Salting and Hashing the Password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    // Creating a User
    user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
    // res.json(user);
    const data = {
        user: {
            id: user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    // console.log(jwtData);
    success = true;
    res.json({success, authToken});

    } catch(err) {
        console.error(err)
        res.status(500).send('An Error Ocurred');
    }

})

// ROUTE: 2 - Authenticating a User using: POST "/api/auth/login" - No Login Required

router.post('/login', [
    // Validations
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Please Enter Password").exists()
], async (req, res) => {
  let code = null;
    let success = false;

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      code = 400;
            return res.status(400).json(code, {errors: errors.array()})
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
          code = 400;
          return res.status(400).json({code, success, error: "Please try to login with correct credentials"});
        }
    
        const passwordCompare = await bcrypt.compare(password, user.password);
        // console.log(user.email);
        if(!passwordCompare){
          code = 400;
          return res.status(400).json({code, success, error: "Please try to login with correct credentials"});
        }
    
        const data = {
          user: {
            id: user.id
          }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        code = 200;
        res.json({code, success, authtoken})
    
      } catch (error) {
        console.error(error.message);
        code = 500;
        res.status(500).send({code, error: "Internal Server Error"});

      }
    
})


// ROUTE: 3 - Getting Logged in User Details using POST:  "/api/auth/getuser" - Login Required

router.post('/getuser', fetchuser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId);
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


// ROUTE: 4 - Deleting a User Account using DELETE:  "/api/auth/deleteuser" - Account Creation Required
router.delete('/deleteuser', fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findByIdAndDelete(userId);
    res.status(200).send({success: "User Deleted"})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router