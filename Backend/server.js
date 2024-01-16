const express = require('express')
const app = express()
const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/ChatApp');

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open',() => console.log('Connected to db'))

const schema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  age: {
    type: Number,
    required:true
  }
})

const Chats = mongoose.model('chats', schema)

app.use(express.json())



app.get('/', async (req, res) => {
  try {
    const chats = await Chats.find()
    res.json(chats)
  } catch {
    res.status(500).json({message : err.message})
  }
})

// app.post('/insert', async (req, res) => {
//   try {
//     await Chats.insertOne({"name": "nachiket", "age" : 25})
//   } catch {
//     res.status(500)
//   }
// })
app.listen(3000, () => {
  console.log('Server Started')
})