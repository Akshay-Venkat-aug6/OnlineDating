const db = require('../../db/psql');
const User = require('../../model/User');
const bcrypt = require('bcryptjs');
const uuid = require('uuid').v4;
const jwt  = require('jsonwebtoken');

const privatekey = "akusfgiuagfiuasgfiuiwey9ry9wyr93yr98y";

module.exports = {
  async registerUser(req, res){
    try {
      const user = req.body;
      console.log(user)
      const checkEmail = await User.findOne({ where: { email: user.email}});
      console.log(checkEmail)
      if(checkEmail){
        let error = new Error("Email is Already Registered");
        throw error
      }
      const userpassowrd = await bcrypt.hash(user.password, 10);
      console.log("hashing: "+userpassowrd);

      const userid = uuid();
      
      const userDetails = {
        id: userid,
        username: user.username,
        email: user.email,
        password: userpassowrd
      };
      console.log(userDetails);

      let { id, username, email, password } = userDetails;
      
      jwt.sign({ id: id}, privatekey, async (err, token)=>{
        await User.create({
          id: id,
          username: username,
          email: email,
          password: password,
          token: token
        });
        res.cookie('authorization', token)
        res.redirect('/')
        res.end()
      });
    } catch (error) {
      console.log(error)
      res.json({errorMessage: error}).status(401)
    }
  },

  async login(req, res){
    try {
      const user = req.body;
      const checkEmail = await User.findOne({ email: user.email });
      if(!checkEmail){
        let error = new Error("Email is Invalid");
        throw error
      }
      const checkPassword = await bcrypt.compare(user.password, checkEmail.password)
      if(!checkPassword){
        let error = new Error('Password is Inlvalid');
        throw error
      }
      
      jwt.sign({ id: checkEmail.id }, privatekey, async (err, token)=>{
        await User.update({token: token}, { where: { id: checkEmail.id}});
        res.cookie('authorization', token)
        res.redirect('/');
        res.end();
      })
    } catch (error) {
      console.log(error.message)
    }
  },

  async logout(req, res){
    try {
      const user = req.user;
      console.log(user)
      const checkEmail = await User.findOne({ where: {email: user.email }});
      if(!checkEmail){
        let error = new Error("Email is Invalid");
        throw error
      }

      await User.update({token : null}, { where: { id: user.id } })
      res.cookie('authorization', null)
      res.redirect('/login')
    } catch (error) {
      console.log(error)
    }
  }
}