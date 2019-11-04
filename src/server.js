var express = require('express');
var app = express();

app.get('*', function (req, res) {
  
    console.log(req.query.command)
    res.send({
        "result": "success", 
        "state": `${req.query.command} command received`
        });
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});