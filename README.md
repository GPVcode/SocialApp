# Fullstack Social Media App

## Tools

This project will use the following tools:

#### Frontend: 

React, JavaScript, React Router (navigation), Formik & Yup (form validation), redux toolkit (state management), Redux Persist(store in local storage), React dropzone for image uploads

#### Backend: 
Node.js(runtime), Express.js(backend framework), Mongoose (managing Mongo database), JWT (authentication), Multer (file uploads)
Other backend packages: body-parser(process req body), bcrypt(PW encryption), Cors(cross origin request), dotenv(env variables), gridfs-stream(file upload), multer & multer-gridfs-storage(upload files locally), helmet(req safety), Morgan(login)

## Steps

Boiler plate set up for client and server.

Hooked up MongoDB to server.

Designed database structure.

Set up authentication:

- Set up register user API. Register router middleware will be with Multer upload variable in index file. Create controller in separate controllers/auth.js file.

- Set up login API in a seperate folder. Login router middleware may be in its own /routes/auth.js file along with remaining router middlwares to be installed. Controller middlware will be with other controller middleware functions.

Set up authorization: Hit API endpoints unauthorized users lack access to
- create verifyToken middleware function in middlware/auth folder.

- create USER routes (grab particular users via ID, getting user friends list, adding and removing friends)
- set up USER controller middleware functions for getting user, getting user friends, and adding/removing friends.

- set up POST route for picture in index file to use Multer upload.
- create postRoutes in /routes/posts.js
- set up Mongoose model for Post and import it into post controllers
- set up POST middleware controllers (createPost, getFeedPosts, getUserPosts, likePost) in /controllers/post.js

Backend is now complete with necessary routes.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


