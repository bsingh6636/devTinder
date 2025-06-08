const express = require('express');

const router = express.Router();

router.get('/profile' , async(req , res , next)=>{
    const cookies = req.cookies.userDataToken2
    if(!cookies) return res.status(400).send('no cookies found');
    const user = jwt.verify(cookies , 'privatekey')?.user;
    const userExist = await DB.user.findOne({ where : { emailId : user.emailId } })
    if(!userExist) return res.status(400).send('user not exist')
    res.send(user)
})

module.exports = router;