require('module-alias/register')
const express = require('express');
const dotenv = require('dotenv');

const user = require('@controller/user/index');

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

var bodyParser = require('body-parser')
app.use(bodyParser.json());

//use sessions for tracking logins
var session = require('express-session')
app.use(session({
    secret: 'work hard',
    resave: true,
    saveUninitialized: false
  }));

app.use('/user', user);


app.listen(process.env.PORT, process.env.HOST, () => console.log(`Hello world app listening on port ${process.env.PORT}!`))
