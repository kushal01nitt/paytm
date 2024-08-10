const express = require("express");
const { User, Account } = require("../db");
const  z = require("zod");
const router = express.Router();
const {JWT_SECRET} = require("../config");
const { authMiddleware } = require("../middleware");
const jwt = require("jsonwebtoken");

const singupSchema = z.object({
    username : z.string().email(),
    password : z.string().min(6),
    firstName : z.string(),
    lastName : z.string()
})

const updatedBody = z.object({
    password : z.string().optional(),
    firstName : z.string().optional(),
    lastName : z.string().optional(),
})

 const signinSchema = z.object({
    username : z.string().email(),
    password : z.string().min(6)
 })

router.post('/signup', async function(req,res){ 
    const {success} = singupSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message : "Incorrect inputs"
        })  
    }
    const existingUser = await User.findOne({
        username : req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message : "Email already taken"
        })
    }

    const user = await User.create({
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
    })

    const userId = user._id;

    await Account.create({
        userId,
        balance : 1+ Math.random()*10000
    })

    const token = jwt.sign({userId},JWT_SECRET);
    res.json({
        message : "User Created successfully",
        token : token
    })
})

router.post('/signin',async function(req,res){
    const {success}  = signinSchema.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            message : "Enter correct inputs"
        })
    }
     const user  = await User.findOne({
        username : req.body.username,
        password : req.body.password
     });

     if(user){
         const token = jwt.sign({userId : user._id},JWT_SECRET);

         res.json({
            message : "User logged in successfully",
            token : token
         })
         return;
     }
     else{
        return res.status(411).json({
            message : "Wrong password/username"
        })
     }
})

router.put('/',authMiddleware, async function(req,res){
    const {success} = updatedBody.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message : "Error while updating information "
        })
    }

    await User.updateOne(req.body,{
        id:req.userId
    })

    res.json({
        message : "Updated successfully "
    })
}) 

router.get("/bulk",async function(req,res){
    const filter = req.query.filter || "";

    const users = await User.find({
        $or :[{
            firstName : {
                "$regex" : filter
            }
        },{
            lastName : {
                "$regex" : filter
            }
        }]
    })
    res.json({
        user : usersmap(user => ({
            username : user.username,
            firstName : user.firstName,
            lastName : user.lastName,
            _id : user._id
        }))
    })
})
module.exports = router;