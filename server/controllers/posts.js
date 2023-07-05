import Post from "../models/Post.js";
import User from "../models/User.js";

// Create
    // userId, description and picturePath sent in by frontend
    // user found via ID and stored in "user" variable
    // new Post is saved to database
    // find all posts and send it back to frontend with a 201(created) status with new post attached in json format
export const createPost = async (req, res) => {
    try{
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePaath,
            picturePath,
            like: {},
            comments: []
        })
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);
    } catch(err){
        // request conflict error
        res.status(409).json({ message: err.message })
    }
}