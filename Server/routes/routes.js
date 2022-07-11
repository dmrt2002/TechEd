const express = require("express");
const router = express.Router();
const API = require("../controllers/api");
const multer = require('multer');
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json()
const path = require('path');

//middleware
let storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join(__dirname, '../images'));
    },
    filename: function(req, file, cb) {
        cb(null,  file.originalname);
    },
})

let uploads = multer({
    storage:storage,
}).single("image");

router.get("/" , API.fetchAllPost);
router.get("/:id" ,jsonParser, API.fetchPostbyId);
router.get("/category/:category" , jsonParser, API.fetchPostbyCategory);
router.post("/" , uploads ,jsonParser, API.createPost);
router.patch("/:id" ,uploads, API.updatePost);
router.delete("/:id" , API.deletePost);
router.post("/adminlogin", jsonParser, API.adminLogin)

module.exports = router; 