/**
 * @description : exports authentication strategy for linkedin using passport.js
 * @params {Object} passport : passport object for authentication
 * @return {callback} : returns callback to be used in middleware
 */

const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../model/user'); 
const dbService = require('../utils/dbService');
const { USER_TYPES } = require('../constants/authConstant');

const linkedinPassportStrategy = passport => {
  passport.serializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function (user, cb) {
    cb(null, user);
  });

  passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENTID,
    clientSecret: process.env.LINKEDIN_CLIENTSECRET,
    callbackURL: process.env.LINKEDIN_CALLBACKURL,
    scope: ['r_emailaddress', 'r_liteprofile'],
  }, async function (token, tokenSecret, profile, done) {
    if (profile){
      let userObj = {
        'ssoAuth': { 'linkedinId': profile.id },
        'email': profile.emails !== undefined ? profile.emails[0].value : '',
        'password':'',
        'userType':USER_TYPES.User
      };
      let found = await dbService.findOne(User,{ 'email':userObj.email });
      if (found){
        const id = found.id;
        await dbService.updateOne(User,{ _id :id },userObj);
      }
      else {
        await dbService.create(User,userObj);
      }
      let user = await dbService.findOne(User,{ 'ssoAuth.linkedinId':profile.id });
      return done(null, user);
    }
    return done(null,null);
  }
  ));
};

module.exports = { linkedinPassportStrategy };