const Post = require("../../models/posts");
const APIError = require("../../middlewares/apiError");
const {isValidObjectId} = require("mongoose");

const updatePostSrv = async (id, {title, content}) => {

    if (!isValidObjectId(id)) {
        throw new APIError("Invalid Id", 400);
    }

    const post = await Post.findOneAndUpdate(
        { _id: id },
        { title, content },
        { new: true }
    );

    if (!post) {
        throw new APIError("Post not found", 404);
    }

    return post;
};

module.exports = updatePostSrv;