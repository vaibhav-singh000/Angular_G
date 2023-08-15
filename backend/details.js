const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    EventName: String,
    EventDate: String,
    EventTime: String,
    Location: String,
});
module.exports = mongoose.model('informations', adminSchema);