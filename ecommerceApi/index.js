const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const cors = require('cors')

// allow all cross browser to get data.
app.use(cors());
// dotenv is configured
dotenv.config()


// db connection is established
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('db connected successfully'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));


//   middleware
app.use(express.json())  // to listen or use json data like we pass data in body inside  postman in json format
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/orders', orderRoute);



// server is listen
app.listen(process.env.PORT || 8800, () => {
  console.log(`backend server is running at: ${8800}`)
});
