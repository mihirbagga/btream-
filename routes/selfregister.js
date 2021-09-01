var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

router.post('/addNewRecord',upload.single('picture'), function(req, res, next) {
  console.log(req.body)
  pool.query('insert into selfregister(firstname, lastname, emailid, password, verifypassword, picture,status)values(?,?,?,?,?,?,?)',[req.body.firstName,req.body.lastName, req.body.emailId, req.body.password, req.body.verifyPassword, req.file.filename,req.body.status],function(error,result){
     
    if(error)
   { console.log(error)
       res.status(500).json([{RESULT:false}])
    }

   else
   {
     res.status(200).json([{RESULT:true}])
   }
  })  
});



  router.get('/displayAll', function(req, res, next) {
   pool.query("select * from selfregister where status = ?","Not Approve",function(error,result){
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



 router.post('/update', function(req, res, next) {

  console.log(req.body)
  
  pool.query("update selfregister  set status = ? where id= ?",[req.body.status, req.body.Id],(error,result) =>{
    if(error)
    { //console.log(error)
      return res.status(500).json([])
    }
    else
    { //console.log(result)
      return res.status(200).json(result)
    }
  })
});


router.get('/displayAprove', function(req, res, next) {
  pool.query("select * from selfregister where status = ?","Approve",function(error,result){
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

router.post('/deleteAprove', function(req, res, next) {
  console.log('Data',req.body)
  pool.query('delete from selfregister where id=?',[req.body.id],function(error,result){
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

router.post('/deleteDecline', function(req, res, next) {
  console.log('Data',req.body)
  pool.query('delete from selfregister where id=?',[req.body.id],function(error,result){
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


router.get('/displayDecline', function(req, res, next) {
  pool.query("select * from selfregister where status = ?","Declined",function(error,result){
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


router.post('/checkloginsignin',function(req,res,next){
  console.log(req.body)
  pool.query('select *  from selfregister where emailid = ? and password = ?',[req.body.emailid,req.body.password],function(error,result){
    if(error){
      console.log(error)
      return res.status(500).json({RESULT:false})
    }
    else{
        if(result.length==0)
      return res.status(200).json({RESULT:false})
      else
      return res.status(200).json({RESULT:result})
      
    }
  })
})


router.post('/updateProfile', function(req, res, next) {
  
  console.log('Data',req.body)
  pool.query('update selfregister set firstname=?, lastname=?, emailid=?, password=? newpassword=?, confirmpassword=? where id=?',[req.body.firstName,req.body.lastName, req.body.emailId, req.body.password, req.body.newPassword, req.body.confirmPassword, req.body.id],function(error,result){
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
  
