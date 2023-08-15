const mongoose=require('mongoose');
const uri = "mongodb+srv://aman:oAdwVNL8YvICeZBG@cluster0.mm09l.mongodb.net/angular_gaurav?retryWrites=true&w=majority";
mongoose.connect(uri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() =>{
    console.log('sucess');
}).catch((ex) =>{
    console.log('error'+ ex);
});



