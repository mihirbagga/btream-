var express = require('express');
var pool=require('./pool')
var router = express.Router();
var upload=require('./multermulti')

/* GET home page. */
router.post('/addNewRecord',function(req, res, next) {
  console.log(req.body)
  /*try{*/
  // console.log('Files',req.files[0].filename,req.files[1].filename)
  //  console.log(req.files.length)
  pool.query('insert into postadd (categoryid,subcategoryid,picture,fullpicture,title,description, mapaddress, lat, lng, price, room, bathroom, size, parking, agentid,visit,activate,sold,valid,extend_date)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.categoryid,req.body.subcategoryid,"","",req.body.title,req.body.description, req.body.mapaddress, req.body.lat, req.body.lng, req.body.price, req.body.room, req.body.bathroom, req.body.size, req.body.parking, req.body.agentid,req.body.visit,req.body.activate,req.body.sold,req.body.valid,req.body.extend_date ],function(error,result){
  if(error)
  {
    console.log(error)
    return res.status(500).json([{'RESULT':false}])
  }

  else
  { 
    console.log(result.insertId)
   // return res.status(200).json([{result}])
    res.json(result)
  }

  })
/*}catch(e){console.log(e)}*/  
  
  
});

router.post(`/uploadimage`,upload.fields([{ name: 'picture' }, { name: 'fullpicture' }]),function(req,res,next){
  console.log('Data',req.body)
  console.log(req.files);
  
  console.log(req.files.picture.length);
  console.log(req.files.fullpicture.length);

  var a=''
  for(var i=0;i<req.files.picture.length;i++){
    a=a+req.files.picture[i].filename+" "
  }
  console.log(a);

  var b=''
  for(var i=0;i<req.files.fullpicture.length;i++){
    b=b+req.files.fullpicture[i].filename+" "
  }
  console.log(b);
  pool.query(`update postadd set picture='${a}',fullpicture='${b}' where id=${req.body.id}`,function(err,result){
    if(err){
      console.log(err)
      return res.status(500).json([{'RESULT':false}])
    }
    else{
      return res.status(200).json([{'RESULT':true}])
    }
  })

})



router.post('/agentPostEditbyId', function(req, res, next) {
 
  // console.log('  jeetendra  Data',req.body)
  pool.query('select * from  postadd where id = ? ',req.body.Id,function(error,result){
    
  if(error)
  {
    return res.status(500).json(result)

  }
  else
  { 
   
    return res.status(200).json(result)
  }

  })
})





router.post('/displaydatabyagent',upload.single(), function(req, res, next) {
  /*try{*/
  // console.log('Files',req.files[0].filename,req.files[1].filename)
   console.log('Data',req.body)
  pool.query('select * from  postadd where agentid = ? ',req.body.id,function(error,result){
    
  if(error)
  {
    return res.status(500).json(result)

  }
  else
  { 
   
    return res.status(200).json(result)
  }

  })
})



router.get('/displaydatabyagentget', function(req, res, next) {
  /*try{*/
  // console.log('Files',req.files[0].filename,req.files[1].filename)
   //console.log('Data',req.body)
  pool.query('select * from  postadd ',function(error,result){
    
  if(error)
  {
    return res.status(500).json(result)

  }
  else
  { 
   
    return res.status(200).json(result)
  }

  })
})




router.get('/displayAll', function(req, res, next) {
  
    pool.query('select * from postadd where sold = ? and activate = ? ',["false","true"],function(error,result){
  if(error)
  {
    console.log(error)
    return res.status(500).json([{'RESULT':false}])
    
  }
  else
  { console.log(result)
    return res.status(200).json([{'RESULT':result}])
  }

  }) 
});





router.post('/updateRecord', function(req, res, next) {
  
  console.log('Data',req.body)
  pool.query('update postadd set title=?,description=?,details=?, minrent=?,maxrent=?,minbuy=?,maxbuy=? where id=?',[req.body.title,req.body.description,req.body.details,  req.body.minrent,req.body.maxrent,req.body.minbuy,req.body.maxbuy, req.body.id ],function(error,result){
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






router.post('/updateSoldList', function(req, res, next) {
  
  console.log('Data',req.body)

  pool.query('update postadd set sold = ? where id=?',["true",req.body.id],function(error,result){
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


router.get('/displaySoldList', function(req, res, next) {

  
  pool.query("select * from postadd where sold = ?","true",function(error,result){
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


router.post('/deleteSoldList', function(req, res, next) {
  console.log('Data',req.body)
  pool.query('delete from postadd where id=?',[req.body.id],function(error,result){
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


router.post('/updateDeactivateList', function(req, res, next) {
  
  console.log('Data',req.body)

  pool.query('update postadd set activate = ? where id=?',["false",req.body.id],function(error,result){
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


router.get('/displayDeactivateList', function(req, res, next) {
  pool.query("select * from postadd where activate = ?","false",function(error,result){
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

router.post('/deleteDeactivateList', function(req, res, next) {
  console.log('Data',req.body)
  pool.query('delete from postadd where id=?',[req.body.id],function(error,result){
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
