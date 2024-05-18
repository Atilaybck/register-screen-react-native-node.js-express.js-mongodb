// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./User');

const app = express();
app.use(express.json());
app.use(cors());

const mongoUrl = 'mongodb://localhost:27017';

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch((e) => console.log('Database connection error:', e));

app.post('/register', async (req, res) => {
  const { name, email, phone, password } = req.body;
  
  const oldUser = await User.findOne({ email });
  if (oldUser) {
    return res.json({ status: 'error', message: 'User already exists' });
  }

  const encryptedPassword = await bcrypt.hash(password, 10);
  
  try {
    const newUser = new User({
      name,
      email,
      phone,
      password: encryptedPassword,
    });
    await newUser.save();
    res.json({ status: 'ok', message: 'User registered successfully' });
  } catch (error) {
    res.json({ status: 'error', message: 'User registration failed' });
  }
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
