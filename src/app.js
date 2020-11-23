const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');

const router = require('./routes');

const app = express();

const PORT = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

try {
  mongoose.connect(process.env.MONGO_DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('MONGO DB Connected!');
} catch (error) {
  console.log(error);
}

app.use(cors());
app.use(express.json());
app.use(router);

const server = app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

const io = socketio(server);
