const express = require('express');

const port = 3000;

const host = '0.0.0.0'

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.listen(port, host, () => console.log(`Hello world app listening on port ${port}!`))
