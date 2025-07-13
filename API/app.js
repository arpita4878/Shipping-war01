import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';

const app=express()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//to link router
import UserRouter from './routes/user.router.js'
import CategoryRouter from './routes/category.router.js'
import SubCategoryRouter  from './routes/subcategory.router.js'
import ProductRouter  from './routes/product.router.js'
import BidRouter from './routes/bidding.router.js'


//configuration to fetch req body content : body parser middleware
//used to fetch req data from methods like : POST , PUT , PATCH , DELETE
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//configuration to fetch file from req
app.use(fileUpload());

//configuration to solve cross-origin problem
app.use(cors({
  origin: 'https://shipping-war01.vercel.app',
  Credential:true,
  methods:["GET","POST","PUT","DELETE","PATCH"],
  allowedHeaders:["content-type","Authorization"]
}));


//router level middleware to link routers
app.use("/user",UserRouter);
app.use("/category",CategoryRouter);
app.use("/subcategory",SubCategoryRouter);
app.use("/product",ProductRouter);
app.use("/bid",BidRouter)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server invoked at port ${PORT}`);
});
