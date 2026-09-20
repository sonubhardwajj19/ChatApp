import express from "express";
import dotenv from "dotenv";
import mongoose  from "mongoose";
import User from "./models/User.js";
import jwt from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

mongoose.connect(process.env.MONGO_URL)
const jwtSecret = process.env.JWT_SECRET;


app.post('/register' , async (req,res) => {
    const {username , password} = req.body;
    console.log(username)
    try {
        const createdUser = await User.create({username,password});
        jwt.sign({userId:createdUser._id,username}, jwtSecret, (err,token) => {
            if(err) throw err;
            res.cookie('token',token , {sameSite:'none' , secure:true}).status(201).json({
                id : createdUser._id
            });
        })
    } catch (err){
        if(err)  throw err;
    }
})


app.get('/profile', (req,res) => {

  const token= req.cookies?.token;
  if(token) {
      jwt.verify(token,jwtSecret , (err, userData) => {
          if(err) throw err;
          res.json(userData);
      })
  } else {
    res.status(401).json('No token');
  }

})

app.listen(4000);