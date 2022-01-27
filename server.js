require('rootpath')();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');


// Note: The below statements require the use of "Enable Access-Control-Allow-Credentials" in Cors on Azure
// This will set the "Access-Control-Allow-Credentials" response header to true and give access to the specified 
// clients like httpS:users.sequelize-persteenolsen.com ....
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// allow cors requests from any origin and with credentials
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

// api routes
app.use('/accounts', require('./accounts/accounts.controller'));

// swagger docs route
app.use('/api-docs', require('_helpers/swagger'));


// Get a wakeup ping from the Client and response with a pong => "hello" in the "message" property !
app.get('/hello', function (req, res) {
   	
	 res.status(200).send( { message: 'hello from the server...'} );
	 console.log('NODE SERVER => Responding with a pong ...');
	 
 });


// global error handler
app.use(errorHandler);

// start server
// Note: The port 8080 is also working on Azure with HTTPS enabled on Azure
var port = process.env.PORT || 443;
app.listen(port, function(){
	console.log('Server running at port 443')
})
// const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
//app.listen(port, () => console.log('Server listening on port ' + port));
