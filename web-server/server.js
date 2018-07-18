let express = require('express');
let path = require('path');
//let logger = require('morgan');
let bodyParser = require('body-parser');

let app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://ben:password@ds247699.mlab.com:47699/qureative-dev');
mongoose.connection
    .once('open', () => console.log('MongoDB good to go!'))
    .on('error', (error) => {
        console.warn('Warning', error);
    });

//app.use(logger('dev'));
app.use(bodyParser.json());

//set web app root to current directory
app.use("/", express.static(__dirname));

/*app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    // Set custom headers for CORS
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Access-Token,X-Key");
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8601");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you
// are sure that authentication is not needed
app.all('/api/v1/*', [require('./middlewares/validateRequest')]);

app.use('/', require('./routes'));

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Start the server
app.set('port', process.env.PORT || 5000);

let server = app.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + server.address().port);
});

