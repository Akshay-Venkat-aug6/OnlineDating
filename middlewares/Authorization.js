const User = require('../model/User');

module.exports = async (req, res, next)=>{
  const token = req.cookies.authorization;
  if(!token){
    return res.json({ message: 'Invalid Token'}).status(401);
  }
  const checkUser = await User.findOne({token: token})
  req.user = checkUser.dataValues;
  next();
}
