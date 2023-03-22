require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 9000;
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const userRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRoutes");
const auth = require("./middleware/auth");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("express-fileupload");
const cors = require("cors");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_APIKEY,
  api_secret: process.env.CLOUD_APISECRET,
});

//MIDDLEWARE
app.use(fileUpload({ useTempFiles: true }));
app.use(express.json());
app.use(cors());

app.use("/api/v1", userRouter);
app.use("/api/v1/post", auth, postRouter);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.POST);
    app.listen(PORT, () => {
      console.log(`server running on ${PORT}.......`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
