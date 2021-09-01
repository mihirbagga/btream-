var express=require('express');
var router=express.Router();
var pool=require('./pool')
var upload=require('./multer')


router.post('/addnewrecord', function(req,res,next){
    console.log(req.body)
    pool.query('insert into category(categoryName,price,room,bathroom,size,parking)values(?,?,?,?,?,?)',[req.body.categoryName,req.body.price,req.body.room,req.body.bathroom,req.body.size,req.body.parking],function(error,result){
            
    if(error)
    
    {
        return res.status(500).json([{RESULT:false}])
    }

    else
    {
     return res.status(200).json([{RESULT:true}])
    }

    })

});
router.get('/displayall',function(req,res,next){
    pool.query('select * from category',function(error,result){
        if(error)
        {
            return res.status(500).json([])
        }
        else
        {
            return res.status(200).json(result)
        }
})
})
router.post('/editData',function(req,res,next){
    pool.query('update category set categoryname=? where categoryid=?',[req.body.categoryName,req.body.categoryId],function(error,result){
        if(error)
        {
            return res.status(500).json([{RESULT:false}])
        }
        else
        { console.log(req.body)
            return res.status(200).json([{RESULT:true}])
        }
})
});

router.post('/editIcon',upload.single('categoryIcon'),function(req,res,next){
    console.log(req.body)
    console.log(req.file)
    pool.query('update category set categoryicon=? where categoryid=?',[req.file.filename,req.body.categoryId],function(error,result){
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
    pool.query('delete from category where categoryid=?',[req.body.categoryId],function(error,result){
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