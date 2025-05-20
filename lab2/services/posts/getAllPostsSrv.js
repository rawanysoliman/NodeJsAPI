const Post = require("../../models/posts");

const getAllPostsSrv = async (userId) => {
  // Get all posts from DB
  const posts = await Post.find();

  // Map over posts and add a flag 'isMine' if post.author equals userId
  const postsWithFlag = posts.map(post => {
    return {
      ...post.toObject(),
      isMine: post.author.toString() === userId, // true if owned by user
    };
  });

  return postsWithFlag;
};

module.exports = getAllPostsSrv;
