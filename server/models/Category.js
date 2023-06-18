const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This Field is required'
    },
    image: {
        type: String,
        required: 'This Field is required'
    },
});


module.exports = mongoose.model('Category', categorySchema);