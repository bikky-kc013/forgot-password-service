const { registerUser, forgetUser, saveOtp,checkOtp, updatePassword } = require("../models/userAuthModel");
const { registerValidate,forgetValidate,validateOtp } = require("../helpers/userValidator");
const createError  = require("http-errors");
const { transporter } = require("../config/mailer");

const addUser = async (req, res, next) => {
  try {
    const userData = await registerValidate.validateAsync(req.body);
    console.log(userData);
    const addUser = await registerUser(userData);
    res.json("User added");
  } catch (error) {
    console.log(error);
    next(error);
  }
};


const forgetUsers = async (req, res, next) => {
    try {
      const userData = await forgetValidate.validateAsync(req.body);
      const to = userData.to;
      const otp = generateOTP();  

      const userExists  = await forgetUser(userData);
      if(!userExists) throw createError.NotFound("sorry the user not found");   
      const otpSave  = await saveOtp(otp,userData);
      const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject:"Password Reset OTP for Your Account",
        text: `Dear ${forgetUser.to},
        We received a request to reset the password for your account. To complete the password reset process, please use the following One-Time Password (OTP): ${otp}  
        Please enter this OTP on the password reset page to verify your identity and create a new password. If you did not request a password reset, please ignore this email.  `
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send(error.toString());
        }
        res.status(200).send(`Check the email and enter the otp`);
      });
    } catch (error) {
        console.log(error);
      next(error);
    }
  };
  const generateOTP = () => {
    return Math.floor(1000+ Math.random() * 9000).toString();
  };
  


  const resetPassword  = async (req,res,next)=>{
    try{
        const userData  = await validateOtp.validateAsync(req.body);
        const checkotp = await checkOtp(userData);
        if(checkotp === null) throw createError.NotAcceptable("please enter the valid otp");
        const updatepass = await updatePassword(userData);
        res.json({
            message:"password updated successfully"
        })

    }catch(error){
        next(error);
    }
  }
  

module.exports = { addUser, forgetUsers, resetPassword };
