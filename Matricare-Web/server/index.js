const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');

//mongodb://localhost:27017

const app = express();

//database
mongoose.connect("mongodb://localhost:27017")
.then(() => console.log('Database is Connected'))
.catch((err) => console.log('Database is not Connected', err))

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/', require('./routes/authRoutes'))

const port = 8000;
app.listen(port, ()=> console.log(`Server is running in port ${port}`));