var express = require('express');
var router = express.Router();
var models = require('../models');

module.exports = function() {

  router.post('/register', function(req, res) {
    var u = new models.User({
      username: req.body.username,
      password: req.body.password
    });
    u.save(function(err, user) {
      if (err) {
        console.log(err);
        return res.status(400).json({
          success: false,
          message: err.errmsg
        });
      }
      console.log(user);
      res.status(200).json({
        success: true,
        user: user
      })
    });
  });

  // POST Login page
  router.post('/login', function(req, res) {
    models.User.findOne({username: req.body.username}, function(err, foundUser){
      console.log('foundUser', foundUser);
      console.log('reqbody', req.body.username)
      if(err){
        res.status(500);
      } else if(!foundUser){
        res.status(400).json({
          success: false,
          message: "User not found."
        });
      } else if(foundUser.password === req.body.password) {
        res.json({
          success: true,
          message: "Successfully logged in."
        });
      } else {
        res.status(400).json({
          success: false,
          message: "Something went wrong!"
        })
      }
    })
  });

  return router;
};
