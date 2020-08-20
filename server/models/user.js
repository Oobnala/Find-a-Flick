const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WatchlistSchema = new Schema({
  movieId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  watchlist: [WatchlistSchema]
});

module.exports = mongoose.model('Users', UserSchema);
