
const jwt =require ('jsonwebtoken')
const multer=require("multer");
const express=require ('express')
const app=express()
const dotenv=require('dotenv')
const connectDB=require('./config/connectDB')
const cookieParser = require('cookie-parser');
const cors=require ('cors')
const path=require('path')
const cloudinary = require("cloudinary").v2;
const Multer = require("multer");
app.use(express.json())


dotenv.config({path:"./config/.env"})
const port=process.env.PORT ||5000
connectDB()
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors())


app.use('/api/',require('./routes/User'))
app.use('/api/',require('./routes/ProductRouter'))
app.use("/api/",require('./routes/auth'));
app.use("/api/",require('./routes/orderRouter'));







//cloudinary 

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
  async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
  }

  const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});




app.post("/api/upload", upload.single("my_file"), async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await handleUpload(dataURI);
    res.json(cldRes);
  } catch (error) {
    console.log(error);
    res.send({
      message: error.message,
    });
  }
});

app.listen(port,(err)=>{
    err ? console.log(err):console.log("server is running in port ",port)
})