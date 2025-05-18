const Post = require("../../models/posts");
const APIError = require("../../middlewares/apiError");
const {isValidObjectId} = require("mongoose");

const getPostByIdSrv = async (id) => {
    if (!isValidObjectId(id)) {
        throw new APIError("Invalid Id", 400);
    }

    const post = await Post.findOne({ _id: id });

    if (!post) {
        throw new APIError("Post not found", 404);
    }

    return post;
};

module.exports = getPostByIdSrv;


