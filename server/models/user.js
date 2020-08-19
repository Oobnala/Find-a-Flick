const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FavoritesSchema = new Schema({
  movieId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

const WatchlistSchema = new Schema({
  movieId: {
    type: String,
    require: true
  },
  title: {
    type: String,
    required: true
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
  favorites: [FavoritesSchema],
  watchlist: [WatchlistSchema]
});

module.exports = mongoose.model('Users', UserSchema);
