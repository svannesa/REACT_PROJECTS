const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid"); //randomize the name of the images 
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`; //randomize the names of the images
    cb(null, uniqueFilename);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});

app.set("view engine", "ejs");

app.get("/upload", (req, res) => {
  res.render("upload");
});


// Check the extensions of the file

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png|gif|svg/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

app.post("/upload", upload.single("image"), (req, res) => {
  if (req.file) {
    res.send("Single file uploaded successfully");
  } else {
    res.status(400).send("Please upload a valid image");
  }
});

app.listen(3001);
console.log("3001 is the port");
