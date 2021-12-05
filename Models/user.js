const mongoose=require('mongoose');


const userSchema=mongoose.Schema({
    name:{
    type:String,
    required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    verified:{
        type:Boolean,
        required:true,
        default:false
    },
    gender:{
        type:String,
      required:true  
    },
    dob:{
        type:String,
        required:true
    }
    
})


const model=mongoose.model('user',userSchema);


module.exports=model;