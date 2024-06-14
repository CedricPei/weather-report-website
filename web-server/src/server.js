const express = require('express')
const app = express ()
const geocode = require('./utils/geocode')
const statusCheck = require('./utils/statusCheck')


// write/explore unit testing;
// explore typescript (what can you make as "typed")
// explore docker & how to containerise this web-server;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('',(req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longtitude} = {}) => {
        if (error) {
            return res.send({ error })
        }
        statusCheck(latitude, longtitude, (error, weatherData) => {
            if (error) {
                return res.send({ error })
            }
            res.json(weatherData)       
        })
    })
})

app.listen(3001, () => {
    console.log("Server's up on port 3001")
})
  