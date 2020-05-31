const User = require('../model/User');

module.exports = async (req, res, next)=>{
  const token = req.cookies.authorization;
  if(!token){
    res.redirect('/')
  }
  const checkUser = await User.findOne({token: token})
  req.user = checkUser.dataValues;
  next();
}
