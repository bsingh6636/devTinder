const express = require('express')
const connectDB = require('./config/dbConnection')
const User = require('./models/user')
const user = require('./models/user')
const singUpValidator = require('./utils/signUpDataValidator')
const bcrypt = require('bcrypt')
const validator = require('validator')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const userAuth = require('./middleWare/auth')

const app = express()
app.use(express.json())
app.use(cookieParser())

app.post('/signUp', async (req, res) => {
    const { emailId, password, firstName, lastName, age, gender, country, skills, photoUrl } = req.body
    try {
        singUpValidator(req)
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        let user = new User({ emailId, password: hashedPassword, firstName, lastName, age, gender, country, skills, photoUrl })
        user = await user.save()
        res.send(user)
    } catch (error) {
        console.log(('error while signing up : ' + error))
        res.send('error while signing up : ' + error.message)
    }
})

// app.get('/feed' ,userAuth , async (req, res) => {
//     try {
//         console.log(req.user)
//         const users = await User.find({})
//         res.status(200).send(users)
//     } catch (error) {
//         res.send(error)
//     }
// })

app.post('/findByEmail', async (req, res) => {
    const emailId = req.body.emailId
    const users = await User.find({ emailId })
    res.send(users)
})
app.post('/findById', async (req, res) => {
    const id = req.body.id
    const firstName = req.body.firstName
    try {
        const users = await User.findById(id)
        // const users = await user.find({ firstName })
        if (users) res.send(users);
        else res.send('no user found')
    } catch (error) {
        res.send(error.message)
    }

})

app.delete('/deleteUser', async (req, res) => {
    const id = req.body.id
    try {
        const user = User.findByIdAndDelete(id);
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})
app.patch('/updateUser/:userId', async (req, res) => {
    let _id = req.params.userId
    if (!_id) return res.status(400).send('id is required')
    const obj = req.body
    delete obj._id
    const notAllowedObjects = ['country', 'emailId',]
    const isUpdateAllowed = Object.keys(obj).every(key => !notAllowedObjects.includes(key))
    if (!isUpdateAllowed) return res.status(400).send('change not allowed')
    try {
        //const item = await User.findOneAndUpdate({ _id }, obj, { new: true, upsert: true })
        const item = await user.findByIdAndUpdate(_id, obj, { new: true, upsert: true, runValidators: true })
        return res.send(item)
    } catch (error) {
        res.send(error)
    }
})

app.post('/signIn', async (req, res, next) => {
    try {
        const { emailId, password } = req.body;
        if (!emailId || !password) return res.status(400).json('emailId and password required')
        if (!validator.isEmail(emailId)) return res.status(400).json('invalid email')

        const user = await User.findOne({ emailId })
        if (!user) return res.status(400).json('user not found')
        const isPasswordCorrect = await bcrypt.compare(password , user.password) 
        if(!isPasswordCorrect) return res.status(400).json('incorrect credentials')
        const token = jwt.sign({_id : user._id} , 'privatekey')
        res.cookie('userToken', token)
        res.send({ user})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.get('/profile' , async(req , res , next)=>{
    const cookies = req.cookies.userToken
    if(!cookies) return res.status(400).send('no cookies found')
    const userId = jwt.verify(cookies , 'privatekey')
    const user = await User.findById(userId)
    res.send(user)
})

app.listen(1234, () => {
    console.log("Server is running on port 1234")  // server will start on this port
})
