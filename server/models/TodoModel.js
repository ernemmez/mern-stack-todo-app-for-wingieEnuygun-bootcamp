const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    title:{type:String,required:true},
    text:{type:String},
    byUsername:{type:String,required:true},
    addedDate:{type:String},
    toBeCompDate:{type:String},
    endDate:{type:String},
    updated:{type:Boolean},
    status:{type:Boolean}

});

module.exports = mongoose.model('Todos', TodoSchema);
