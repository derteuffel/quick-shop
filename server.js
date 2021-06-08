//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/my-adminlte3-demo-app'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/my-adminlte3-demo-app/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(8282);

console.log("Listen 8282 ...");