var express = require('express');
var router = express.Router();
var pool=require('./pool')

 router.post('/addnewrecord',function(req, res, next) {
  console.log(req)
  pool.query('insert into addhomework(title, description, date)values(?,?,?)',[req.body.title,req.body.description, req.body.date],function(error,result){
     
    if(error)
   { console.log(error)
      return res.status(500).json({RESULT:false})}
      

   else
   {console.log(result)
    return res.status(200).json({RESULT:true})
   }

  })  
  });

  
  router.get('/displayAll', function(req, res, next) {
    pool.query("select * from addhomework",function(error,result){
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

  router.post('/edithomework',function(req, res, next) {
    console.log(req.body);
    
   pool.query('update addhomework set title=?,description=?, date=? where id=?',[req.body.title,req.body.description,req.body.date,req.body.id],function(error,result){
      
     if(error)
    {
       return res.status(500).json([{RESULT:false}])}
 
    else
    {
     return res.status(200).json([{RESULT:true}])
    }
 
   })  

   });

   router.post('/deletehomework', function(req, res, next) {
    console.log('Data',req.body)
    pool.query('delete from addhomework where id=?',[req.body.id],function(error,result){
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

  /* router.post('/editdata',function(req, res, next) {
    pool.query('update categories set categoryname=?,categorydescription=? where categoryid=?',[req.body.categoryName,req.body.categoryDescription,req.body.categoryId],function(error,result){
       
      if(error)
     {
        return res.status(500).json({RESULT:false})}
  
     else
     {
      return res.status(200).json({RESULT:true})
     }
  
    })  
    });


    router.post('/editIcon',upload.single('categoryIcon'),function(req, res, next) {
      pool.query('update  categories set categoryicon=? where categoryid=?',[req.file.filename,req.body.categoryId],function(error,result){
         
        if(error)
       {
          return res.status(500).json({RESULT:false})}
    
       else
       {
        return res.status(200).json({RESULT:true})
       }
    
      })  
      });

      router.post('/deleteRecord',function(req, res, next) {
        pool.query('delete from  categories where categoryid=?',[req.body.categoryId],function(error,result){
           
          if(error)
         {
            return res.status(500).json({RESULT:false})}
      
         else
         {
          return res.status(200).json({RESULT:true})
         }
      
        })  
        });
 */
  module.exports = router;