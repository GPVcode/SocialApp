import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from '../models/User.js';

//  Register User
    // receive req.body data from frontend, encrypt the password with bcrypt, and create new user.
    // if newUser is generated, save newUser to savedUser and respond to frontend with 201 status(created) and savedUser in json format
export const register = async (req, res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        // create salt to encrypt password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000)
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(err){
        res.status(500).json({ error: err.message});
    }
};


// Login 
    // Request from frontend login provides email and pw. 
    // Mongoose finds matching email and stores user to variable "user".
    // bcrypt compares password to found user's password.
    // jwt provides token
    // before returning response, delete user's pw
    // front end received 200 status with tokes and user data used for log in.
export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if(!user) return res.status(400).json({ msg: "User does not exist. "});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ msg: "Invalid credentials. "});

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET);
        delete user.password;
        res.status(200).json({ token, user });
    } catch(err){
        res.status(500).json({ error: err.message});
    }
};
