const JWT = require("jsonwebtoken");

const User = require('../models/user');
const {JWT_SECRET} = require('../configuration');

signToken = user => {
    return token = JWT.sign({
        iss: 'codworker',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    },JWT_SECRET);
};

module.exports = {
    signUp: async (req, res, next) => {
       const email = req.value.body.email;
       const password = req.value.body.password;

       const foundUser = await User.findOne({email});
       if(foundUser){
           return res.status(403).json({error:"Email is Already here !"});
       }
       const newUser = new User({
           email: email,
           password: password
       });
       await newUser.save();
        const token = signToken(newUser);
        res.status(200).json({token});
    },
    signIn : async (req, res, next) => {
        const token = signToken(req.user);
        res.status(200).json({token})
    },
    secret : async (req, res, next) => {
        console.log('UserContoller.Secret() called');
        res.json({secret:'Ressources'});
    }
};