const Post = require("../../models/posts");

const getAllPostsSrv = async (userId) => {
  const posts = await Post.find();
  // Map over posts and add a flag 'isMine' if post.author equals userId
  const postsWithFlag = posts.map(post => {
    return {
      ...post.toObject(),//convert every post to object
      isMine: post.author.toString() === userId, // true if owned by user
    };
  });

  return postsWithFlag;
};

module.exports = getAllPostsSrv;
