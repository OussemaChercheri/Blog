const express = require('express');
const router = express.Router();

const Article = require('../models/article');

const multer = require('multer');

let filename = ''; // Ensure filename is scoped to this module

const mystorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, redirect) => {
        let date = Date.now();
        let fl = date + '-' + file.mimetype.split('/')[1];
        filename = fl; // Assign filename here
        redirect(null, fl);
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
    // Handle getting all articles
});

router.get('/getbyid/:id', (req, res) => {
    // Handle getting article by ID
});

router.get('/getbyidauthor/:id', (req, res) => {
    // Handle getting articles by author ID
});

router.delete('/supprimer/:id', (req, res) => {
    // Handle deleting article by ID
});

router.put('/update/:id', (req, res) => {
    // Handle updating article by ID
});

module.exports = router;
