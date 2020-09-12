const User = require('../models/user');
const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.register = async (req, res) => {
  const existEmail = await User.find({
    email: req.body.email
  });

  const existUsername = await User.find({
    username: req.body.username
  });

  if (existEmail.length != 0 || existUsername != 0) {
    res.send({ valid: false, message: 'Email or username taken' });
  } else {
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash
      });
      try {
        const newUser = await user.save();
        res.send({ valid: true, userId: newUser._id });
      } catch (err) {
        res.send({ valid: false, message: err });
      }
    });
  }
};

exports.login = async (req, res) => {
  const existUser = await User.find({
    email: req.body.email
  });
  if (existUser.length === 1) {
    bcrypt.compare(req.body.password, existUser[0].password, (err, result) => {
      if (result === true) {
        res.send({
          valid: true,
          userId: existUser[0]._id
        });
      } else {
        res.send({
          valid: false,
          message: 'Invalid password'
        });
      }
    });
  } else {
    res.send({ valid: false, message: 'User not found' });
  }
};

exports.addToWatchlist = async (req, res) => {
  try {
    let user = await User.find({ _id: req.body.userId });

    if (user.length === 1) {
      user[0].watchlist.push({ movieId: req.body.movieId });
      user[0].save();
      res.send({ valid: true, message: 'movie added to watchlist' });
    } else {
      res.send({ valid: false, message: 'Could not find user' });
    }
  } catch (err) {
    res.send({ valid: false, message: err });
  }
};

exports.getWatchlist = async (req, res) => {
  const user = await User.find({ _id: req.body.userId });
  try {
    if (user.length === 1) {
      res.send({ valid: true, watchlist: user[0].watchlist });
    } else {
      res.send({ valid: false, message: 'Could not find user' });
    }
  } catch (err) {
    res.send({ valid: false, message: err });
  }
};
