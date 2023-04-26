const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
dotenv.config()
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

const conn = mongoose.connect(process.env.MONGO_URI)
    .then(console.log(`MongoDB Connected`))
    .catch(e => console.log(`Error`));

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

const userRoute = require('./routes/user');
const e = require('express');
app.use('/api/user', userRoute)

app.get('/', (req, res) => {
    console.log('/');
})

app.listen(process.env.PORT || 5000)