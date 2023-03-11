const express= require('express');

const app=express();

const https = require('https');

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get('/',function(req ,res)
{
       
   res.sendFile( __dirname+"/index.html");
     });
 
     app.post('/', function(req,res)
     {
        const query =  req.body.cityname;
        const key = "a4f298234f85ea9c947acce47c970446";
        const units= "metric";
      const url=" https://api.openweathermap.org/data/2.5/weather?q="+ query+"&appid="+ key +"&units ="+units;
        https.get(url,function(response)
                          {
           console.log(response.statusCode);
           response.on("data",function(data)
           {
                 const weatherdata =JSON.parse(data)
                 const desc = weatherdata.weather[0].description
                 const temp = weatherdata.main.temp 
                 const icon = weatherdata.weather[0].icon
                 const imageurl= "http://openweathermap.org/img/wn/10d@2x.png"
            console.log(temp)
             res.write("<h1>The temperature in "+ query+" is "+temp+" kelvin</h1>");
             res.write(" <p><h2>The weather is "+desc+" </h2><p>");
             res.write("<img src="+imageurl+">");
              res.send();
             });
            });
        });
    app.listen(3000, function(){
    
        console.log('Server is running on port 3000')
    });
    



   