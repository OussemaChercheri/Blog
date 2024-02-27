const express = require ('express');
const articleApi = require('./routes/article');
require('./config/connect');

const app = express();

app.use('/article', articleApi);

app.use('/getimage', express.static('./uploads'));

app.listen(3001, () => {
    console.log('Server work');
});