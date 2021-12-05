const app = require("express").Router();
const User = require("../Models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");



app.get('/',(req,res)=>{
  try{
    res.render('signupform');
  }catch(err){
    res.json(err.message);
  }
})




app.post("/", async (req, res) => {
  try {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return res.render('message',{msg1:err.message})

      } else {
        bcrypt.hash(req.body.password, salt).then(async (hash) => {
          const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            dob:req.body.dob,
            gender: req.body.gender,
          });
          const token = jwt.sign({ id: user.email }, process.env.KEY);
          const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: "webdevsmail@gmail.com",
              pass: "testingpurposes",
            },
          });
          const info = await transporter.sendMail({
            from: "webdevsmail@gmail.com",
            to: req.body.email,
            subject: "To verify your account -fb ",
            html:`
            <div>
            <h2>welcome ${req.body.name}, Thank you  for choosing our platform and keep Growing with us.</h2>
            <p>click the below link to verify your account </p>
            <div style="background-color:lightblue;"><a style="color:hotpink" href="http://localhost:5000/verify/${token}" >Click here to verify </a></div>
          <p>Thank you </p>
          <p>-FB Team</p>
            </div>
            `
          });
          if (info) {
            console.log(info);
          }
          return res.render('message',{msg1:'verification link successfully send',msg2:'check your inbox'});
        });
      }
    });
  } catch (error) {
    res.json(error.message);
  }
});

module.exports = app;
