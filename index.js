var express = require('express');
app = express()
bodyParser = require('body-parser');
path = require('path')
expressValidator = require('express-validator');
app.use(expressValidator());




app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/images', express.static('./backend/images'));







const apiRoutes = require('./backend/route/user');
const connectDB = require('./backend/config/database');



//database connection

connectDB();




app.use('/api', apiRoutes)
// app.use('/', (req, res) => {
//     res.send('Welcom sarvika')
// })





const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('Starting Port', PORT);
})