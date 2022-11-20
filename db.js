const mongoose = require('mongoose');
function connectToDataBase(){
mongoose.connect('mongodb+srv://user:senha@cluster0.mr6kwy8.mongodb.net/?retryWrites=true&w=majority',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db=mongoose.connection;
db.on('error',(error)=>console.error(error));
db.once('open',()=>console.log('Connected to database'));
}

module.exports=connectToDataBase;