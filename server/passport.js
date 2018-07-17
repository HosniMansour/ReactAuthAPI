const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

const { JWT_SECRET } = require("./configuration");

// Json Web Token Strategy

passport.use(new JwtStrategy({
    jwtFromRequest : ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
},async (payLoad, done) => {
    try{
        // find the users in token
        console.log('try to find user');
        const user = await User.findById(payLoad.sub);
        // if user dosen't exist handle it
        if(!user){
            console.log('user not found');
            return done(null,false);
        }
        // return the user
        console.log('user found');
        done(null,user);
    }catch (e) {
        console.log('error -_-');
        done(e,false);
    }
}));

// Local Strategy

passport.use(new LocalStrategy({
    usernameField: 'email'
},async (email, password, done) => {
    try {

        const user = await User.findOne({email});
        // if not handle it
        if(!user){
            return done(null,false);
        }
        // if found check the password
        const isMatch = await user.isValidPassword(password);
        // if not handle it
        if(!isMatch){
            return done(null,false);
        }
        // return the user
        done(null,user);
    }catch (e) {
        done(e,false);
    }
}));