const postsSrv = require("../services/posts");
const APIError = require("../middlewares/apiError");
 
class PostsController {

    async getAllPosts(req, res) {
        //get user id from req.user
        const userId=req.user.userId;
        const posts = await postsSrv.getAllPostsSrv(userId)//pass user id to getAllPostsSrv
        res.status(200).json({
            message: "Posts fetched successfully",
            status: "success",
            data: posts,
            
        });
    }

    async getPostById(req, res) {   
        const postId = req.params.id;
        //get user id from req.user
        const userId = req.user.userId;
        const post = await postsSrv.getPostByIdSrv(postId, userId);
        res.status(200).json({
            message: "Post fetched successfully",
            status: "success",
            data: post,
        });
    }

    // async createPost(req, res) {
    //     const userId = req.user.id;
    //     // Extract only title and content from req.body to avoid extra fields
    //     const { title, content } = req.body;
    
    //     const postData = {
    //         title,
    //         content,
    //         author: userId,
    //     };
    
    //     const post = await postsSrv.createPostSrv(postData);
    //     res.status(201).json({
    //         message: "Post created successfully",
    //         status: "success",
    //         data: post,
    //     });
    // }



    async createPost(req, res, next) {
        try {
         const userId = req.user.userId;  // from authentication middleware
          const postData = { ...req.body, author: userId };
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
      
      


    async updatePost(req, res) {
        const postId = req.params.id;
        const userId = req.user.userId;
        const post = await postsSrv.updatePostSrv(postId, req.body, userId);
        res.status(200).json({
            message: "Post updated successfully",
            status: "success",
            data: post,
        });
    }

    async deletePost(req, res) {
        const postId = req.params.id;
        const userId = req.user.userId;
        await postsSrv.deletePostSrv(postId, userId);
        res.status(200).json({
            message: "Post deleted successfully",
            status: "success",
        });
    }
}
module.exports = new PostsController();
