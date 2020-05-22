const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const app = express();
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1', //localhost
    user : 'postgres',
    password : 'muse2015',
    database : 'smartbrain'
  }
});

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => { res.send(database.users) })

app.post('/signin', signin.handleSignIn(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))

app.get('/profile/:id', profile.handleProfileGet(db))

app.put('/image', image.handleImage(db))

app.post('/imageUrl', image.handleApiCall)

app.listen(3001, () => {
  console.log('Running on localhost:3001')
});
