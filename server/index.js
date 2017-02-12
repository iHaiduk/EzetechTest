const port = process.env.PORT || 3000
const dayLength = process.env.DAY_LENGTH || 300000
const eventTimeout = process.env.EVENTS_TIMEOUT || 500

const express = require('express')
const app = express()
const publicPath = require('path').resolve(__dirname, '..', 'public')
app.use(express.static(publicPath))
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const Market = require('./market')
let market = new Market()

app.get('/market-history', (req, res) => {
  res.json(market.history)
})

server.listen(port, function () {
  console.log('Server listening at port %d', port)
})

io.on('connection', (socket) => {
  console.log('Connected')
})

setInterval(() => {
  const changes = market.generateMarketEvents()
  io.emit('market events', {changes})
}, eventTimeout)

setInterval(() => {
  market.startNewDay()
  io.emit('start new day')
}, dayLength)
