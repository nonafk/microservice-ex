const passport = require('passport');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_KEY;
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    try{
        const user = { user_id:jwt_payload.user_id,role:jwt_payload.role};
        if(user){
            return done(null,user);
        }
    }catch(error){
        done(error)
    }
}));

module.exports.checkAuth = passport.authenticate("jwt",{session:false})