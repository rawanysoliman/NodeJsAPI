const postsSrv = require("../services/posts");
 
class PostsController {

    async getAllPosts(req, res) {
        const posts = await postsSrv.getAllPostsSrv();
        res.status(200).json({
            message: "Posts fetched successfully",
            status: "success",
            data: posts,
            
        });
    }

    async getPostById(req, res) {   
        const id = req.params.id;
        const post = await postsSrv.getPostByIdSrv(id);
        res.status(200).json({
            message: "Post fetched successfully",
            status: "success",
            data: post,
        });
    }

    async createPost(req, res) {
        const post = await postsSrv.createPostSrv(req.body);
        res.status(201).json({  
            message: "Post created successfully",
            status: "success",
            data: post,
        });
    }
    async updatePost(req, res) {
        const id = req.params.id;
        const post = await postsSrv.updatePostSrv(id, req.body);
        res.status(200).json({
            message: "Post updated successfully",
            status: "success",
            data: post,
        });
    }
    async deletePost(req, res) {
        const id = req.params.id;
        await postsSrv.deletePostSrv(id);
        res.status(200).json({
            message: "Post deleted successfully",
            status: "success",
        });
    }
}
module.exports = new PostsController();
