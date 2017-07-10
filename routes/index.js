var express = require('express');
var router = express.Router();
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var fs = require('fs');

var config = JSON.parse(fs.readFileSync('./.tedious/connection.json', 'utf8'));

/* GET home page. */
router.get('/', function(req, res, next) {
  var resultSet = [];
  var colHeaders = [];
  var connection = new Connection(config);

  function executeStatement() {
   console.log('In executeStatement');
    request = new Request("SELECT TOP(1000) [LoginId], [Username] FROM Rascal.dbo.Login;", function(err, rowCount) {
      if (err) {
        console.log(err);
      } else {
        console.log(rowCount + ' rows');
      }
      connection.close();
    });

    request.on('row', function(columns) {
      row = {};
      columns.forEach(function(column){
        console.log(column.metadata.colName);
        console.log(column.value);
        row[column.metadata.colName] = column.value;
      });
      console.log('Row is: ' + JSON.stringify(row));
      resultSet.push(row);
    });

    connection.execSql(request);
  }

  connection.on('connect', function(err) {
      // If no error, then good to go...
        executeStatement();
      }
    );
  
  
  connection.on('end', function(err){
    console.log(JSON.stringify(resultSet));
    res.render('index', {title: 'Testing SQL Server and Node JS', results: resultSet});
  });
});

module.exports = router;
