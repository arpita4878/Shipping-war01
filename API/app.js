import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const app = express();

// Routers
import UserRouter from './routes/user.router.js';
import CategoryRouter from './routes/category.router.js';
import SubCategoryRouter from './routes/subcategory.router.js';
import ProductRouter from './routes/product.router.js';
import BidRouter from './routes/bidding.router.js';

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors({
  origin: 'https://shipping-war01.vercel.app', // your frontend URL
}));

// Routes
app.use('/user', UserRouter);
app.use('/category', CategoryRouter);
app.use('/subcategory', SubCategoryRouter);
app.use('/product', ProductRouter);
app.use('/bid', BidRouter);

const PORT = process.env.PORT || 3001;
const MONGO_URI = process.env.MONGO_URI;

// Connect to MongoDB and then start the server
mongoose.connect(MONGO_URI, {
  // options no longer required in newer Mongoose versions but okay to keep
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Successfully connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
