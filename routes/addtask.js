var express = require('express');
var router = express.Router();
var pool=require('./pool')

 router.post('/addnewrecord',function(req, res, next) {
  console.log(req)
  pool.query('insert into addtask (areainterest, minimum, maximum, description,lookingfor, category)values(?,?,?,?,?,?)',[req.body.areainterest,req.body.minimum, req.body.maximum, req.body.description, req.body.lookingfor, req.body.category],function(error,result){
     
    if(error)
   { console.log(error)
      return res.status(500).json({RESULT:false})}
      

   else
   {console.log(result)
    return res.status(200).json({RESULT:true})
   }

  })  
  });

  module.exports = router;
  
