const mongoose=require('mongoose');


const connectDB=async function(){
    try {
        const con=await  mongoose.connect(process.env.DB_url);
        console.log(`DB is connected to ${con.connection.host}`)
    } catch (error) {
        console.log(error.message);
    }
}



module.exports=connectDB;

