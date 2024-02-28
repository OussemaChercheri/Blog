const express = require('express');
const router = express.Router();

const Article = require('../models/article');

const multer = require('multer');

let filename = '';

const mystorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, redirect) => {
        let date = Date.now();
        let fl = date + '-' + file.mimetype.split('/')[1];
        redirect(null, fl);
        filename = fl;
        
    }
});

const upload = multer({ storage: mystorage });

router.post('/ajout', upload.single('image'), (req, res) => {
    let data = req.body;
    let article = new Article(data);
    article.date = new Date();
    article.image = filename; // Assign filename from multer storage
    article.tags = data.tags.split(',');

    article.save()
        .then(saved => {
            filename = ''; // Reset filename after saving
            res.status(200).send(saved);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.get('/all', (req, res) => {
    Article.find({})
        .then(articles => {
            res.status(200).send(articles);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.get('/getbyid/:id', (req, res) => {
    let id = req.params.id;
    Article.findOne({_id: id})
        .then(articles => {
            res.status(200).send(articles);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.get('/getbyidauthor/:id', (req, res) => {

    let id = req.params.id;

    Article.find({ idAuthor: id })
        .then(articles => {
            res.status(200).send(articles);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.put('/update/:id', upload.single('image'), (req, res) => {
    let id = req.params.id;
    let data = req.body;
    data.tags = data.tags.split(',');
    
    // Check if a new image is uploaded
    if (req.file) {
        data.image = req.file.filename;
    }
    
    Article.findByIdAndUpdate(id, data, { new: true })
        .then(article => {
            res.status(200).send(article);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});




router.delete('/delete/:id', (req, res) => {
    let id = req.params.id;

    Article.findByIdAndDelete({_id: id})
        .then(article => {
            res.status(200).send(article);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

module.exports = router;
