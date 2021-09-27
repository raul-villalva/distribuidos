var express = require('express');
var helperDna = require('../helper/helperDna.js');
var da = require('../helper/da.js');
var router = express.Router();




router.post('/mutant', function(req, res, next) {

    //Si no es valido tiro 403
    console.log(req.body);
    if (helperDna.isValid(req.body) ) {
        res.sendStatus(403);
    } else if (helperDna.isMutant(req.body)) {
        da.incType("mutant");
      res.sendStatus(200);
    } else {
        da.incType("human");
        res.sendStatus(404);
    }
});


const fs = require('fs')
router.get('/leer',function(req,res)
{
     var path = req.query.path;
     var pos = req.query.pos || 0;
     var lenght = req.query.lenght || 16; 

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
	  
		    // Close the opened file.
		    fs.close(fd, function (err) {
		        if (err) {
		            console.log(err);
		        }
	  
		        console.log("File closed successfully");
		    });
		      res.send(buffer.
		            slice(0, bytes).toString());
		});
       });
        

	/*fs.readFile('/home/rvillalva/Downloads/testloco.txt', 'utf8' , (err, data) => {
	  if (err) {
	    console.error(err)
	    return
	  }
	  res.send(data);
	})*/
	
	 
});

router.post('/escribir',function(req,res,next)

{

 console.log(req.body);
 console.log(req.body.path);
  res.send('Se guardo');
fs.appendFile(req.body.path, req.body.buffer , function (err) {
  if (err) throw err;
  console.log('Saved!');
 
	
	

});
        
        
         res.send('Se guardo');
	
	
	 
});


module.exports = router;
