const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminModel');
const User = require('../models/userModels');
const  Review  = require('../models/reviewModel');
const Favorite  = require('../models/favoriteModel');



const adminRegister = async (req,res) => {
    try {
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
        const authorization_key = req.body.authorization_key

        if (username === undefined || email === undefined || password === undefined || authorization_key === undefined) {
            return res.status(400).json({message: "Authentification failed: Missing the required fields."});
        }

        const existingAdmin = await User.findOne({ email: email });
        if (existingAdmin) {
          return res.status(422).json({ message: "Email already exists" });
        }

        const hashedPassword = bcrypt.hashSync(password, saltRounds);

        if (authorization_key !== process.env.ADMIN_AUTH_KEY) {
            return res.status(401).json({ message: "Invalid authorization key" });
          }


        const admin = new Admin({
            username: username,
            email: email,
            password: hashedPassword,
            authorization_key: process.env.ADMIN_AUTH_KEY
        })

        await admin.save();
        
        const token = jwt.sign({ data:admin._id }, process.env.SECRET_KEY, { expiresIn: '24h' })
         const adminResponse = {...admin._doc}
        delete adminResponse.authorization_key;

        res.status(201).json({token,...adminResponse, message: "Successfuly created an Account"})

    } catch (error) {
        console.error("Signup error: ", error);
        res.status(500).json({error: "Internal server error"});
        
    }

}

const adminSignin = async (req,res) => {
    try {
        const username = req.body.username
        const email = req.body.email;
        const password = req.body.password;
        const authorization_key = req.body.authorization_key;

        if (username === undefined || email === undefined || password === undefined || authorization_key === undefined) {
            return res.status(400).json({error: "Authentification failed: Missing username, email, password and authorization key."});
        }

        const admin = await Admin.findOne({email: email} ).select("username email password authorization_key").exec()

        if(!admin) {
            return res.status(401).json({error: "Unauthorized access: user not found."});
        }

        const passwordMatch = bcrypt.compareSync(password, admin.password);

        if(passwordMatch && authorization_key === process.env.ADMIN_AUTH_KEY ) {
            const token = jwt.sign({ data: admin._id }, process.env.SECRET_KEY, { expiresIn: '24h' })
           
            const adminResponse = {...admin._doc}
            delete adminResponse.authorization_key
            return res.status(200).json({token, ...adminResponse, message: "Signin successful"})
        }else {
            return res.status(401).json({error: "Unauthorized access: Incorrect Password"});
        }

    } catch (err) {
        console.error("Signin error:", err);
        res.status(500).json({error: "Internal server error"});
    }
}

const updatePassword = async (req, res) => {
    try {
      const adminId = req.decoded.data;
      const email = req.body.email; 
      const password = req.body.newPassword;

      if (email === "" || password === "" ) {
        return res.status(400).json({error: "Authentification failed: Missing email, username, password."});
      }

      const admin = await Admin.find({admin:adminId, email});
      if (!admin) {
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      // Hash the new password
      const hash = bcrypt.hashSync(password, saltRounds);
  
      // Find the user and update password
      const updatedPassword = await Admin.findByIdAndUpdate(adminId, { password: hash }, { new: true });
  
      if (!updatedPassword) {
        return res.status(401).json({ message: "Unauthorized" });
      } else {
        return res.status(200).json({ data: "Password Updated Successfully" });
      }
    } catch (error) {
      console.error("Update password error:", error);
      res.status(500).json({error: "Internal server error"});
    }
};


//To get the list of users and their entire activity
const getAllTheUsers = async (req,res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.log('error: ',error);
        res.status(500).json({error: "Internal server error"});
    }
}

//to get the reviews of a particular user
const getAllTheReviewsOfUserById = async (req,res) => {
    try {
        const {userId} = req.params;
        console.log(userId)
        const reviews = await Review.find({user:userId})
        res.status(200).json(reviews)
    } catch (error) {
        console.log("error :", error)
        res.status(500).json({error: "failed"});
    }
}

//To get all the favorites of a particular user
const getAllTheFavoritesOfUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const favorites = await Favorite.find({user: userId})
        res.status(200).json(favorites)
    } catch (error) {
        console.log("error :", error)
        res.status(500).json({error: "failed"});
    }
}

const getSingleAdmin = async (req,res) => {
    try {
        const decoded = req.decoded;
        const userId = decoded.data;

        if (!userId) return res.status(400).json({message: "User is not exist!"})

        const admin = await Admin.findById(userId)
        res.status(200).json(admin)
    } catch (error) {
        console.error("Data Fetching error:", error);
        res.status(500).send("Internal server error");
        
    }
}


module.exports = {
    adminRegister,
    adminSignin,
    updatePassword,
    getAllTheUsers,
    getAllTheReviewsOfUserById,
    getAllTheFavoritesOfUser,
    getSingleAdmin
}