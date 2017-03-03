var express = require('express');
var router = express.Router();
var models = require('../models');

module.exports = function() {

  router.post('/scores', function(req, res) {
    models.User.findOneAndUpdate({username: req.body.username}, {highScore: req.body.score}, function(err, foundUser){
      if(err){
        console.log(err);
        res.status(400).json({
          success: false,
          message: err.errmsg
        });
      } else if(!foundUser){
        res.status(400).json({
          success: false,
          message: "No user found."
        });
      } else {
        res.status(200).json({
          success: true,
          message: req.body.score
        })
      }
    })
  })

  router.get('/scores/:id', function(req, res) {
    console.log('hi')
    console.log(req.params.id)
    models.User.findOne({_id: req.params.id}, function(err, foundUser){
      console.log(foundUser)
      if(err){
        console.log(err);
        res.status(400).json({
          success: false,
          message: err
        }); 
      } else if(!foundUser.highScore){
        res.status(200).json({
          success: true,
          message: "No high score."
        });
      } else {
        res.status(200).json({
          success: true,
          message: "High score found",
          highScore: foundUser.highScore
        })
      }
    });
  });

  router.get('/leaderboard', function(req, res){
    models.User.find({}, function(err, foundUserArray){
      if(err) {
        console.log(err);
        res.status(400).json({
          success: false,
          message: err
        });
      } else if(!foundUserArray){
        res.status(200).json({
          success: true,
          message: "No leaderboard."
        });
      } else {
        var sortedArray = foundUserArray.slice().sort(function(a, b){
          return a.highScore - b.highScore;
        });
        res.status(200).json({
          success: true,
          highScores: sortedArray
        });
      }
    })
  })

  // router.post('/register', function(req, res) {
  //   var u = new models.User({
  //     username: req.body.username,
  //     password: req.body.password
  //   });
  //   u.save(function(err, user) {
  //     if (err) {
  //       console.log(err);
  //       res.status(400);
  //       return;
  //     }
  //     console.log(user);
  //     res.status(200).json(user)
  //   });
  // });
  //
  // // POST Login page
  // router.post('/login', function(req, res) {
  //   models.User.findOne({username: req.body.username}, function(err, foundUser){
  //     if(err){
  //       res.status(500);
  //     } else if(!foundUser){
  //       res.status(400).json({
  //         success: false,
  //         message: "User not found."
  //       });
  //     } else if(foundUser.password === req.body.password) {
  //       res.json({
  //         success: true,
  //         message: "Successfully logged in."
  //       });
  //     }
  //   })
  // });
  router.post('/register', function(req, res) {
    var u = new models.User({
      username: req.body.username,
      password: req.body.password
    });
    u.save(function(err, user) {
      if (err) {
        console.log(err);
        res.status(400);
        return;
      }
      console.log(user);
      res.status(200).json(user)
    });
  });

  // POST Login page
  router.post('/login', function(req, res) {
    models.User.findOne({username: req.body.username}, function(err, foundUser){
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
      }
    })
  });

  return router;
};
