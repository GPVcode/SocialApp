import Post from "../models/Post.js";
import User from "../models/User.js";

// Create
    // userId, description and picturePath sent in by frontend
    // user found via ID and stored in "user" variable
    // new Post is saved to database
    // find all posts and send it back to frontend with a 201(created) status and new post attached in json format
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
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
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

// Read
    // find all posts and respond to front end with post data in json format
export const getFeedPosts = async (req, res) => {
    try{
        const post = await Post.find();
        res.status(200).json(post);
    }catch(err){
        res.status(400).json({ message: err.message })
    }
};

    // Bring in userId from params
    // find posts by userId
    // respond with those particular posts via userId
export const getUserPosts = async (req, res) => {
    try{
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    }catch(err){
        res.status(400).json({ message: err.message })
    }
}

// Update
    // grab relevant post query string id(params) and userId from requested body
    // find the post by query string id(params)
    // get isLiked status of the post by using get request for a userId
    // if is liked, delete userId from the object
    // else set userId to true in the likes object
    // pass in new likes to the post we've modified
    // pass updated new post to frontend in json format
export const likePost = async (req, res) => {
    try{
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked){
            post.likes.delete(userId);
        } else{
            post.likes.set(userId, true);
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        );

        res.status(200).json(updatedPost);
    }catch(err){
        res.status(404).json({ message: err.message })
    }
};