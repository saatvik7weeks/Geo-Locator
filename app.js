const express=require('express')
const app = express()
const socketio = require("socket.io")
const http = require('http')
const path = require('path')

const server = http.createServer(app)
const io=socketio(server)
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
io.on('connection',(socket)=>{
    socket.on("send-location",(data)=>{
    io.emit("recieve-location",{ id: socket.id,...data})
    })
    socket.on('disconnect',()=>{
        io.emit("user-disconnected",socket.id)
    })
})




app.get('/', function(req, res) {
res.render('index.ejs')
})

server.listen(3000,()=>{
    console.log("listening on port 3000")
})