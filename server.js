require('dotenv').config();

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const loanRoutes = require('./routes/loanRoutes');
const returnRoutes = require('./routes/returnRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

app.use(cors({
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('*', cors());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`, req.body);
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/returns', returnRoutes);
app.use('/api/notifications', notificationRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
    .then(() => {
        console.log('Koneksi ke database berhasil.');
    })
    .catch(err => {
        console.error('Tidak dapat terhubung ke database:', err);
    });

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
  });
}); 