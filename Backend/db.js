// DB Module
var mysql = require("mysql")
exports.connect = function(conDetails, callback){

	var connection = mysql.createConnection({
		host: conDetails.host,
		user: conDetails.user,
		password: conDetails.password,
		database: conDetails.database
	});

	connection.connect(function(err){
		if(err) callback(err);
		callback(null,connection);
	});
};

exports.disconnect = function(connection,callback){
	connection.disconnect();
};

exports.createTable = function(conDetails, callback){
	var connection = mysql.createConnection({
		host: conDetails.host,
		user: conDetails.user,
		password: conDetails.password,
		database: conDetails.database
	});

	var sql = "CREATE TABLE Users (username VARCHAR(255), password VARCHAR(255))";
	connection.query(sql,function(err, result){
		console.log("Query finished:" + result);
		callback(err, result);
	});
};
