const  {Router}=require('express')
const router=Router()
const NoteSchema=require('../model/noteschema')
const fs=require('fs')


router.get('/style',(req,res)=>{
    fs.readFile('public/style.css',(err,data)=>{
        if (err) throw err;
        res.end(data)
        
    })
})
/// create note

router.get('/addnote',(req,res)=>{
    res.render('noteapp/addnote',{title:'ADD_NOTE'})
}) 
router.post('/addnote', async(req,res)=>{
    let payload=req.body
    await NoteSchema.create(payload)
    res.redirect('/',302 ,{})
})
 // create a allnote
router.get('/allnotes',async(req,res)=>{
    let payload = await NoteSchema.find({}).lean()
    res.render('noteapp/allnotes',{title:'ALL_NOTES',payload})
})

// create a singlenote
router.get('/:id',async(req,res)=>{{
     let payload= await NoteSchema.findOne({_id:req.params.id}).lean()
     res.render('noteapp/singlenote',{title:'SINGLE_NOTE',payload})

}})
// edit a note
router.get('/edit/:id',async(req,res)=>{{
    let payload= await NoteSchema.findOne({_id:req.params.id}).lean()
    res.render('noteapp/editnote',{title:'EDIT_NOTE',payload})

}})
router.post("/edit/:id",async(req,res)=>{
    let payload=await NoteSchema.findOne({_id:req.params.id})
    payload.noteId=req.body.noteId
    payload.noteName=req.body.noteName
    payload.description=req.body.description
    payload.status=req.body.status
    
    await payload.save()
    res.redirect('/api/allnotes',302,{})
})

// delete a note 
router.get('/delete/:id',async(req,res)=>{
     await NoteSchema.deleteOne({_id:req.params.id})
    res.redirect('/api/allnotes',302,{})


})
module.exports=router;

