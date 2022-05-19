let express = require('express');
let cookieParser = require('cookie-parser');
//setup express app
let app = express()
  
app.use(cookieParser());
app.use(express.json()) 
const fs = require('fs')  
  


app.get('/leer',function(req,res)
{
	 
	console.log(req.cookies);

     var path = req.query.path || req.cookies.path ;
     var pos = req.query.pos ||  req.cookies.pos || 0;
     var lenght = req.query.lenght || req.cookies.lenght || 200; 

	
	     var buffer = new Buffer.alloc(parseInt(lenght));
	     fs.open(path, 'r+', function (err, fd) {
	    if (err) {
		return console.error(err);
	    }
	  
	    console.log("Reading the file");
	  
	    fs.read(fd, buffer, 0, buffer.length,
		  parseInt(pos), function (err, bytes) {
		    if (err) {
		        console.log(err);
		    }
	  
		    if (bytes > 0) {
		        console.log(buffer.
		            slice(0, bytes).toString());
		    }
		    console.log(bytes + " bytes read");
                    res.cookie("pos", (parseInt(pos)) +200);

		    fs.close(fd, function (err) {
		        if (err) {
		            console.log(err);
		        }
	  

		    });
		      res.send(buffer.
		            slice(0, bytes).toString());
		  });
    });
        	 
});

app.post('/escribir',function(req,res,next)

{
    //console.log(req);
    console.log(req.body);
  
    fs.appendFile(req.body.path, req.body.buffer , function (err) {
    if (err) throw err;
   		 console.log('Saved!');

	  });
            
    res.send('Se guardo');
	
});
  
//server listens to port 3000
app.listen(3000, (err)=>{
if(err)
throw err;
console.log('listening on port 3000');
});
