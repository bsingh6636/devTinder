const express = require('express')
const logger = require('../utils/logger')
const singUpValidator = require('../utils/signUpDataValidator')
const bcrypt = require('bcrypt')
const {DB} = require('../../models')
const { ulid } = require('ulid')
const jwt = require('jsonwebtoken');
const validator = require('validator')

const router = express.Router()

router.post('/signUp', async (req, res) => {
    const { emailId, password, firstName, lastName, age, gender, country, skills, photoUrl } = req.body
    // console.log(db)
    try {
        singUpValidator(req)
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUlid = ulid();
        const [user, created] = await DB.user.findOrCreate({
            where : {
                emailId
            },
           defaults:{
             emailId, password: hashedPassword, firstName, lastName, age, gender, country, skills, photoUrl, ulid: newUlid
           }, raw:true })
        console.log(user , created)
        if(created) res.send({ message: 'user created successfully', user})
        else res.send({ message: 'user already exist with this email', user})
    } catch (error) {
        logger.error(error);
        res.send('error while signing up : ' + error.message)
    }
})

router.post('/signIn', async ( req, res, next ) => {
    try {
        const { emailId, password } = req.body;
        if ( !emailId || !password ) return res.status(400).json('emailId and password required')
        if ( !validator.isEmail( emailId ) ) return res.status(400).json('invalid email');

        const user = await DB.user.findOne( { where : { emailId } } );
        if ( !user ) return res.status(400).json('user not found');
        const isPasswordCorrect = await bcrypt.compare( password , user.password ); 
        if ( !isPasswordCorrect ) return res.status(400).json('incorrect credentials');
        const userData = user.get({ plain : true });
        delete userData.password;
        const token = jwt.sign({ user : userData } , 'privatekey');
        res.cookie( 'devTinderToken', token );
        res.send({ user });
    } catch (error) {
        logger.error(error);
        res.send(error)
    }
})

router.get('/logout', (req , res) => {
    const cookie = req.cookies.devTinderToken;
    if(!cookie) return res.send('Token not found')
    res.clearCookie('devTinderToken').send('Logout successfully')
})

module.exports = router;