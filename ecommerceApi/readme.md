#### Initial setup:
- create a folder name ecommerceAPI
- run `npm init -y` in the terminal
- install dependencies
- setup db and connections

#### create a route folder:
- inside this create `user.js` for user routes
- add `app.use(express.json())` inside `index.js` file
to use json data for ex- we use req.body.username in postman to handle post request.

#### create models folder:
- inside this create 
    - User.js model
    - Cart.js model
    - Product.js model
    - Order.js model
__Note__: go to all the file to see the code.
#### define all routes inside routes
    - auth
    - cart
    - order
    - product
    - user

#### auth route:
##### Register a user:
- in auth.js route let define a post method to register a user.
```js
    // in auth.js
    const router = require('express').Router();
    const User = require('../models/User')


    // REGISTER
    router.post("/register", async(req, res) =>{
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        try{
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        }catch(err){
            res.status(500).json(err);
        }
    });


    module.exports = router;
```
__Note__: since in the above code there is no method to secure password if someone get access to db they able to see password or even a admin should not see the exact password of user for that we can use many library (npm) but here we use __CryptoJS__.

- so the updated code is here
```js
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
```


##### Login a user:
- Here we define Login router for login a user with the valid username and password.
- But here no web token we use to improve url security of communication between the channel.


```js

    // LOGIN
    router.post("/login", async(req, res) =>{
        try{
            const getUser = await User.findOne({username: req.body.username});
            !getUser && res.status(401).json('wrong creadentials!');

            const hashedPassword = CryptoJS.AES.decrypt(getUser.password, process.env.SEC_PASS);

            const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
            OriginalPassword !== req.body.password && res.status(401).json('bad creadentials');
            const {password, ...others} = getUser._doc;

            res.status(200).json(others);
        }catch(err){
            res.status(500).json(err);
        }
    })
```
#### JsonWebToken:
- for detail you can go to net and see what it is and how it can be used but for little info i provide you resource
JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. A JWT is composed of three parts: a header, a payload, and a signature.

The header typically consists of two parts: the type of token, which is JWT, and the signing algorithm that is used to sign the token, such as HMAC SHA256 or RSA.

The payload contains the claims or statements about an entity (typically, the user) and additional data. Claims are pieces of information about the user, such as the user ID, email address, or expiration time.

The signature is used to verify that the message wasn't changed along the way and, in the case of signed tokens, to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't tampered with.

JWTs are often used for authentication and authorization in web applications. The server can issue a JWT to the client after the client has authenticated with a username and password, and the client can then send the JWT along with subsequent requests to prove that it is authorized to access the requested resource.

First, you'll need to install the jsonwebtoken package:
```bash
    npm install jsonwebtoken
```
Then, you can use the jsonwebtoken package to generate and verify JWTs.

To generate a JWT:

```js
    const jwt = require('jsonwebtoken');

    const secretKey = 'mySecretKey'; // this should be kept secret in production
    const payload = {
    userId: '12345',
    email: 'user@example.com'
    };
    const options = {
    expiresIn: '1h'
    };
    const token = jwt.sign(payload, secretKey, options);
    console.log(token);
```
This will generate a JWT with the specified payload, signed with the secret key, and with an expiration time of 1 hour. The console.log statement will print the generated token.

To verify a JWT:
```js

    const jwt = require('jsonwebtoken');

    const secretKey = 'mySecretKey'; // this should be kept secret in production
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NSIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTYyMDMwMDIzOSwiZXhwIjoxNjIwMzAxODM5fQ.9P8FnyY9sMgT_hZdLJkGjKgxJhL0f2IW_uOgFjKkOYk';

    jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
        console.error('Error verifying token:', err.message);
        return;
    }
    
    console.log(decoded);
    });
```
This will verify the token using the specified secret key. If the token is valid, the decoded payload will be printed to the console. If the token is invalid or has expired, an error message will be printed instead.


###### How token is created and verified and why
- token is created to improve further security over login user by using another method called __token__, With token we can give access to the user for limited time period after that the need to re-authenticate themself to use further.
- So first of all we created a token inside __login code inside auth.js__
- then inorder to do not repeat yourself principal we created a file called __veryToken.js__ to verify our tokens.
```js
    // inside verifyToken.js
    const jwt = require('jsonwebtoken')

    const verifyToken = (req, res, next) =>{
        const authHeader = req.headers.token;

        if(authHeader){
            jwt.verify(token, process.env.JWT_SEC, (err, user)=>{
                if(err) res.status(403).json('invalid token ')
                req.user = user;
                next();
            })
        }else{
            res.status(401).json('you are not authenticated')
        }
    }

    const verifyAndAuthorize = (req, res, next) =>{
        verifyToken(req, res, () =>{
            if(req.user.id === req.params.id || req.params.isAdmin){
                next();
            }else{
                res.status(403).json('you are not allow to do that.')
            }
        })
    }

    module.exports = {verifyToken, verifyAndAuthorize};
```

