var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')


 router.post('/addnewrecord',upload.single('picture'),function(req, res, next) {
  console.log(req)
 
  pool.query('insert into addcontact (firstname, phone, email,picture)values(?,?,?,?)',[req.body.firstname,req.body.phone, req.body.email,req.file.filename],function(error,result){
     
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
    pool.query("select * from addcontact",function(error,result){
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

  router.post('/deleteAddContact', function(req, res, next) {
    console.log('Data',req.body)
    pool.query('delete from addcontact where id=?',[req.body.id],function(error,result){
    if(error)
    { console.log(error)
      return res.status(500).json([{'result':false}])
  
    }
    else
    { console.log(result)
      return res.status(200).json([{'result':true}])
    }
  
  
    })
    
    
  });

  module.exports = router;
  
