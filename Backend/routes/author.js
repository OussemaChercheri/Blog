const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Author = require('../models/author');

const multer = require('multer');

let filename = '';

const mystorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, redirect) => {
        let date = Date.now();
        let fl = date + '-' + file.originalname;
        redirect(null, fl);
        filename = fl;
    }
});
const upload = multer({ storage: mystorage });

router.post('/register', upload.single('image'), (req, res) => {

    data = req.body;
    author = new Author(data);

    author.image = filename;

    let salt = bcrypt.genSaltSync(10);
    author.password = bcrypt.hashSync(data.password, salt);

    author.save()
        .then(saved => {
            filename = '';
            res.status(200).send(saved);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.post('/login', (req, res) => {
    let data = req.body;

    Author.findOne({ email: data.email })
        .then(author => {
            if (!author) {
                return res.status(400).send('Email not found');
            }
            let valid = bcrypt.compareSync(data.password, author.password);
            if (!valid) {
                return res.status(400).send('Email or password invalid');
            } else {
                let payload = {
                    _id: author._id,
                    email: author.email,
                    name: author.name,
                    lastname: author.lastname
                };
                let token = jwt.sign(payload, "123456789");
                res.status(200).send({ mytoken: token, message: "Connected successfully" });
            }
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.get('/all', (req, res) => {
    Author.find()
        .then(authors => {
            res.status(200).send(authors);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.get('/getbyid/:id', (req, res) => {
    let authorId = req.params.id;
    Author.findById(authorId)
        .then(author => {
            if (!author) {
                return res.status(404).send('Author not found');
            }
            res.status(200).send(author);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.delete('/delete/:id', (req, res) => {
    let authorId = req.params.id;
    Author.findByIdAndDelete(authorId)
        .then(deletedAuthor => {
            if (!deletedAuthor) {
                return res.status(404).send('Author not found');
            }
            res.status(200).send('Author deleted successfully');
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

router.put('/update/:id', (req, res) => {
    let authorId = req.params.id;
    let newData = req.body;
    Author.findByIdAndUpdate(authorId, newData, { new: true })
        .then(updatedAuthor => {
            if (!updatedAuthor) {
                return res.status(404).send('Author not found');
            }
            res.status(200).send(updatedAuthor);
        })
        .catch(err => {
            res.status(500).send(err);
        });
});

module.exports = router;
