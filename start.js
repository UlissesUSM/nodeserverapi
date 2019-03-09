require('babel-register')({
    presets: ['node8']
})

module.exports = require('./server.js');