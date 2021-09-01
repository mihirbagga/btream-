var express = require('express');
var router = express.Router();
var pool=require('./pool')

router.post('/addnewrecord',function(req, res, next) {
    console.log(req)
    pool.query('insert into chat (phone, message)values(?,?)',[req.body.phone, req.body.message],function(error,result){
       
      if(error)
     { console.log(error)
        return res.status(500).json([{RESULT:false}])}
        
  
     else
     {console.log(result)
      return res.status(200).json([{RESULT:true}])
     }
  
    })  
    });

    router.get('/displayAll', function(req, res, next) {
        pool.query("select * from chat",function(error,result){
          if(error)
          { console.log(error)
            return res.status(500).json([])
        
          }
          else
          { console.log(result)
            return res.status(200).json(result)
          }
        })
    });
      
      

    module.exports = router;