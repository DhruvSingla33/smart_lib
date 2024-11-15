const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PostSchema = new Schema({

    title: {
        type: String,
        required: true,
    },

    slug: {
        type: String,
     
    },
   

    description: {
        type: String,
     
    },

    thumbnail: {
        type: String,
       
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },

    username: {
        type: String,
    },
    

});


module.exports = mongoose.model('Post', PostSchema);