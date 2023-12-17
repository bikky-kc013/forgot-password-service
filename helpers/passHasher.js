const bcrypt  = require("bcrypt");


const hashPass = async (userPass)=>{
    const salt =10;
    const hashedPass = await bcrypt.hash(userPass,salt);
    return hashedPass;
};

module.exports =  { hashPass };