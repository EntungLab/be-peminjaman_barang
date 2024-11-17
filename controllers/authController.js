const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { validationResult } = require('express-validator');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Email atau password salah' });
    }

    // Jika login berhasil, Anda bisa mengembalikan token atau data pengguna
    res.status(200).json({ message: 'Login berhasil', user });
  } catch (error) {
    res.status(500).json({ message: 'Terjadi kesalahan pada server', error });
  }
};

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

