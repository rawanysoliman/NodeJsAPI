const express = require('express');
const router = express.Router();
const postsController = require("../controllers/postsController");
const authenticated=require("../middlewares/authentication");
// const restrictTo=require("../middlewares/restrictTo");

router.use(authenticated);

//methods name in controller 
router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.post('/', postsController.createPost);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePost);

module.exports = router;
