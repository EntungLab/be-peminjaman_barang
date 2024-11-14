const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password, name, email, class: userClass, phone_number } = req.body;
    const user = await User.create({ username, password, name, email, class: userClass, phone_number });
    res.status(201).json({ message: 'Registrasi berhasil', user });
  } catch (error) {
    res.status(400).json({ message: 'Registrasi gagal', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Username atau password salah' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login berhasil', token });
  } catch (error) {
    res.status(400).json({ message: 'Login gagal', error: error.message });
  }
}; 