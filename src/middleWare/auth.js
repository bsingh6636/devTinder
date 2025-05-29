const jwt = require('jsonwebtoken')
const User = require('../models/user')

const userAuth = async(req , res , next) =>{
   try {
     const token = req.cookies.userToken;
     const decoded = jwt.verify(token,'privatekey')
     if(!decoded) {throw new Error('invalid token')}
     const {_id} = decoded ;
     console.log(_id)
     let user = await User.findById(_id)
     console.log(user)
     req.user=user
     next()
   } catch (error) {
    res.send(error)
   }
}

module.exports = { userAuth }