const fs = require('fs')
const path = require('path')
const express = require('express')

const app = express()
const server = require('http').createServer(app)

app.use('hoge', express.static(path.resolve(__dirname, 'hoge')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/aas', (req, res) => {
  res.send(sendJsFile)
})

server.listen(3000, () => {
  console.log('run server')
})