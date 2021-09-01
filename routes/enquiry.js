var express = require('express');
var pool=require('./pool')
var router = express.Router();
var upload=require('./multer')

/* GET home page. */
router.post('/addNewRecord', function(req, res, next) {
  /*try{*/
  // console.log('Files',req.files[0].filename,req.files[1].filename)
   console.log('Data',req.body)
  pool.query('insert into enquiry (postid,clientid,name,email,mobile) values(?,?,?,?,?)',[req.body.postid,req.body.clientid,req.body.name,req.body.email,req.body.mobile],function(err,result){
  if(error)
  {
    return res.status(500).json(false)

  }
  else
  { 
    return res.status(200).json(true)
  }

  })
/*}catch(e){console.log(e)}*/  
  
  
});
module.exports = router;