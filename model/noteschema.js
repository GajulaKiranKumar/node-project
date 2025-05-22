const{Schema,model}=require('mongoose')

 let NoteSchema=new Schema({
     noteId:{
       type:String,
       requried:true
    },
    noteName:{
        type:String,
        requried:true
     },
     description:{
        type:String,
        requried:true
     },
     status:{
        type:String,
        requried:true,
        enum:['active','inactive'],
     }
},{
 timestamps:true
})

module.exports=model('noteSchema',NoteSchema,'noteSchema') 