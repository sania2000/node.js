const express = require('express');
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
        console.log(file)
        cb(null, id + path.extname(file.originalname))
    }
})

const upload = multer({storage:storage})

app.post("/upload", upload.single('image'), (req, res) => {
    if(req.file){        
        res.send("Your image has been uploaded under the name: " + req.file.filename);
        id = id + 1;
    }
    else {
        return 'error'
    }
})

app.get('/images/:id', function(req, res) {
    if(req){
    res.sendFile(__dirname + "/images/" + req.params.id)
    }
    else{
        return 'error'
    }   
});

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});