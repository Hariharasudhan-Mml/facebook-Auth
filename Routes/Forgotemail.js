const app=require('express').Router();
const User=require('../Models/user');
const jwt=require('jsonwebtoken');
const nodemailer=require('nodemailer');
const bcrypt=require('bcrypt');



app.get('/',(req,res)=>{
try{
res.render('email');
}catch(error){
    res.json(error)
}
})


app.post('/',async (req,res)=>{
const user= await User.findOne({email:req.body.email});
if(user){
const token=jwt.sign({id:req.body.email},process.env.KEY);
const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:'webdevsmail@gmail.com',
        pass:'testingpurposes'
    }
});
const info=transporter.sendMail({
    from:"webdevsmail@gmail.com",
    to:req.body.email,
    subject:"To change the password",
    html:`
    <div>
    <h2>Hello ${user.name} your password change request is successfully initiated.</h2>
    <p>Click the below link to change the password</p>
    <p><a href="https://fb-authentication-m.herokuapp.com/forgotpassword/${token}">click here to go</a></p>
    <p>Thank you for choosing us</p>
    <p>-FB Team</p>
    </div>
    `
})
if(info){
    console.log(info);
}
return res.render('message',{msg1:'Password change request link successfully send',msg2:'check your inbox'});
}
else{
    res.render('message',{msg1:'No user found with this email',msg2:''});
}
})


app.get('/:token',(req,res)=>{
try {
    
    const token =req.params.token;
    jwt.verify(token,process.env.KEY,async(err,decoded)=>{
        if(err){
return res.json(err);
        }else{
            const user=await User.findOne({email:decoded.id});
            if(user){
                res.render('Getpassword',{email:decoded.id})
            }
        }
    })
} catch (error) {
    return res.render('message',{msg1:error.message});
}
})


app.post('/passwords',(req,res)=>{
try {
    const pass_1=req.body.password_1;
    const pass_2=req.body.password_2;
    const email=req.body.email;

if(!(pass_1===pass_2)){
    res.render('message',{msg1:'Passwords does not match'});
}else{
  bcrypt.genSalt(10,async(err,salt)=>{
      if(err)return res.render('message',{msg1:err.message});;
      await bcrypt.hash(pass_1,salt).then(async hash=>{
          const user=await User.findOneAndUpdate({email:email},
            {password:hash},
            {new:true})
      return res.render('message',{msg1:'Password changed Successfully'});
        })
       
  })
}
} catch (error) {
     
    return res.render('message',{msg1:'No user found with this email'});
}

})



module.exports=app;



