const express = require('express');
const { sendingRequest } = require('../controllers/requestController.js');

const requestRouter = express.Router();

requestRouter.post('/send/:status/:toUserId', async(req , res) => {
    const params = req.body;
    params.toUserId = req.params.toUserId;
    params.status = req.params.status;
    params.fromUserId = req.user.id
    const data = await sendingRequest(params);
    res.send(data);
})

module.exports = requestRouter;