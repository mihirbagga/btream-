var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')

router.post('/addNewRecord',upload.single('picture'), function(req, res, next) {
  console.log(req)
  pool.query('insert into studentsignup(firstname, lastname, emailid, password, verifypassword, picture)values(?,?,?,?,?,?)',[req.body.firstName,req.body.lastName, req.body.emailId, req.body.password, req.body.verifyPassword, req.file.filename],function(error,result){
     
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


 router.post('/checkclientsignin',function(req,res,next){
  console.log(req.body)
  pool.query('select *  from studentsignup where emailid=? and password=?',[req.body.emailid,req.body.password],function(error,result){
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


router.post('/register', function(req, res, next) {
  console.log(req.body)
  pool.query("insert into studenttsignup(emailid,password) values(?,?)",[req.body.email,req.body.password],function(err,result){
      if(err){
          console.log(err)
          return res.status(500).json({'result':false})
      }
      else{
          console.log(result)
          return res.status(200).json({'result':true})
      }
  })
  


});

router.post('/checkuser', function(req, res, next) {
  console.log(req.body)
  pool.query("select * from studentsignup ",function(err,result){
      
      if(err){
          console.log(err)
          return res.status(500).json({'result':false})
      }
      else{
          console.log(result)
          for(var i=0;i<result.length;i++ ){
              if(result[i].emailid==req.body.email)    {
                  return res.status(200).json({'result':true})
              }
          }
       
          return res.status(500).json({'result':false})
       
      }
  })
  


});

router.post('/login', function(req, res, next) {
  console.log(req.body)
  pool.query("select * from studentsignup where emailid=?",[req.body.email],function(err,result){
      
      if(err){
          console.log(err)
          return res.status(500).json({'result':false})
      }
      else{
          
          if(result[0].password==req.body.password)    {
              return res.status(200).json({'result':true})
          }
                          
       
          return res.status(500).json({'result':false})
       
      }
  })
  


});





  module.exports = router;
  
