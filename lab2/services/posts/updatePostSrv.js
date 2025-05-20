const Post = require("../../models/posts");
const APIError = require("../../middlewares/apiError");
const {isValidObjectId} = require("mongoose");




const updatePostSrv = async (postId, updateData, userId) => {
  if (!isValidObjectId(postId)) {
    throw new APIError("Invalid post ID", 400);
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new APIError("Post not found", 404);
  }

  if (post.author.toString() !== userId) {
    throw new APIError("Unauthorized to update this post", 403);
  }

  Object.assign(post, updateData);
  await post.save();

  return post;
};

module.exports = updatePostSrv;



// const updatePostSrv = async (id, {title, content}) => {

//     if (!isValidObjectId(id)) {
//         throw new APIError("Invalid Id", 400);
//     }

//     const post = await Post.findOneAndUpdate(
//         { _id: id },
//         { title, content },
//         { new: true }
//     );

//     if (!post) {
//         throw new APIError("Post not found", 404);
//     }

//     return post;
// };

// module.exports = updatePostSrv;
