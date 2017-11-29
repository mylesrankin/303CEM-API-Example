// Imports
var restify = require('restify');
var fs = require('fs');
var mysql = require("mysql")
var db = require("./db")

const server = restify.createServer()
server.use(restify.plugins.fullResponse())
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.queryParser())
server.use(restify.plugins.authorizationParser())

// Add headers
server.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,auth-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// DB Details
const dbData = {
	host: "37.122.214.88",
	user: "myles-xwef-u-147573",
	password: "6Y4me-9m7",
	database: "myles-xwef-u-147573"
}



// Serve default page
server.get('/', (req,res) => {
	var body = '<html><body>ALIVE</body></html>';
	res.writeHead(200, {
		'Content-Length': Buffer.byteLength(body),
  		'Content-Type': 'text/html'
  	});
  	res.write(body);
	res.end

});

server.get('api/v1/users', (req,res) => {
	getHolidays(dbData, function(result){
		res.send(result);
		res.status(201);
	});
});

function getHolidays(conDetails, callback){
	db.connect(conDetails, function(err, data){
		var sql = 'SELECT * FROM Users';
		console.log('Grabbing database contents');
		data.query(sql, function(err,data){
			if (err) throw err;
			callback(data)
		}); 
	});
}

var PORT = process.env.PORT || 4000;

server.listen(PORT,err =>{
	if(err){
		console.error(err)
	}else{
		console.log("App is ready on port: " + PORT)
	}
})