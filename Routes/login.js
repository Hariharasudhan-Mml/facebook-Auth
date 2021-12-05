const app = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../Models/user");


app.get('/',(req,res)=>{
  try{
res.render('login')
  }catch(error){
res.json(error.message)
  }
})

app.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const pass =await  bcrypt.compare(req.body.password, user.password);
    console.log(pass);
    if (pass) {
      if (user.verified) {
        return res.render('message',{msg1:'Access Granted'});

      } else {
    return res.render('message',{msg1:'Verify your account to use the application'});
      }
    } else {
     return res.render('message',{msg1:'Wrong Password'});

    }
  } else {
    return res.render('message',{msg1:'No user signed up with this Email'});

  }
});


module.exports=app;