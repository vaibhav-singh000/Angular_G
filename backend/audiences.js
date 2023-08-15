const mongoose=require('mongoose');
const adminSchema=new mongoose.Schema({
    Event_id:String,
    Audiences:String
});
module.exports=mongoose.model('audiences',adminSchema);