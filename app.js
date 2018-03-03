const express = require('express');
const app = express();
var path = require('path');
app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/index.html')))
app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "style.css");
  });
app.listen(3000, () => console.log('Example app listening on port 3000!'))