```js

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
```
- and then inside user.js
```js
    //update user
    const User = require('../models/User');
    const { verifyToken, verifyAndAuthorize } = require('./verifyToken');

    const router = require('express').Router();

    router.put('/:id', verifyAndAuthorize, async(req, res) =>{
    if(req.body.password){
            req.body.password= CryptoJS.AES.encrypt(req.body.password, process.env.SEC_PASS).toString()
        }

        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            res.status(200).json(updatedUser);

        }catch(err){
            res.status(500).json(err);
        }
    })

    module.exports = router;
```
###### Go to thunderClient
- see update a user **request** in the thunderClient > go to header try to change token and see what error you get basically.
    - if token is not provided then { you are not authenticated}
    - else if toke in wrong { invalid token }
    - if toke in correct then { user data can be updated and seen.}

#### USER ROUTE: 
- here we update user field based on id pass in params 
- basically it first verify a user by (jwt token) if it pass then go to if block 
- then it check whether password is also in the body to change if yes then first it should convert in hashed password and then we update user by findByIdAndUpdate method in mongodb.

##### DELTE A USER BY ID IN PARAMS:
- it is simple because it just verify a user based on id and delete using findByIdAndAdmin

```js
    // update user field
    router.put('/:id', verifyAndAuthorize, async(req, res) =>{
    if(req.body.password){
            req.body.password= CryptoJS.AES.encrypt(req.body.password, process.env.SEC_PASS).toString()
        }

        try{
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
            res.status(200).json(updatedUser);

        }catch(err){
            res.status(500).json(err);
        }
    });

    router.delete('/:id', verifyTokenAndAdmin, async(req, res) =>{
        try{
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json('user has been deleted');
        }catch(err){
            res.status(500).json(err);
        }
    });
```


##### GET A USER:
- then we define a find a user it is simple you can see the code 


##### GET ALL USERS:
- here we use __query__ if new equal true then it find latest user 
- Also here it verify the user is admin or not Only admin can get all users.
- if we go step by step code then
    - first it find all users > then it sor user by id (basically the last one will be first here ) > then it limit the user.

```js
    router.get('/', verifyTokenAndAdmin, async(req, res) =>{
        const query = req.query.new;
        try{

            const allUsers = query ? await User.find().sort({_id: -1}).limit(1) : await User.find();
            res.status(200).json(allUsers);
        }catch(err){
            res.status(500).json(err);

        }
    });
```

##### GET USER STATS BY MONTH (FROM LAST YEAR):
- api that fetch no of users register per month from last year.
- here we first define lastYear var  then using aggregate function we write a method to group _id as month that fetch and total as total no of user registered till now from the last year.
- Using this we are gone to create awesome admin stats where he/she can see the stats of total no of user register per year.
- go to thunderClient hit the url `http://localhost:8800/api/users/stats` by get method you will see the like this 
```js
    // OUTPUT
    [
        {
            "_id": 4,
            "total": 1
        },
        {
            "_id": 3,
            "total": 1
        }
    ]
```
```js
    // GET USER STATS
    router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
                month: { $month: "$createdAt"}, // it set month of createAt user to month var here. if you say year it will do so.
            },
        },
        {
            $group: {
                _id: "$month",
                total: {$sum: 1}
            }
        }
        ]);

        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
    });
```


#### PRODUCT ROUTE:
- first import necessory modules like verifyAndAdmin, express.Router, ...
- let's discuss different api endpoints


##### CREATE:
- it is simple just take all req from body and create new acc. to model Product.

```js
    const Product = require("../models/Product");
    const {
        verifyToken,
        verifyAndAuthorize,
        verifyTokenAndAdmin,
    } = require("./verifyToken");
 
    // CREATE
    router.post("/", verifyTokenAndAdmin, async (req, res) => {
        const newProduct = new Product(req.body);
        try {
            const saveProduct = await newProduct.save();
            res.status(200).json(saveProduct);
        } catch (err) {
            res.status(500).json(err);
        }
    });
```

##### UPDATE:
- Here also just take id from params and using findByIdAndUpdate update the req product.
```js
    // UPDATE
    router.put("/:id", verifyTokenAndAdmin, async (req, res) => {


        try {
            const updatedProduct = await Product.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedProduct);
        } catch (err) {
            res.status(500).json(err);
        }
    });
```
##### DELETE:
- it is also simple just take id and delete.

```js
    // DELETE

    router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.status(200).json("Product has been deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    });
```
##### GET A PRODUCT:
- simple get id from params and use findById to get the product.


```js
    // GET A PRODUCT
    router.get("/find/:id", async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        } catch (err) {
            res.status(500).json(err);
        }
    });
```
##### GET ALL PRODUCTS:
- This need to discuss:
    - here we use two query 
        1. new
        2. category (an array go to Product model to see.)
    - if new is true then find the latest product is created.
    - else if category == "woman", "man" or "tshirt" then find product based on that.
    - else find all products.
    

```js
    // GET ALL PRODUCTS
    router.get("/", async (req, res) => {
        const qNew = req.query.new;
        const qCat = req.query.category;
        try {
            let products;
            if (qNew) {
                products = await Product.find().sort({ _id: -1 }).limit(1);
            } else if(qCat){
                products = await Product.find({ 
                    // it will find qCat in categories
                    categories: {
                        $in: [qCat]
                        }
                })
            }else{
                products = await Product.find();
            }
            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    });

```

