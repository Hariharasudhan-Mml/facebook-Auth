const bodyParser = require('body-parser');
const express=require('express');
require('dotenv').config();
const connectDB=require('./config/db');
const signup=require('./Routes/Signup');
const verify=require('./Routes/verify');
const login=require('./Routes/login');
const forgotpassword=require('./Routes/Forgotemail');
const app=express();

connectDB();


app.use(bodyParser.urlencoded({extended:true}));
app.use('/public',express.static('public'));


app.set('view engine','ejs');
app.use('/signup' ,signup);
app.use('/verify',verify);
app.use('/login',login );
app.use('/forgotpassword',forgotpassword);


app.get('/',(req,res)=>{
try {
    res.render('home');

} catch (error) {
    res.json(error.message);
}
})

const port=process.env.PORT || 5000;
app.listen(port,(err)=>{
    if(err)console.log(err);
    console.log('Server is up and running ');
})