const express = require('express');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'IamKhem$195038';
// Route 1 :: Create a user using post "/api/auth/createuser"  doesnot require auth. No login required
router.post('/createuser',[body('name','Enter a valid name ').isLength({ min: 3 }), body('email','Enter a valid email').isEmail(),

body('password','Enter a valid password').isLength({ min: 5 })],async (req,res)=>{

    // if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check whether the user with this email exist already
    try{
    let user = await User.findOne({email:req.body.email});

        if(user)
        {
            return res.status(400).json({error:"User with this email already exist"});
        }
        const salt= await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password,salt) 
         user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data ={
        user:{
            id : user.id
        }
      }
      console.log(`data is ${data.user.id}`)
      const authToken = jwt.sign(data,JWT_SECRET);
     // console.log(jwtData);
   //  res.json(user)
       res.json({authToken});
    }
    catch(error)
    {
        console.log(error.message)
      res.status(500).send("Internal server error")
    
    }

})

// Route 2:: Authenticate a user using post "/api/auth/login"  doesnot require auth. No login required

router.post('/login',[ 
  body('email','Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists()],async (req,res)=>{
    
    let success = false;
   // if there are errors return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;

    try{
      let user = await User.findOne({email:req.body.email});
      if(!user)
      {
        success=false;
        return res.status(400).json({success,error:"Login with valid credentials"});
      }

      const passwordCompare = await bcrypt.compare(password,user.password);

      if(!passwordCompare)
      {
        success=false;
        return res.status(400).json({success,error:"Login with valid credentials"});
      }  

      const data ={
        user:{
            id : user.id
        }
      }

      const authToken = jwt.sign(data,JWT_SECRET);
      success=true
      res.json({success,authToken});

    }
    catch(error)
    {
      console.log(error.message)
      res.status(500).send("Internal server error")
    }
})

// Route 3:: Get loggedin user Details using post "/api/auth/getuser". login required
router.post('/getuser',fetchuser,async (req,res)=>{
    try{
       const userId = req.user.id;
      const user = await  User.findById(userId).select("-password")
      res.send(user)
    }
    catch(error)
    {
      console.log(error.message)
      res.status(500).send("Internal server error")
    }
  })
module.exports = router