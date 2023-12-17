const {  connection }  = require("../config/connection");
const { hashPass } = require("../helpers/passHasher");


const registerUser  = async (userData)=>{
        const securePass = await hashPass(userData.password);
        await connection.promise().query(`INSERT INTO user(email,password) VALUES (?,?)`,[userData.email, securePass]);
}


const forgetUser  = async (userData) =>{
    const [userRow] = await connection.promise().query(`SELECT email FROM user WHERE email = ?`, [userData.to]);
    return userRow.length>0;
}

const saveOtp  = async (otp, userData) =>{ 
    await connection.promise().query(`UPDATE user SET otp = ? WHERE email = ?`, [otp, userData.to]);      
}

const checkOtp = async (userData)=>{
  const [otp] = await connection.promise().query(`SELECT otp FROM user WHERE otp = ?`, [userData.otp]);
  if(otp.length>0){
    return otp[0].otp;
  }else{
    return null;
  }
}

const nullOtp = async (userData)=>{
    await connection.promise().query(`UPDATE user SET otp = NULL WHERE email = ?`, [userData.to]);
}

const updatePassword = async (userData)=>{
    const securePass = await hashPass(userData.confirmpassword);
    await connection.promise().query(`UPDATE user SET password = ?, otp = NULL WHERE otp = ?`,[securePass, userData.otp]);
}

module.exports = { registerUser, forgetUser, saveOtp,nullOtp, checkOtp, updatePassword };