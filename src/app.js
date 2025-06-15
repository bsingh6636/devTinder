const express = require('express');
const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const { userAuth } = require('./middleWare/auth');

const router = express.Router();

router.get('/health', async (req, res) => {
  res.send('test sucess , api working ');
});

router.use('/auth', authRouter);
router.use('/profile', userAuth, profileRouter);
router.use('/request', userAuth, requestRouter);

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
