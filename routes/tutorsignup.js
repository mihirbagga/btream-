var express = require('express');
var router = express.Router();
var pool=require('./pool')

router.post('/addNewRecord', function(req, res, next) {
  console.log(req)
  pool.query('insert into selfregister(firstname, lastname, emailid, password, verifypassword, status)values(?,?,?,?,?,?)',[req.body.firstName,req.body.lastName, req.body.emailId, req.body.password, req.body.verifyPassword, req.body.status],function(error,result){
     
    if(error)
   { console.log(error)
      return res.status(500).json([{RESULT:false}])}
      

   else
   {console.log(result)
    return res.status(200).json([{RESULT:true}])
   }

  })  
  });
/*   router.post('/deleteRecord', function(req, res, next) {
    console.log('Data',req.body)
    pool.query('delete from selfregister where id=?',[req.body.Id],function(error,result){
    if(error)
    { console.log(error)
      return res.status(500).json({RESULt:false})
  
    }
    else
    { console.log(result)
      return res.status(200).json({RESULT:true})
    }
  
  
    })
    
    
  }); */

  /* router.get('/displayAll', function(req, res, next) {

   pool.query("select * from selfregister ",function(error,result){
     if(error)
     { console.log(error)
       return res.status(500).json([])
   
     }
     else
     { console.log(result)
       if(result.length==0)
       return res.status(200).json(null)
       else
       return res.status(200).json(result)
     
     }
   })
 }); */

  module.exports = router;
  
