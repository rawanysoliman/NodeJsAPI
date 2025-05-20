const Post = require("../../models/posts");
const APIError = require("../../middlewares/apiError");
const {isValidObjectId} = require("mongoose");




const deletePostSrv = async (postId, userId) => {
  if (!isValidObjectId(postId)) {
    throw new APIError("Invalid post ID", 400);
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new APIError("Post not found", 404);
  }

  if (post.author.toString() !== userId) {
    throw new APIError("Unauthorized to delete this post", 403);
  }

  await Post.deleteOne({ _id: postId });
};

module.exports = deletePostSrv;




// const deletePostSrv = async (id) => {
//     if (!isValidObjectId(id)) {
//         throw new APIError("Invalid Id", 400);
//     }

//     const post = await Post.findOneAndDelete({ _id: id });

//     if (!post) {
//         throw new APIError("Post not found", 404);
//     }

//     return;
// };

// module.exports = deletePostSrv;



