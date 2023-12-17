const joi  = require("joi");

const registerValidate  = joi.object({
    email:joi.string().required().email(),
    password:joi.string().required().min(4)
});


const loginValidate  = joi.object({
    email:joi.string().required().email(),
    password:joi.string().required().min(4)
});


const forgetValidate = joi.object({
    to:joi.string().email(),
    subject:joi.string(),
    text:joi.string()
})

const validateOtp = joi.object({
    otp: joi.number().required(),
    newpassword: joi.string().required(),
    confirmpassword: joi.string()
        .required()
        .valid(joi.ref('newpassword'))
        .messages({ 'any.only': 'Passwords do not match.' }),
});


module.exports = {
    registerValidate,loginValidate, forgetValidate, validateOtp
}