const express = require("express");
const app = express();
app.use(express.json());
const { CreateConnection } = require("./config/connection");
CreateConnection();
const dotenv = require("dotenv");
dotenv.config();
const { userAuthRouter }  = require("./routes/userAuthRoute");

app.use(userAuthRouter);




const PORT = process.env.PORT || 3000;
app.use((req,res,next)=>{
    res.json("This route is not defined");
});


app.use((err,req,res,next)=>{
    res.json({
        errMessage:err.message,
        errName:err.name
    });
})

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Connected to the port ${PORT}`);
});
