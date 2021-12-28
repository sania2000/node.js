const { response } = require('express');
const express = require('express');
const { stat } = require('fs/promises');
const multer = require('multer');
const app = express();
const PORT = 2500;
const path = require('path')

let id = 100;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, id + path.extname(file.originalname))
    }
})

const upload = multer({storage:storage,
    fileFilter(req, file, cb) {
        if(path.extname(file.originalname) == ".png"){
            cb(null, true)
        }
        else{
            cb(null, false)
        }
    }

})

app.post("/upload", upload.single('image'), (req, res) => {
    try{        
        res.send("Your image has been uploaded under the name: " + req.file.filename);
        id = id + 1;
    }catch (err) {
        res.status(406).json("You need to select a 'png' file!");
    }
})

app.get('/images/:id', function(req, res) {
    try{
        res.sendFile(__dirname + "/images/" + req.params.id + ".png")
    }catch {
        res.status(404).json("Image does not exist!");
    }   
});

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});