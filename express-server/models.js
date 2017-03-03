var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    index: {
      unique: true
    },
    required: true
  },
  password: {
    type: String,
    required: true
  },
  highScore: {
    type: Number
  },
  numGamesPlayed: {
    type: Number
  },
  timeElapsed: {
    type: Number
  }
});

var questionSchema = mongoose.Schema({
  question: {
    type: String
  },
  codeSnippet: {
    type: String
  },
  choices: {
    type: Array
  },
  correctAnswer: {
    type: String
  },
  difficulty: {
    type: String
  }
});

User = mongoose.model('User', userSchema);
Question = mongoose.model('Question', questionSchema);

module.exports = {
    User: User,
    Question: Question
};
