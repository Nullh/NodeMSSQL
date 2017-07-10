# NodeMSSQL
Simple test of Node.js pulling data from an MSSQL server

This uses express with jade and tedious to rende rthe contents of a table stored in a Microsoft SQL Server. 
To get this running you'll need to create the file .tedious/connection.json with the format as below:

{
  "userName": "test",
  "password": "test",
  "server": "testdb"
}
