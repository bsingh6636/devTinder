const express = require('express');
const { DB } = require('../models');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');

const router = express.Router();

router.get('/test', async (req, res) => {
  res.send('test');
});

router.use('/auth', authRouter);
router.use('/profile', profileRouter);

router.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API route not found',
    path: req.originalUrl
  });
});

router.use((err, req, res, next) => {
  console.error('💥 Error:', err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
  });
});

module.exports = router;
