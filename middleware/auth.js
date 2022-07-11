const { auth, requiresAuth } = require('express-openid-connect');

module.exports = {
    ensureAuth: function (req, res, next) {
      if (requiresAuth()) {
        return next()
      } else {
        res.redirect('/login')
      }
    },
    ensureGuest: function (req, res, next) {
      if (!requiresAuth()) {
        return next()
      } else {
        res.redirect('/main')      
      }
    },
  }