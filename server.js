const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app)
const { Server } = require('socket.io');
const io = new Server(server);
const path = require('path');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/socket', express.static(path.join(__dirname, 'node_modules', 'socket.io', 'client-dist')))

app.set('view engine', 'ejs');

server.listen(3000, () => console.log('Server ready at port http://localhost:3000'));

app.get('/', async (req, res) => {
    res.render('index')
})

io.on('connection', (socket) => {
    console.log("✅ user connected");

    // socket.on('message', (message) => {
    //     setTimeout(() => {
    //         socket.emit('message', "salom dunyo 2")
    //     }, 3000);
    // })

    socket.on('disconnect', () => {
        console.log("❌ user disconnected")
    })
})