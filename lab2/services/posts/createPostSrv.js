const Post = require("../../models/posts");
const APIError = require("../../middlewares/apiError");
const {isValidObjectId} = require("mongoose");


const createPostSrv = async ({title, content, author}) => {

    if (!title || !content || !author ) {
        throw new APIError("Missing post data", 400);
    }

    if (!isValidObjectId(author)) {
        throw new APIError("Invalid author or userId", 400);
    }

    const post = await Post.create({title, content, author});

    return post;
};

module.exports = createPostSrv;