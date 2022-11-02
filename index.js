const express = require('express');
const app = express();
var typeorm = require("typeorm");
const exphbs = require('express-handlebars');
const user = require('./entity/user');
const hbs = exphbs.create({ defaultLayout: 'main' });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

var myDataSource = new typeorm.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "db4",
    synchronize: true,
    entities: [require("./entity/user")],
})
myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });


app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/index.html')
})

io.on("connection", (socket) => {
    console.log('user connected')
    socket.on("on-chat", data => {
        console.log({
            data
        })
        let chatData = {
            usr: data.name,
            content: data.message
        }
        const x = myDataSource.getRepository(user).save(chatData);
        io.emit('user-chat', data);
    })
})

app.get('/chatcontent', async function (req, res) {
    const data = await myDataSource.getRepository(user).find();
    // console.log(data)
    res.render('home', { data });
})

server.listen(3000, function () {
    console.log('server da chay')
});