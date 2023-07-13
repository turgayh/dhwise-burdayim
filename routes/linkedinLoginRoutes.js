/**
 * linkedinLogin.js
 * @description :: routes of linkedin authentication
 */

const express = require('express');
const router = express.Router();
const passport = require('passport');

const { socialLogin } = require('../services/auth');

router.get('/auth/linkedin/error', (req, res) => {
  res.loginFailed({ message:'Login Failed' });
});

router.get('/auth/linkedin', passport.authenticate('linkedin', {
  scope: ['r_emailaddress', 'r_liteprofile'],
  session: false 
}));

router.get('/auth/linkedin/callback',
  (req,res,next)=>{
    passport.authenticate('linkedin', { failureRedirect: '/auth/linkedin/error' }, async (error, user , info) => {
      if (error){
        return res.internalServerError({ message:error.message });
      }
      if (user){
        try {
          let result = await socialLogin(user.email, req.session.platform);
          if (result.flag) {
            return res.failure({ message: result.data });
          }
          return res.success({
            data: result.data,
            message:'Login Successful' 
          });
        } catch (error) {
          return res.internalServerError({ message: error.message });
        }
      }
    })(req,res,next);
  });

module.exports = router;