const http = require('http');
const fs = require('fs');

http.createServer(function (req, res) {
    

    if(req.url == "/todo"){
        fs.readFile('todo.json', function (err, data){
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.write(data, function(err){
                res.end(); 
            });
        });
    }else if(req.url == "/index"){
        fs.readFile('index.html', function(err, data){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data, function(err){
                res.end();
            });
        });
    }else if(req.url == "/read-todo"){
        fs.readFile('readTodo.html', function(err,data){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data, function(err){
                res.end();
            });
        });
    }else{
        res.writeHead(302, {'Location': "/index" });
        res.end();
    }

}).listen(3000);