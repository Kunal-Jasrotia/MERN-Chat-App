const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser');
dotenv.config()
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.get('/', (req, res) => {
    console.log('/');
})

app.listen(process.env.PORT || 5000)