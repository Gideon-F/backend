const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('this is working');
})
app.listen(3000, () => {
    console.log('app is running well')
})

const signin = require('./Controllor/Signin');
const register = require('./Controllor/Register');
const adminRegistration = require('./Controllor/AdminRegistration');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres',
        database: 'healthhub2'
    }
})

app.use(express.json());

//signin and register
app.post('/signin', (req, res) => { signin.signin(req, res, db, bcrypt) });
app.post('/register', (req, res) => { register.register(req, res, db, bcrypt) });
app.get('/adminRegistration', (req, res) => { adminRegistration.adminRegistration(req, res, db) });
//admin registration
//app.put('/adminRegistration', (req, res) => { adminRegistration.adminRegistration(req, res, db)});