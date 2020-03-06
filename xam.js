

// Here we import the modules we need to use in this file.
// It's important to understand that importing modules just
// makes them available for use, but it doesn't actually mean
// that they *are* being use here -- we still need to call them
// somewhere in our code.
const express = require('express');
const mongoIO = require('./io.js');
const bodyParser = require('body-parser');
var ObjectId = require('mongodb').ObjectID;

// Here we *call* the express module, which is one of the first things
// we need to do to start our express app.
const app = express();
const port = process.env.PORT || 3000;

// Here we configure express to serve static files. Notice again, that
// we have to *call* express.static, and that the call to express.static
// is inside app.use -- these are nested calls.
// https://expressjs.com/en/starter/static-files.html
var staticPath = 'static'
app.use(express.static(staticPath));

// Here we configure express to allow us to access the
// body of requests, by adding in bodyParser. Once agin, we make calls to
// bodyParser, and nest those calls inside app.use
app.use(bodyParser.urlencoded({ extended: false }));  // <-- make request body data available
app.use(bodyParser.json())


// This route just redirects a request to the site's root
// to the static cassettes.html file.
app.get('/', function(req, res) {
    res.redirect('/landing.html');
})

////////////////////////////////////////////////////////////////////

//FOR UPLOAD

// This is the controller that responds to a GET request
function GetUploadAPI(req, res, next) {

	// This is the callback we pass to mongoIO.readItem
	// When the Mongo read operation finishes, it will
	// run our callback, which is:
	// send the data from Mongo back to the browser as
	// JSON, OR handle any errors that come up.
	function sendDataCallback(err, data) {
        if (data) {
            res.json(data)
        } else {
            console.log('ouch');
            console.log(err);
            next(err);
        }
	}
	// Here we make the call to readItem and pass in the
	// callback
	mongoIO.readItem(sendDataCallback);
}
// This is the route for a GET request
app.get('/api/upload', GetUploadAPI)

// This is the controller that responds to a POST request
function PostUploadAPI(req, res, next) {
	console.log(req.body);
	try{
    mongoIO.writeItem({'Name': req.body.Name,'Height': req.body.Height,'Weight': req.body.Weight,'url': req.body.url})
	} catch (err) {
		next(err);
	}

	res.redirect('/page2.html');
}
// This is the route for a POST request
app.post('/api/upload', PostUploadAPI)


// This is the controller that responds to a DELETE request
function DeleteUploadAPI(req, res, next) {
	// NEW
	try {
		mongoIO.deleteItem({'Name': req.body.Name});
		res.send({Name: req.body.Name});
	} catch (err) {
		next(err);
	}

}
// This is the route for a DELETE request
app.delete('/api/upload', DeleteUploadAPI)

// Update request

function UpdateAPI(req, res, next) {
	console.log(req.body);
	try{
    mongoIO.updateItem({_id: ObjectId(req.body.updateid)},
                        {$set:{ 'Name': req.body.Name,
                                'Height': req.body.Height,
                                'Weight': req.body.Weight,
                                'url': req.body.url}})
	} catch (err) {
    console.log(err);
		next(err);
	}

	res.redirect('/page3.html');
}
// This is the route for a UPDATE request
app.post('/api/update', UpdateAPI)

////////////////////////////////////////////////////////////////////


// Here we set express up to listen for requests and serve responses.
// By doing this, we make sure that when we run `$ node cassette-serve` in the
// command prompt, that command doesn't just run and exit, but rather the
// server runs until we stop it. To be more specific, it enters an event loop,
// where events come in, and it is able to respond to them.
app.listen(port, function() {console.log(`Example app listening on port ${port}!`)})
