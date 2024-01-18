const express = require('express')
const app = express()
const mongoose = require('mongoose');
const cors = require("cors");
const { BSON } = require('mongodb');

// const corsOptions = {
//   origin: "http://localhost:5173",
// };

// app.use(cors(corsOptions));

app.use(cors())
mongoose.connect('mongodb://0.0.0.0:27017/ChatApp');

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to db'))

const schema = new mongoose.Schema({
  time: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  msg: {
    type: String,
    required: true
  }
})

// , { versionKey: false }


app.use(express.json())



app.get('/:id', async (req, res) => {

  const Chats = mongoose.model(req.params.id, schema)
  try {
    const chats = await Chats.find()
    res.json(chats)
  } catch {
    res.status(500).json({ message: err.message })
  }
})

app.post('/insert/msg/:id', async (req, res) => {
  //console.log(req.body)
  const Chats = mongoose.model(req.params.id, schema)
  const data = new Chats({
  "time": req.body.time,
  "userName": req.body.userName,
  "msg": req.body.msg,})
  try {
    const val = await data.save();
    res.json(val)
  } catch(error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})
app.listen(3000, () => {
  console.log('Server Started')
})