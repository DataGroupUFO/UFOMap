const express = require('express');
const app = express();
var cors = require('cors');
var path = require('path');
var mysql = require('mysql');

app.use(cors());


var connection = mysql.createConnection({
  host: '127.0.0.1',
  database: 'ufomaps',
  user: 'root',
  password: 'pokemon12'
});
connection.connect();
app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/index.html')))
app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "style.css");
  });
app.get('/bundle.js', function(req, res) {
    res.sendFile(__dirname + "/" + "bundle.js");
  });
/*
  Search Methods
*/

//Search using both address and radius
app.get('/addSearch',function(req,res){
  res.setHeader('Content-Type','application/json');
  var lat;
  var long;
  
  //Get lat long from string
  
  //Get all records in range from database
  connection.query('SELECT * FROM sightings',(err,results,fields)=>{
    if(err)
      return res.status(400).send({error:'Database error',message:err});
    res.status(200).send(results);
  })
  //return list of records in range
  
})


app.get('/latLongSearch',function(req,res){
  //Get all records in range from database

  //return list of records in range

});
app.listen(3000, () => console.log('Example app listening on port 3000!'))