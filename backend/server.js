const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors');
const formData = require('express-form-data');

app.use(cors());

app.use(cors({ origin: ['http://localhost:4200'] }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({
  extended: true,
  limit: '50mb',
}));
app.use(formData.parse());

const server = http.createServer(app);// обвернули для сокетов
const io = socketIO(server);
const port = process.env.PORT || 9000;

app.use('/api', require('./routes/user'));

require('./sockets/socket.js')(io);

async function start() {
  try {
    const url = 'mongodb://localhost:27017/game';
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
      console.log('Database is worked');
    } catch (e) {
      console.log('Database disconnect');
      process.exit(1);
    }

    server.listen(port, () => {
      console.log(`server started ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
