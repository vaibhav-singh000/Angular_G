const mongoose=require('mongoose');
const adminSchema=new mongoose.Schema({
    Event_id:String,
    images:String
});
module.exports=mongoose.model('images',adminSchema);