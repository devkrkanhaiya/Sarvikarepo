if (process.env.NODE_EV == 'production') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev')
}
