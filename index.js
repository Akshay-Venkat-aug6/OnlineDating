const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const sequelize = require('./db/psql.js');

const User = require('./router/apiroutes/userapiroutes');
const Uploadimage = require('./router/apiroutes/imageapiroutes');
const BlockApi = require('./router/apiroutes/blockapiroutes');
const LikeApi = require('./router/apiroutes/likeapiroutes');

const usernormal = require('./router/normalroutes/usernormalroutes');
const homenormal = require('./router/normalroutes/homenormalroutes');
const friendnormal = require('./router/normalroutes/firendnormalroutes');
const blocknormal = require('./router/normalroutes/blocknormalroutes');

const http = require('http');
const app = express();

const PORT = process.env.PORT || 5000;

let httpServer = http.createServer(app);

httpServer.listen(PORT, ()=>{
  console.log(`Server Running on ${PORT}`)
  // io.on("connection", (socket)=>{
  //   // socket.emit("welcome", "Hello and Welcome to the socket.io server")
  //   console.log("User: "+socket.id)
  //   // console.log(socket)
  //   socket.on("messageSent", (message)=>{
  //     console.log(message)
  //     socket.broadcast.emit("messageSent",message)
  //   })
  // })
})

var io = require('socket.io')(httpServer)

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'))
hbs.registerPartials(path.join(__dirname, "views", "header"));

app.use(User);
app.use(Uploadimage);
app.use(BlockApi);
app.use(LikeApi);

app.use(usernormal);
app.use(homenormal);
app.use(friendnormal);
app.use(blocknormal);

sequelize.sync()

const authorization = require('./middlewares/Authorization');

app.get('/like',  authorization ,(req, res)=>{
  console.log(req.cookies.authorization)
  res.render('like')
})

app.get('/header', (req, res)=>{
  res.render('header')
})

