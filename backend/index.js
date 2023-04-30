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
app.use('/api/user', userRoute)
const chatRoute = require('./routes/chat');
app.use('/api/chat', chatRoute)
const message = require('./routes/message');
app.use('/api/message', message)

app.get('/', (req, res) => {
    console.log('/');
})

const server = app.listen(process.env.PORT || 5000)
const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000'
    }
})

io.on('connection', (socket) => {
    console.log("connected to socket.io");
    socket.on('setup', (userData) => {
        socket.join(userData._id)
        socket.emit('connected')
    })

    socket.on('join chat', (room) => {
        socket.join(room)
    })

    socket.on('typing', (room) => socket.in(room).emit('typing'))
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'))

    socket.on('new message', (newMessageRecieved) => {
        let chat = newMessageRecieved.chat

        if (!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user) => {
            if (user._id == newMessageRecieved.sender._id) return;
            socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
    })

    socket.off('setup', () => {
        console.log('USER disconnected');
        socket.leave(userData._id)
    })
})