const express=require("express")
const app=express();
const cors=require('cors')
const bodyParser=require('body-parser')


require('dotenv').config();

const PORT= process.env.PORT || 4000
app.use(express.json());
app.use(cors())

app.use(bodyParser.json())

require('./config/database').connect();

const userRoutes=require("./routes/user")
const productRoutes=require("./routes/product")

app.use("/api/v1/auth",userRoutes)
app.use("/api/v1/product",productRoutes);

app.listen(PORT, ()=>{
    console.log("server is running at", PORT)
})