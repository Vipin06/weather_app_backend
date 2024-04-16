const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    name: { type: String},    
    email: { type: String, unique: true },
    password: { type: String },
  
});

module.exports = mongoose.model('Form', formSchema);
