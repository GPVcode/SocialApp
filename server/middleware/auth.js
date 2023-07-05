import jwt from "jsonwebtoken";

// Grab token from request header
// verify token with jwt verify
// can now be used in API routes such as login
export const verifyToken = async (req, res, next) => {
    try{
        let token = req.header("Authorization");

        if(!token){
            return res.status(403).send("Access Denied");
        }

        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch(err){
        res.status(500).json({ error: err.message })
    }
};