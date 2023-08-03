const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        connectionString:'postgresql://postgres:iu0Px6Iq9Zy2HrndqWGs@containers-us-west-102.railway.app:6603/railway',
        host: 'containers-us-west-102.railway.app',
        ssl: { rejectUnauthorized: false },
        port: 6603,
        user: 'postgres',
        password: 'iu0Px6Iq9Zy2HrndqWGs',
        database: 'railway'
    }
});

const app = express();

// MiddleWare
app.use(express.json());

app.use(cors());


// Home Route
app.get('/', (req, res) => {

    res.send('Success !!!');
})


// SignIn Route
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })


// Register Route
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })


// Profile ID
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })


// Image-Rank
app.put('/image', (req, res) => { image.handleImage(req, res, db) })




// Port 
app.listen(process.env.PORT || 3003, () => {

    console.log(`app is running on port ${process.env.PORT}...`);
})