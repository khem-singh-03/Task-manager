const jwt = require('jsonwebtoken')
const JWT_SECRET = 'IamKhem$195038';
const fetchuser = (req,res,next)=>{
  // Get user form the jwt token anf=d add id to req
   const token = req.header('auth-token');
   console.log(`AuthToken is  ${token}`);
   if(!token)
   {
    res.status(401).send({error:"Please authenticate using a valid token"});
   }
 
   try {
    const data = jwt.verify(token,JWT_SECRET);
    console.log(`returned data is ${data}`)
   req.user = data.user

   next();
   } catch (error) {
    console.log(token);
    res.status(401).send({error:"Please authenticate using a valid token"});
   }
}

module.exports = fetchuser;