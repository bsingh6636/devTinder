const validator = require('validator')
const singUpValidator = (req) => {
    const { emailId, password, firstName, lastName } = req.body
    const requiredFields = ['emailId', 'password', 'firstName', 'lastName', 'age'];

    for (let field of requiredFields) {
        if (!req.body[field]) throw new Error(`${field} is required`);
    }
    
    if (!emailId || !validator.isEmail(emailId) || emailId.length > 50) throw new Error('email validator failed')

    if (!password || password.length < 8 || !validator.isStrongPassword(password)) throw new Error('choose 8 characcter strong password')
    if (!firstName || firstName.length < 4 || firstName.length > 50) throw new Error('firstName should be atleast 4 and max 50 character long')
    if (!lastName || lastName.length < 4 || lastName.length > 50) throw new Error('lastName should be atleast 4 and max 50 character long')





    // for ( const field of requiredFields ) {
    //     if()
}

module.exports = singUpValidator