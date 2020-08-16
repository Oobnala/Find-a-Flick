const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

app.use(bodyParser.json());

// Routes
const userRoutes = require('./routes/user_routes');

app.use('/user', userRoutes);

app.get('/', (req, res) => {
  res.send('We are on home');
});

mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to db');
  }
);

app.listen(3001);
