const router = require('express').Router();
const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

// REGISTER
router.post("/register", async(req, res) =>{
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SEC_PASS).toString()
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }catch(err){
        res.status(500).json(err);
    }
});


// LOGIN
router.post("/login", async(req, res) =>{
    try{
        const getUser = await User.findOne({username: req.body.username});
        !getUser && res.status(401).json('wrong creadentials!');

        const hashedPassword = CryptoJS.AES.decrypt(getUser.password, process.env.SEC_PASS);

        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        OriginalPassword !== req.body.password && res.status(401).json('bad creadentials');
        const {password, ...others} = getUser._doc;

        const token = jwt.sign({
            id: getUser._id,
            isAdmin: getUser.isAdmin,
        },
        process.env.JWT_SEC,
        { expiresIn: "3d" })

        res.status(200).json({...others, token});
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;