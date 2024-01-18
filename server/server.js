const http = require('http');

http.createServer(function (req, res){
    //const name = req.url.split("=")[1];
    //const name = url.parse(req.url, true).query;
    //const urlObj;
    result ='';
    req.on('data',function (chunk){
        result += chunk;
    });

    req.on('end',function (){
        result = result.split('&').map(string =>{
            const [key, value] = param.split("=");
            obj[key] = value;
        });
        console.log(obj);

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('Hallo' + obj.name +'!<br>');
        res.end();
    });
}).listen(3000);
console.log("Server lauft");

