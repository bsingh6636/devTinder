const express = require('express')
const connectDB = require('./config/dbConnection')
const User = require('./models/user')
const user = require('./models/user')

const app = express()
app.use(express.json())

app.post('/signUp', async (req, res) => {
    const userObj = req.body
    try {
        let user = new User(userObj)
        user = await user.save()
        res.send(user)
    } catch (error) {
        res.send(error)
    }
})
const cleanupDuplicates = async (req, res) => {
  return res.send( " console.log('hi')")
    try {
        // Find duplicates by emailId
        const emailDuplicates = await User.aggregate([
            { $group: { _id: "$emailId", ids: { $push: "$_id" }, count: { $sum: 1 } } },
            { $match: { count: { $gt: 1 } } }
        ]);

        // Remove duplicates by emailId, keeping the first one
        for (const doc of emailDuplicates) {
            doc.ids.shift(); // Keep the first document
            await User.deleteMany({ _id: { $in: doc.ids } }); // Remove the rest
        }

        // Repeat for firstName or any other fields
        const nameDuplicates = await User.aggregate([
            { $group: { _id: "$firstName", ids: { $push: "$_id" }, count: { $sum: 1 } } },
            { $match: { count: { $gt: 1 } } }
        ]);

        // Remove duplicates by firstName, keeping the first one
        for (const doc of nameDuplicates) {
            doc.ids.shift(); // Keep the first document
            await User.deleteMany({ _id: { $in: doc.ids } }); // Remove the rest
        }

        // Create unique indexes for emailId and firstName
        await User.createIndexes({ emailId: 1, unique: true });
        await User.createIndexes({ firstName: 1, unique: true });

        res.status(200).send({ message: 'Duplicates cleaned up and unique constraints applied.' });
    } catch (error) {
        console.error('Error during cleanup:', error);
       return res.status(500).send({ message: 'Error during cleanup', error: error.message });
    }
};

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
app.use('/test', async (req, res) => {

    const user = await User.findOne({ firstName: "Brijesh Kushwaha" })
    res.send(user)  // endpoint to test the server is running properly
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

app.get('/test',async (req , res)=>{
    console.log('hi')
    res.send('hi')
    cleanupDuplicates(req , res)
  
})
app.patch('/updateUser', async (req, res) => {
    let _id = req.body._id
    cleanupDuplicates()
    let firstName = req.body.firstName
    const obj = req.body
    delete obj._id
    try {
        //     const item = await User.findOneAndUpdate({ _id }, obj, { new: true, upsert: true })
        const item = await user.findByIdAndUpdate(_id, obj, { new: true, upsert: true })
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

//18601801290
//7554 