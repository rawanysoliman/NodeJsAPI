const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },

    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    }
})  

// index is a way to speed up the search operation , it is a way to create a unique key for the collection
postsSchema.index({ title: 1 }, { unique: true });
const Post = mongoose.model("posts", postsSchema);
module.exports = Post;
