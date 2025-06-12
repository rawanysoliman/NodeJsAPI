const postsSrv = require("../services/posts");
const APIError = require("../middlewares/apiError");
 
class PostsController {

    async getAllPosts(req, res, next) {
        try {
            //get user id from req.user
            const userId=req.user.userId;
            const posts = await postsSrv.getAllPostsSrv(userId)//pass user id to getAllPostsSrv
            res.status(200).json({
            message: "Posts fetched successfully",
            status: "success",
            data: posts,
            isMine: posts.isMine,
        });
        } catch (error) {
            next(error);
        }
    }






    async getPostById(req, res, next) {  
        try {
            const postId = req.params.id;
            const userId = req.user.userId;
            const post = await postsSrv.getPostByIdSrv(postId, userId);
        res.status(200).json({
            message: "Post fetched successfully",
            status: "success",
            data: post,
            isMine: post.isMine,
        });
        } catch (error) {
            next(error);
        }
    }


    async createPost(req, res, next) {
        try {
            const userId = req.user.userId;
            // Extract only title and content from req.body to avoid extra fields
            const { title, content } = req.body;
            const postData = {
            title,
            content,
            author: userId,
        };
        const post = await postsSrv.createPostSrv(postData);

        res.status(201).json({
            message: "Post created successfully",
            status: "success",
            data: post,
        });
        } catch (error) {
            next(error);
        }
    }



    // async createPost(req, res, next) {
    //     try {
    //       const userId = req.user.userId;  // from authentication middleware
    //       const postData = { ...req.body, author: userId };
    //       const post = await postsSrv.createPostSrv(postData);
    //       res.status(201).json({  
    //         message: "Post created successfully",
    //         status: "success",
    //         data: post,
    //       });
    //     } catch (error) {
    //       next(error);
    //     }
    //   }
      
      


    async updatePost(req, res, next) {
        try {
            const postId = req.params.id;
            const userId = req.user.userId;
            const post = await postsSrv.updatePostSrv(postId, req.body, userId);
            res.status(200).json({
            message: "Post updated successfully",
            status: "success",
            data: post,
        });
        } catch (error) {
            next(error);
        }
    }

    async deletePost(req, res, next) {
        try {
            const postId = req.params.id;
            const userId = req.user.userId;
            await postsSrv.deletePostSrv(postId, userId);
            res.status(200).json({
            message: "Post deleted successfully",
            status: "success",
        });
        } catch (error) {
            next(error);
        }
    }
}
module.exports = new PostsController();
