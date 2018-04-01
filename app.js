const express = require('express');
const app = express();
var cors = require('cors');
var path = require('path');
var mysql = require('mysql');

app.use(cors());


var connection = mysql.createConnection({
  host: 'ufodataset.coctmoebpgxn.us-east-1.rds.amazonaws.com',
  database: 'ufomaps',
  user: 'ufogroup',
  password: 'ufogroup'
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

//Search for points near an address
app.get('/addSearch',function(req,res){
  res.setHeader('Content-Type','application/json');
  var lat = req.query.lat;
  var long = req.query.long;
  console.log(lat);
  console.log(long);
  
  //Get lat long from string
  
  //Get all records in range from database
  var euc = 'SQRT(POW('+lat+'-lat,2) + POW('+long+'-`long`,2))'
  connection.query('SELECT * FROM data WHERE '+euc+' < 3 order by '+ euc ,(err,results,fields)=>{
    if(err)
      return res.status(400).send({error:'Database error',message:err});
    res.status(200).send(results);
  })
  //return list of records in range
  
})
//Testing serach
app.get('/testSearch',function(req,res){
  res.setHeader('Content-Type','application/json');
  var lat = 38.897676;
  var long = -77.036530;
  
  
  //Get lat long from string
  
  //Get all records in range from database
  var euc = 'SQRT(POW('+lat+'-lat,2) + POW('+long+'-`long`,2))'
  connection.query('SELECT * FROM data WHERE '+euc+' < 3 order by '+ euc ,(err,results,fields)=>{
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