const Post = require("../../models/posts");

//Post.find() retrieves all documents from the posts collection (equivalent to SQL's SELECT * FROM posts).
const getAllPostsSrv = async () => {
    const posts = await Post.find();
    return posts;
}

module.exports = getAllPostsSrv;



