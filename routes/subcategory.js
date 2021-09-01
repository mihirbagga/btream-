var express=require('express');
var router=express.Router();
var pool=require('./pool')
var upload=require('./multer')
router.post('/addnewrecord', function(req,res,next){
    pool.query('insert into subcategory(subcategoryName)values(?)',[req.body.subcategoryName],function(error,result){
        if(error)
        {
            console.log(error)
            return res.status(500).json([{RESULT:false}])
        }
        else{
            return res.status(200).json([{RESULT:true}])
        }

    })
});
router.get('/displayall',function(req,res,next){
    pool.query('select * from subcategory',function(error,result){
        if(error)
        {
            console.log(error)
            return res.status(500).json([])
        }
        else
        {
            return res.status(200).json(result)
        }
})
})
router.post('/displayByCategoryId',function(req,res,next){
    console.log(req.body)
    pool.query('select * from subcategory where categoryid=?',[req.body.categoryid],function(error,result){
        if(error)
        {
            console.log(error)
            return res.status(500).json([])
        }
        else
        {
            console.log(result)
            return res.status(200).json(result)
        }
})
})
router.post('/editData',function(req,res,next){
    pool.query('update subcategory set subcategoryname=?,subcategorydescription=? where subcategoryid=?',[req.body.subcategoryName,req.body.subcategoryDescription,req.body.subcategoryId],function(error,result){
        if(error)
        {
            console.log(error)
            return res.status(500).json([{RESULT:false}])
        }
        else
        { console.log(req.body)
            return res.status(200).json([{RESULT:true}])
        }
})
});
router.post('/editIcon',upload.single('subcategoryIcon'),function(req,res,next){
    console.log(req.body)
    pool.query('update subcategory set subcategoryicon=? where subcategoryid=?',[req.file.filename,req.body.subcategoryId],function(error,result){
        if(error)
        {
            console.log(error)
            return res.status(500).json([{RESULT:false}])
        }
        else
        {
            return res.status(200).json([{RESULT:true}])
        }
})
});
router.post('/deleteRecord',function(req,res,next){
    console.log(req.body)
    pool.query('delete from subcategory where subcategoryid=?',[req.body.subcategoryId],function(error,result){
        if(error)
        {
            console.log(error)
            return res.status(500).json([{RESULT:false}])
        }
        else
        {
            return res.status(200).json([{RESULT:true}])
        }
})
});

module.exports=router;