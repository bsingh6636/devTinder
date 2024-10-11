const express = require('express')
const connectDB = require('./config/dbConnection')
const User = require('./models/user')
const user = require('./models/user')
const { default: mongoose } = require('mongoose')

const app = express()
app.use(express.json())

app.post('/signUp', async (req, res) => {
    const userObj = req.body
    try {
        let user = new User(userObj)
        user = await user.save()
        res.send(user)
    } catch (error) {
        res.send(error.message)
    }
})


app.get('/feed', async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).send(users)
    } catch (error) {
        res.send(error)
    }
})

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
// app.use('/test', async (req, res) => {

//     const user = await User.findOne({ firstName: "Brijesh Kushwaha" })
//     res.send(user)  // endpoint to test the server is running properly
// })
app.delete('/deleteUser', async (req, res) => {
    const id = req.body.id
    try {
        const user = User.findByIdAndDelete(id);
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})

app.get('/test', async (req, res) => {
    console.log('hi')
    res.send('hi')
    cleanupDuplicates(req, res)

})


app.patch('/updateUser/:userId', async (req, res) => {
    let _id = req.params.userId
    console.log(_id)
    if(!_id) return res.status(400).send('id is required')
    const obj = req.body
    delete obj._id
    const notAllowedObjects = ['country', 'emailId',]
    console.log(obj)
    const isUpdateAllowed = Object.keys(obj).every(key => !notAllowedObjects.includes(key))
    if (!isUpdateAllowed) return res.status(400).send('change not allowed')
    try {
        //     const item = await User.findOneAndUpdate({ _id }, obj, { new: true, upsert: true })
        const item = await user.findByIdAndUpdate(_id, obj, { new: true, upsert: true , runValidators : true })
        return res.send(item)
    } catch (error) {
        res.send(error)
    }
})


connectDB().
    then(() => {
        console.log("MongoDB connected")
        app.listen(1234, () => {
            console.log("Server is running on port 1234")  // server will start on this port
        })
    })
