const fs = require("fs").promises;
const path = require('path');

//helper methods
const readPosts= async()=>{
    try{
        const data= await fs.readFile(path.join(__dirname,'../data/posts.json'),'utf-8');
        return JSON.parse(data);
    }catch(error){
        throw new APIError(500, 'Failed to read posts');
    }
}

const addPosts= async(posts)=>{

        await fs.writeFile(path.join(__dirname,'../data/posts.json'),JSON.stringify(posts,null,2));
}



//getPosts 
exports.getPosts= async(req,res)=>{
    try{
        const posts=await readPosts();
        res.status(200).json({
            message: "Data fetched successfully",
            status: "success",
            data: posts,});
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

//getPostById
exports.getPostById = async (req, res) => {
    try {
      const postId = Number(req.params.id);
  
      if (isNaN(postId) || postId <= 0) {
        return res.status(400).json({
          message: "Invalid post ID",
          status: "failed",
        });
      }
  
      // Read posts.json file
      const posts=await readPosts();

  
      const post = posts.find((p) => p.id === postId);
  
      if (!post) {
        return res.status(404).json({
          message: "Post not found",
          status: "failed",
        });
      }
  
      res.status(200).json({
        message: "Post fetched successfully",
        status: "success",
        data: post,
      });
  
    } catch (error) {
      console.error("Error in getPostById:", error);
      res.status(500).json({
        message: "Server error while fetching post",
        status: "error",
        error: error.message,
      });
    }
  };
  

  
//createPost
exports.createPost= async(req,res)=>{
    try{
        const posts=await readPosts();

        const { id, title, content,author }=req.body;
        if(!id || !title || !content || !author){
            return res.status(400).json({message: "All fields are required"});
        }

        const newPost={ id, title, content,author };
        posts.push(newPost);

        await addPosts(posts); //write to file

        res.status(201).json({
            message: "Post created successfully",
            status: "success",
            data: newPost,
        })
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

// updatePostId
exports.updatePostId = async (req, res) => {
    try {
        //get the id from the url
        const id = req.params.id;

        //get the data from the body
        const { title, content, author } = req.body;
        if (!title || !content || !author) {
            return res.status(400).json({ message: "All fields are required" });
        }

        //get all posts
        const posts = await readPosts();

        //get the post to update
        const thePost = posts.find(post => post.id == id); 
        if (!thePost) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Update fields
        thePost.title = title;
        thePost.content = content;
        thePost.author = author;

        await addPosts(posts); // save all posts again

        res.status(200).json({
            message: "Post updated successfully",
            status: "success",
            data: thePost,
        });
    } catch (error) {
        console.error(error); // helpful for debugging
        res.status(500).json({ error: error.message });
    }
};

// exports.updatePostId =async (req, res) => {
//     //get the id from the url
//     const Postid = Number(req.params.id);
//     if (!Postid) {
//       return res
//         .status(400)
//         .json({ message: "invalid user id", status: "failed" });
//     }

//     //get the data from the body
//     const { id, title, content,author } = req.body;
//     if (!id || !title || !content||!author) {
//       return res
//         .status(400)
//         .json({ message: "missing user data", status: "failed" });
//     }

//     //get all posts
//     const parsedPosts = await readPosts();

//     //get the post to update
//     const post = parsedPosts.find((p) => p.id === id);

//     if (!post) {
//       return res
//         .status(404)
//         .json({ message: "post not found", status: "failed" });
//     }

//     //remove the post to update
//     const filteredPosts = parsedPosts.filter((user) => user.id !== id);
//     //update the post
//     const newPost = { id, title, content,author };
//     //add the new post
//     filteredPosts.push(newPost);
//     //write to file
//     await fs.writeFile("users.json", JSON.stringify(filteredPosts));

//     res.status(200).json({
//       message: "user updated successfully",
//       status: "success",
//       data: newPost,
//     });
//   }

//deletePost
exports.deletePostId = async (req, res) => {
    try {
        const posts = await readPosts();
        const id = req.params.id;

        const postToDelete = posts.find(post => post.id == id); 
        if (!postToDelete) {
            return res.status(404).json({ message: "Post not found" });
        }

        const filteredPosts = posts.filter(post => post.id != id);

        await addPosts(filteredPosts);

        res.status(200).json({
            message: "Post deleted successfully",
            status: "success",
            data: postToDelete
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

    